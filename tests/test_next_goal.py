"""Regression tests for the loop kernel goal selection.

The goal for the next generation must react to the generation that just
ran. A failure always asks for a repair, and the loop must be able to ask
for a repair again after it has banked a win.
"""

import tempfile
import unittest
from pathlib import Path

from engine.rsi_loop import load_history, next_goal, run_generation


class NextGoalTests(unittest.TestCase):
    def test_fresh_history_asks_for_a_repair(self):
        goal = next_goal({"generations": [], "wins": 0, "losses": 0, "difficulty": 1})
        self.assertIn("repair", goal)
        self.assertNotIn("raise difficulty", goal)

    def test_difficulty_may_only_be_raised_after_an_accept(self):
        history = {
            "generations": [{"verdict": "accept"}],
            "wins": 2,
            "losses": 0,
            "difficulty": 3,
        }
        self.assertIn("raise difficulty", next_goal(history))

    def test_a_reject_always_asks_for_a_repair(self):
        history = {
            "generations": [{"verdict": "reject"}],
            "wins": 2,
            "losses": 1,
            "difficulty": 3,
        }
        goal = next_goal(history)
        self.assertIn("repair", goal)
        self.assertNotIn("raise difficulty", goal)

    def test_repair_stays_reachable_after_a_win(self):
        # The cumulative win counter must not make the repair goal
        # unreachable once the loop has banked a win.
        history = {
            "generations": [{"verdict": "reject"}],
            "wins": 2,
            "losses": 2,
            "difficulty": 3,
        }
        goal = next_goal(history)
        self.assertIn("repair", goal)
        self.assertNotIn("raise difficulty", goal)

    def test_smallest_failing_fixture_goal_without_any_win(self):
        history = {
            "generations": [{"verdict": "reject"}],
            "wins": 0,
            "losses": 2,
            "difficulty": 1,
        }
        goal = next_goal(history)
        self.assertIn("repair smallest failing fixture", goal)

    def test_missing_generations_key_is_tolerated(self):
        goal = next_goal({"wins": 0, "losses": 0, "difficulty": 1})
        self.assertIn("repair", goal)


class RunGenerationGoalTests(unittest.TestCase):
    def test_goal_after_a_failure_is_a_repair_goal(self):
        with tempfile.TemporaryDirectory() as folder:
            state = Path(folder) / "engine_state"
            state.mkdir(parents=True, exist_ok=True)
            run_generation(state, 1, ["worker/planner.py"], 1, True, 0.2, 0.0)
            run_generation(state, 2, ["worker/planner.py"], 1, True, 0.2, 0.0)
            run_generation(state, 3, ["worker/planner.py"], 1, False, -0.1, 0.0)
            run_generation(state, 4, ["worker/planner.py"], 1, False, -0.1, 0.0)
            history = load_history(state)
            goals = [entry["goal"] for entry in history["generations"]]

        # Two accepts, then two straight failures.
        self.assertIn("raise difficulty", goals[2])
        self.assertNotIn("raise difficulty", goals[3])
        self.assertIn("repair", goals[3])

    def test_a_failed_generation_is_never_followed_by_a_raise_goal(self):
        with tempfile.TemporaryDirectory() as folder:
            state = Path(folder) / "engine_state"
            state.mkdir(parents=True, exist_ok=True)
            outcomes = [
                (1, True, 0.2),
                (2, True, 0.2),
                (3, False, -0.1),
                (4, False, -0.1),
                (5, False, -0.1),
            ]
            for generation, passed, gain in outcomes:
                run_generation(
                    state, generation, ["worker/planner.py"], 1, passed, gain, 0.0
                )
            history = load_history(state)
            pairs = [
                (entry["verdict"], entry["goal"]) for entry in history["generations"]
            ]

        for index in range(1, len(pairs)):
            previous_verdict = pairs[index - 1][0]
            goal = pairs[index][1]
            if previous_verdict == "reject":
                self.assertNotIn(
                    "raise difficulty",
                    goal,
                    "a rejected generation must be followed by a repair goal",
                )


if __name__ == "__main__":
    unittest.main()
