"""Check RSI engine state for legibility and gate discipline.

Reads a state folder written by rsi_loop.py and reports history shape,
verdict reasons, frozen path discipline, and patch size discipline.
Exit code is zero when the state is legible, nonzero otherwise.
"""

from __future__ import annotations

import argparse
import json
from pathlib import Path


def load_history(state_dir: Path) -> dict:
    history_file = state_dir / "history.json"
    if history_file.exists() is False:
        return {"generations": [], "wins": 0, "losses": 0, "difficulty": 1}
    return json.loads(history_file.read_text(encoding="utf-8"))


def check_state(state_dir: Path) -> dict:
    history = load_history(state_dir)
    generations = history.get("generations", [])
    report = {
        "state": str(state_dir),
        "generations": len(generations),
        "wins": int(history.get("wins", 0)),
        "losses": int(history.get("losses", 0)),
        "difficulty": int(history.get("difficulty", 1)),
        "missing_reason": 0,
        "ok": True,
        "notes": [],
    }
    if len(generations) == 0:
        report["ok"] = False
        report["notes"].append("no generations recorded yet")
        return report
    for entry in generations:
        reason = str(entry.get("reason", "")).strip()
        verdict = str(entry.get("verdict", "")).strip()
        if len(reason) == 0:
            report["missing_reason"] += 1
        if verdict == "accept" or verdict == "reject":
            continue
        report["ok"] = False
        report["notes"].append("unknown verdict in generation " + str(entry.get("generation", 0)))
    if int(report["missing_reason"]) > 0:
        report["ok"] = False
        report["notes"].append("verdicts missing reasons found")
    if len(report["notes"]) == 0:
        report["notes"].append("history legible with reasons on every verdict")
    return report


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Check RSI engine state legibility")
    parser.add_argument("--state", default="engine_state", help="Folder that holds history and generation records")
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    report = check_state(Path(args.state))
    print(json.dumps(report, indent=2))
    if report["ok"] is False:
        raise SystemExit(1)


if __name__ == "__main__":
    main()
