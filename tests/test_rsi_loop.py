"""Regression tests for the frozen path guard.

The guard must freeze the judge, the gate, the policy and the loop entry
point. It must not freeze ordinary worker files whose names merely contain
one of those words somewhere in the middle.
"""

import unittest

from engine.rsi_loop import is_frozen_name, review_candidate, touches_frozen_path


class FrozenPathTests(unittest.TestCase):
    def test_judge_gate_policy_and_entry_point_stay_frozen(self):
        for path in [
            "judge/judge.py",
            "judge/scoring.py",
            "gate/gate.py",
            "gate/rules.py",
            "policy/policy.py",
            "engine/rsi_loop.py",
            "engine/loop.py",
            "worker/entrypoint.py",
            "judge_helper.py",
            "gate_check.py",
            "legacy_gate.py",
        ]:
            with self.subTest(path=path):
                self.assertTrue(touches_frozen_path([path]))

    def test_ordinary_worker_files_are_not_frozen(self):
        # These names contain "gate", "judge" or "loop" as a substring, but
        # they are ordinary worker code and must be judged normally.
        for path in [
            "worker/navigate.py",
            "worker/aggregate.py",
            "worker/delegate.py",
            "worker/propagate.py",
            "worker/mitigate.py",
            "worker/loop_runner.py",
            "worker/judgement_helpers.py",
        ]:
            with self.subTest(path=path):
                self.assertFalse(touches_frozen_path([path]))

    def test_plain_worker_file_is_not_frozen(self):
        self.assertFalse(touches_frozen_path(["worker/planner.py"]))

    def test_empty_file_list_is_not_frozen(self):
        self.assertFalse(touches_frozen_path([]))

    def test_windows_style_paths_are_handled(self):
        self.assertTrue(touches_frozen_path(["judge\\judge.py"]))
        self.assertFalse(touches_frozen_path(["worker\\navigate.py"]))

    def test_one_frozen_path_in_a_list_freezes_the_patch(self):
        self.assertTrue(touches_frozen_path(["worker/planner.py", "gate/gate.py"]))

    def test_is_frozen_name_matches_exactly_or_by_prefix(self):
        self.assertTrue(is_frozen_name("gate"))
        self.assertTrue(is_frozen_name("GATE"))
        self.assertTrue(is_frozen_name("gate_check"))
        self.assertTrue(is_frozen_name("judge-helper"))
        self.assertTrue(is_frozen_name("legacy_gate"))
        self.assertFalse(is_frozen_name("gateway"))
        self.assertFalse(is_frozen_name("navigate"))
        self.assertFalse(is_frozen_name("aggregate"))


class VerdictTests(unittest.TestCase):
    def test_worker_file_with_a_gate_substring_can_be_accepted(self):
        verdict, reason = review_candidate(["worker/navigate.py"], 1, True, 0.4)
        self.assertEqual(verdict, "accept")
        self.assertEqual(reason, "full suite passed with no regression")

    def test_real_frozen_path_is_still_rejected(self):
        verdict, reason = review_candidate(["judge/judge.py"], 1, True, 0.4)
        self.assertEqual(verdict, "reject")
        self.assertEqual(reason, "frozen path touched")


if __name__ == "__main__":
    unittest.main()
