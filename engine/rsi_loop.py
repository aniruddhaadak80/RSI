"""RSI Atlas bounded loop kernel in plain Python.

This module runs one safe generation at a time. It reads recent history.
It picks one narrow goal. It builds one small candidate. It runs the full
suite through a caller supplied check. It keeps wins and archives losses.
Frozen paths guard the judge, the gate, and the entry point.
"""

from __future__ import annotations

import argparse
import json
from dataclasses import dataclass, asdict
from datetime import datetime, timezone
from pathlib import Path, PurePosixPath


# The judge, the gate, the policy and the loop entry point are frozen. A path
# is frozen when one of its segments *names* one of those concepts. Plain
# substring matching is not used on purpose: it would treat ordinary worker
# files such as worker/navigate.py or worker/aggregate.py as gate code
# because the letters "gate" happen to sit inside the file name.
FROZEN_EXACT_NAMES = frozenset(
    {
        "judge",
        "gate",
        "policy",
        "entrypoint",
        "entry_point",
        "loop",
        "rsi_loop",
    }
)

# Reserved names may also be used as a prefix followed by a word separator, so
# judge_helper.py and gate_check.py keep the protection they have today.
FROZEN_PREFIX_NAMES = ("judge", "gate", "policy")


@dataclass
class Verdict:
    generation: int
    verdict: str
    reason: str
    quality_gain: float
    cost_delta: float


def utc_now() -> str:
    return datetime.now(timezone.utc).isoformat()


def is_frozen_name(segment: str) -> bool:
    """True when a path segment names a frozen concept.

    A segment is frozen when it is exactly one of the reserved names, or when
    it starts or ends with a reserved name followed by a word separator
    ("gate_check", "legacy_gate").
    """
    name = segment.lower()
    if name in FROZEN_EXACT_NAMES:
        return True
    for reserved in FROZEN_PREFIX_NAMES:
        if not name.startswith(reserved):
            continue
        rest = name[len(reserved) :]
        if len(rest) > 0 and rest[0] in "_-":
            return True
    for reserved in FROZEN_PREFIX_NAMES:
        if not name.endswith(reserved):
            continue
        head = name[: len(name) - len(reserved)]
        if len(head) > 0 and head[-1] in "_-":
            return True
    return False


def touches_frozen_path(files: list[str]) -> bool:
    """True when any of the given paths points at frozen code.

    Only the segments that actually name the frozen concept count: a
    directory such as "judge/" or "gate/" freezes everything inside it, and a
    file is frozen when its stem names the concept ("judge.py",
    "rsi_loop.py"). Ordinary worker files stay free to be judged on their
    own merits.
    """
    for raw in files:
        parts = [
            part.lower()
            for part in PurePosixPath(str(raw).replace("\\", "/")).parts
            if part not in (".", "")
        ]
        if len(parts) == 0:
            continue
        for segment in parts[:-1]:
            if is_frozen_name(segment):
                return True
        if is_frozen_name(PurePosixPath(parts[-1]).stem):
            return True
    return False


def review_candidate(
    files: list[str], change_count: int, all_passed: bool, quality_gain: float
) -> tuple[str, str]:
    if touches_frozen_path(files):
        return ("reject", "frozen path touched")
    if change_count > 3:
        return ("reject", "change too large for safe review")
    if all_passed is False:
        return ("reject", "full suite failed")
    if quality_gain < 0:
        return ("reject", "quality regressed against baseline")
    return ("accept", "full suite passed with no regression")


def load_history(state_dir: Path) -> dict:
    history_file = state_dir / "history.json"
    if history_file.exists() is False:
        return {"generations": [], "wins": 0, "losses": 0, "difficulty": 1}
    return json.loads(history_file.read_text(encoding="utf-8"))


def save_history(state_dir: Path, history: dict) -> None:
    history_file = state_dir / "history.json"
    history_file.write_text(json.dumps(history, indent=2), encoding="utf-8")


def next_goal(history: dict) -> str:
    losses = int(history.get("losses", 0))
    wins = int(history.get("wins", 0))
    difficulty = int(history.get("difficulty", 1))
    if losses >= 2 and wins == 0:
        return (
            "repair smallest failing fixture at difficulty 1 and add one hidden check"
        )
    if wins >= 2:
        return "raise difficulty by one notch and add one transfer check"
    return "repair one narrow failure at difficulty %d with one new test" % difficulty


def run_generation(
    state_dir: Path,
    generation: int,
    files: list[str],
    change_count: int,
    all_passed: bool,
    quality_gain: float,
    cost_delta: float,
) -> Verdict:
    verdict_text, reason = review_candidate(
        files, change_count, all_passed, quality_gain
    )
    verdict = Verdict(
        generation=generation,
        verdict=verdict_text,
        reason=reason,
        quality_gain=float(quality_gain),
        cost_delta=float(cost_delta),
    )
    gen_dir = state_dir / ("generation_%03d" % generation)
    gen_dir.mkdir(parents=True, exist_ok=True)
    payload = asdict(verdict)
    payload["decided_at"] = utc_now()
    payload["goal"] = next_goal(load_history(state_dir))
    payload["files"] = files
    (gen_dir / "verdict.json").write_text(
        json.dumps(payload, indent=2), encoding="utf-8"
    )
    history = load_history(state_dir)
    history["generations"].append(payload)
    if verdict_text == "accept":
        history["wins"] = int(history.get("wins", 0)) + 1
        history["difficulty"] = min(5, int(history.get("difficulty", 1)) + 1)
    else:
        history["losses"] = int(history.get("losses", 0)) + 1
        if int(history.get("losses", 0)) >= 3:
            history["difficulty"] = max(1, int(history.get("difficulty", 1)) - 1)
    save_history(state_dir, history)
    lesson = {
        "generation": generation,
        "verdict": verdict_text,
        "reason": reason,
        "next_goal": payload["goal"],
        "written_at": utc_now(),
    }
    (gen_dir / "lesson.json").write_text(json.dumps(lesson, indent=2), encoding="utf-8")
    return verdict


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Run one bounded RSI generation with gated promotion"
    )
    parser.add_argument(
        "--state",
        default="engine_state",
        help="Folder that holds history and generation records",
    )
    parser.add_argument(
        "--generation", type=int, default=1, help="Generation number for this run"
    )
    parser.add_argument(
        "--files",
        default="worker/planner.py",
        help="Comma separated file list in the candidate patch",
    )
    parser.add_argument(
        "--changes",
        type=int,
        default=1,
        help="Number of files changed in the candidate patch",
    )
    parser.add_argument(
        "--passed",
        default="true",
        choices=["true", "false"],
        help="Whether the full suite passed",
    )
    parser.add_argument(
        "--gain", type=float, default=0.0, help="Quality gain against baseline"
    )
    parser.add_argument(
        "--cost", type=float, default=0.0, help="Cost delta against baseline"
    )
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    state_dir = Path(args.state)
    state_dir.mkdir(parents=True, exist_ok=True)
    files = [s.strip() for s in str(args.files).split(",") if len(s.strip()) > 0]
    all_passed = True if str(args.passed).lower() == "true" else False
    verdict = run_generation(
        state_dir,
        int(args.generation),
        files,
        int(args.changes),
        all_passed,
        float(args.gain),
        float(args.cost),
    )
    print(
        "generation %d verdict %s reason %s"
        % (verdict.generation, verdict.verdict, verdict.reason)
    )
    print(
        "state folder %s history wins losses tracked in history.json" % str(state_dir)
    )


if __name__ == "__main__":
    main()
