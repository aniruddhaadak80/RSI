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
from pathlib import Path


FROZEN_HINTS = ("judge", "gate", "loop.py", "entrypoint", "policy")


@dataclass
class Verdict:
    generation: int
    verdict: str
    reason: str
    quality_gain: float
    cost_delta: float


def utc_now() -> str:
    return datetime.now(timezone.utc).isoformat()


def touches_frozen_path(files: list[str]) -> bool:
    lowered = [f.lower() for f in files]
    for name in lowered:
        for hint in FROZEN_HINTS:
            if hint in name:
                return True
    return False


def review_candidate(files: list[str], change_count: int, all_passed: bool, quality_gain: float) -> tuple[str, str]:
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
        return "repair smallest failing fixture at difficulty 1 and add one hidden check"
    if wins >= 2:
        return "raise difficulty by one notch and add one transfer check"
    return "repair one narrow failure at difficulty %d with one new test" % difficulty


def run_generation(state_dir: Path, generation: int, files: list[str], change_count: int, all_passed: bool, quality_gain: float, cost_delta: float) -> Verdict:
    verdict_text, reason = review_candidate(files, change_count, all_passed, quality_gain)
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
    (gen_dir / "verdict.json").write_text(json.dumps(payload, indent=2), encoding="utf-8")
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
    parser = argparse.ArgumentParser(description="Run one bounded RSI generation with gated promotion")
    parser.add_argument("--state", default="engine_state", help="Folder that holds history and generation records")
    parser.add_argument("--generation", type=int, default=1, help="Generation number for this run")
    parser.add_argument("--files", default="worker/planner.py", help="Comma separated file list in the candidate patch")
    parser.add_argument("--changes", type=int, default=1, help="Number of files changed in the candidate patch")
    parser.add_argument("--passed", default="true", choices=["true", "false"], help="Whether the full suite passed")
    parser.add_argument("--gain", type=float, default=0.0, help="Quality gain against baseline")
    parser.add_argument("--cost", type=float, default=0.0, help="Cost delta against baseline")
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    state_dir = Path(args.state)
    state_dir.mkdir(parents=True, exist_ok=True)
    files = [s.strip() for s in str(args.files).split(",") if len(s.strip()) > 0]
    all_passed = True if str(args.passed).lower() == "true" else False
    verdict = run_generation(state_dir, int(args.generation), files, int(args.changes), all_passed, float(args.gain), float(args.cost))
    print("generation %d verdict %s reason %s" % (verdict.generation, verdict.verdict, verdict.reason))
    print("state folder %s history wins losses tracked in history.json" % str(state_dir))


if __name__ == "__main__":
    main()
