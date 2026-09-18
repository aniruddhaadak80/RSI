export type DocTable = {
  title: string;
  headers: string[];
  rows: string[][];
};

export type CodeSample = {
  title: string;
  language: string;
  code: string;
};

export type DocLink = {
  label: string;
  target: string;
};

export type DocSection = {
  heading: string;
  paragraphs: string[];
};

export type DocPage = {
  slug: string;
  title: string;
  summary: string;
  group: string;
  readingTime: string;
  difficulty: string;
  updated: string;
  sections: DocSection[];
  tables: DocTable[];
  codeSamples: CodeSample[];
  links: DocLink[];
};

export const docGroups: string[] = [
  "Start",
  "Core Loop",
  "Evaluation",
  "Research",
  "Code Review",
  "Safety",
  "Build",
  "Roadmap"
];

export const docs: DocPage[] = [
  {
    slug: "start",
    title: "Start With Simple Words",
    summary: "A calm first pass that explains recursive self improvement with short sentences and clear pictures.",
    group: "Start",
    readingTime: "6 min read",
    difficulty: "Easy",
    updated: "2026-09-18",
    sections: [
      {
        heading: "The idea in one paragraph",
        paragraphs: [
          "A system studies its own work and keeps what proves useful. It starts with a small task and a clear goal. It tries one change at a time. It tests the change with care. It keeps the win and removes the loss. The next round begins with a stronger method.",
          "Recursion enters when the method itself improves. The system does not only fix answers. It also fixes prompts, tools, checks, memory, and workflow. Better workflow creates better answers. Better answers suggest better workflow edits. The cycle feeds itself while safety rules stay fixed."
        ]
      },
      {
        heading: "A student story",
        paragraphs: [
          "Think of a student with an answer key. The student writes an answer and checks it. Good habits stay. Weak habits leave. The next test goes a little better.",
          "Now replace the student with a coding agent. Replace homework with small tasks. Replace the answer key with tests and judges. The agent writes code. Tests score the code. A separate judge reviews the change. Good changes stay on the mainline. Weak changes return to the archive with a reason."
        ]
      },
      {
        heading: "What makes it count",
        paragraphs: [
          "One rewrite is only refinement. A full loop needs memory across cycles. A lesson from round one must change round two in a visible way. A score must confirm the gain on fresh checks.",
          "A grounded check matters more than praise. A test that can fail is worth more than a judge that always agrees. A small kept win matters more than a large claimed win. This atlas treats proof as the scarce resource."
        ]
      }
    ],
    tables: [
      {
        title: "Plain words for core terms",
        headers: ["Term", "Plain meaning", "Where it lives"],
        rows: [
          ["Trace", "A saved record of steps, outputs, and costs", "Recorder and memory"],
          ["Score", "A test plus judge result that can be compared", "Evaluator"],
          ["Lesson", "A short note that names pattern, cause, and repair", "Reflector"],
          ["Patch", "One small code change plus one matching test", "Proposer"],
          ["Verdict", "Accept or reject with a clear reason", "Gate and judge"],
          ["Archive", "A home for rejected tries with reasons kept", "Memory"]
        ]
      }
    ],
    codeSamples: [
      {
        title: "Verdict rule in plain code",
        language: "python",
        code: "def review_candidate(files, change_count, all_passed, quality_gain):\n    if len(files) == 0:\n        return (\"reject\", \"empty patch\")\n    if change_count > 3:\n        return (\"reject\", \"change too large\")\n    if all_passed is False:\n        return (\"reject\", \"full suite failed\")\n    if quality_gain < 0:\n        return (\"reject\", \"quality regressed\")\n    return (\"accept\", \"full suite passed\")"
      }
    ],
    links: [
      { label: "Core loop deep dive", target: "/docs/loop" },
      { label: "Evaluation order", target: "/docs/evaluation" }
    ]
  },
  {
    slug: "loop",
    title: "The Core Loop From Task To Kept Win",
    summary: "Planner, actor, trace, evaluator, reflector, proposer, gate, and memory working in steady rhythm.",
    group: "Core Loop",
    readingTime: "10 min read",
    difficulty: "Intermediate",
    updated: "2026-09-18",
    sections: [
      {
        heading: "Roles with one job each",
        paragraphs: [
          "The planner reads the task and the recent diary and sets a narrow aim. The aim names one failure pattern or one cost gap. A narrow aim keeps review human scale and keeps search honest.",
          "The actor does the work with file, test, search, and execution tools. The trace recorder saves prompts, outputs, tool calls, costs, and timings in a standard shape. Standard shape matters because later steps can only reason about what was saved.",
          "The evaluator scores the trace with deterministic tests first and model judges second. The reflector turns scores into a short lesson. The proposer turns one lesson into one patch with one test. The gate checks scope and risk before any branch moves toward the mainline."
        ]
      },
      {
        heading: "Rhythm of one cycle",
        paragraphs: [
          "One task enters the loop with goal, scope, budget, and stop rules. The planner drafts an approach. The actor writes code or an answer. The recorder saves the trace. The evaluator scores the result. The reflector writes a lesson in plain words.",
          "The proposer suggests one small change. The safety gate checks frozen paths and change size. The patch moves to a separate branch. The full suite runs with judge review. An accept moves the mainline forward by one safe step. A reject returns to the archive with a reason. Both paths update memory for the next round."
        ]
      },
      {
        heading: "Why separation works",
        paragraphs: [
          "The worker seeks value while the judge seeks truth. Different prompts and different context keep the two honest. The same model may play both roles across time, but never in the same verdict without a second check.",
          "Promotion needs a full test pass. Partial tests guide search. Only the full suite can promote. The judge code, the gate code, and the loop entry point stay immutable, so a candidate that touches those paths is rejected by rule."
        ]
      }
    ],
    tables: [
      {
        title: "Records that move through the loop",
        headers: ["Record", "Holds", "Reader"],
        rows: [
          ["Task", "Goal, scope, budget, stop rules", "Planner and gate"],
          ["Trace", "Steps, artifacts, costs, timings", "Evaluator and reflector"],
          ["Score", "Test results, judge notes, cost delta", "Reflector and gate"],
          ["Lesson", "Pattern, cause, repair, risk", "Proposer"],
          ["Patch", "Diff, test plan, rollback note", "Gate and reviewer"],
          ["Verdict", "Accept or reject plus reasons", "Memory and humans"]
        ]
      }
    ],
    codeSamples: [
      {
        title: "Branch discipline in shell form",
        language: "bash",
        code: "git checkout -b rsi/generation-004\npython engine/rsi_loop.py --state engine_state --generation 4 --files worker/planner.py --changes 1 --passed true --gain 0.15 --cost -0.05\ngit status\ncat engine_state/generation_004/verdict.json"
      }
    ],
    links: [
      { label: "Operator composition", target: "/docs/operators" },
      { label: "Safety boundary", target: "/docs/safety" }
    ]
  },
  {
    slug: "operators",
    title: "Three Operators Under One Kernel",
    summary: "Data, harness, and model edits share one loop kernel and one artifact vocabulary.",
    group: "Core Loop",
    readingTime: "9 min read",
    difficulty: "Intermediate",
    updated: "2026-09-18",
    sections: [
      {
        heading: "One kernel for three surfaces",
        paragraphs: [
          "Data edits grow good traces and mark the edge of skill. Harness edits change prompts, tools, contracts, and workflow without touching weights. Model edits turn kept traces into weight updates on a schedule. One loop kernel serves all three so results can be compared.",
          "One artifact vocabulary links task, trace, score, lesson, patch, and verdict across operators. A scheduler picks operator order and proposal policy. A meta policy revises the schedule across terms when evidence supports a shift. Small budgets keep each operator honest."
        ]
      },
      {
        heading: "How the three compose",
        paragraphs: [
          "A common path starts with data. Fresh traces reveal a repeated failure. Harness edits fix context flow or tool shape. Kept traces from the stronger harness then feed model training. Each surface inherits the gain of the prior surface.",
          "A second path skips weights entirely. Many teams can only reach a model through an interface. Harness edits plus memory still compound because workflow improves even when weights stay fixed. Data remains the shared substrate that feeds both paths."
        ]
      },
      {
        heading: "Scheduling with care",
        paragraphs: [
          "The scheduler weighs expected gain, cost, risk, and coverage. Low risk harness edits run often. Costly model updates run on a slower cadence with stronger proof. Data growth runs in the background with strict dedup and quality filters.",
          "Direction changes need human review. A schedule that drifts without consent is treated as a defect. Diaries record which operator ran, why it ran, what it cost, and what it kept."
        ]
      }
    ],
    tables: [
      {
        title: "Operator comparison",
        headers: ["Operator", "Changes", "Cadence", "Proof needed"],
        rows: [
          ["Data", "Traces, fixtures, curriculum", "Continuous", "Quality plus diversity checks"],
          ["Harness", "Prompts, tools, contracts, workflow", "Fast cycles", "Full suite plus judge review"],
          ["Model", "Weights through bounded training", "Scheduled", "Held out transfer plus cost review"]
        ]
      }
    ],
    codeSamples: [],
    links: [
      { label: "Evaluation order", target: "/docs/evaluation" },
      { label: "Build and run", target: "/docs/build" }
    ]
  },
  {
    slug: "evaluation",
    title: "Evaluation That Deserves Trust",
    summary: "Deterministic tests first, calibrated judges second, cost third, human review for high risk edits.",
    group: "Evaluation",
    readingTime: "9 min read",
    difficulty: "Intermediate",
    updated: "2026-09-18",
    sections: [
      {
        heading: "A fixed order removes debate",
        paragraphs: [
          "Deterministic checks come first because they are cheap and strict. Unit tests, format checks, schema checks, and hidden transfer cases form the base. A patch that fails here stops at once.",
          "Model judges come second for qualities that tests cannot see, such as clarity, redundancy, and task fit. Cost and latency come third so gains are weighed against price. A change that helps quality but doubles cost is marked as a trade. Human review comes last for high risk edits and release notes."
        ]
      },
      {
        heading: "Judges need judges",
        paragraphs: [
          "Meta evaluation keeps judges honest. Agreement is tracked across cycles. Drift triggers recalibration. A judge that approves everything is treated as broken. A judge that blocks everything is treated as stuck.",
          "Calibration sets with known good and known bad cases run on a schedule. The loop may improve workers and prompts, but it cannot silently lower the bar. Threshold moves are logged with reasons and reviewer names."
        ]
      },
      {
        heading: "Transfer proves generality",
        paragraphs: [
          "Held out cases stay hidden during search. The generator never sees them while it invents patches. Promotion runs them once with full logs. This simple rule blocks most forms of quiet gaming.",
          "Cost trends sit beside quality trends. Token use, latency, and cache behavior are recorded per generation. A quality gain with falling cost is a strong win. A quality gain with rising cost needs an explicit trade note."
        ]
      }
    ],
    tables: [
      {
        title: "Verification hierarchy from strong to weak",
        headers: ["Signal", "Strength", "Role in promotion"],
        rows: [
          ["Formal checks and full tests", "Strongest", "Required for every accept"],
          ["Held out transfer cases", "Strong", "Required for model and risky edits"],
          ["Calibrated model judges", "Medium", "Supports clarity and fit review"],
          ["Uncalibrated self praise", "Weakest", "Never promotes alone"]
        ]
      }
    ],
    codeSamples: [],
    links: [
      { label: "Safety boundary", target: "/docs/safety" },
      { label: "Research map", target: "/docs/research-papers" }
    ]
  },
  {
    slug: "research-papers",
    title: "Research Map Across Papers",
    summary: "Anchor works and recent advances that shape the atlas, organized from classic theory to current loops.",
    group: "Research",
    readingTime: "14 min read",
    difficulty: "Advanced",
    updated: "2026-09-18",
    sections: [
      {
        heading: "How to read this map",
        paragraphs: [
          "The field moves fast and uses many near synonyms. This map groups work by what improves and how the loop closes. Behavior loops refine answers at run time. Training loops turn traces into weights. Evaluator work decides what good means. Research loops run experiments. Foundations and safety hold the rest honest.",
          "A July 2026 survey organizes about 1250 arXiv papers from 2024 through 2026 along the same lines. Its central cut guides this atlas. Bounded refinement improves behavior against a fixed external check. Open ended recursion also changes the method and the criteria. The second path is far less proven."
        ]
      },
      {
        heading: "Classic roots",
        paragraphs: [
          "Godel Machines set the classic ideal of self rewrite after proof of utility with global optimality framing. The proof demand is too strict for daily practice, so modern loops use empirical gates with sandboxes and full suites.",
          "STaR showed a simple training loop of generate, filter on correct answers, finetune, and repeat. Self Refine showed one model acting as writer, critic, and reviser. Reflexion added verbal reflection with episodic memory. FunSearch paired code generation with automatic evaluation in evolution. Each pattern reappears in current systems."
        ]
      },
      {
        heading: "Current loop designs",
        paragraphs: [
          "Self Rewarding Models let the same model generate answers and judge them for preference training, which creates a genuinely recursive signal with saturation risk. Godel Agent made runtime self patch concrete with memory read and write plus recursive control.",
          "Darwin Godel Machine added an archive of agents with empirical validation on coding benchmarks and reported strong SWE bench movement. AlphaEvolve extended evolution to full files with multi objective search. MetaEvolve moved repair skill into weights with execution rewards.",
          "Recent RSI papers refine the same ideas. Dream RSI uses replay from discovery trees for cheap off policy feedback. Meta N fixes the meta operator and recurses on growing input with convergence set depth. MetaRSI composes data, harness, and model operators under one kernel. Generalized Agent Iteration gives dials for grounding and self reference. Harness self improvement shows context management gains with lower cost. RSIAgent shows training free memory growth with broad then deep search. The Last AI Built by Humans frames the road from execution autonomy to meta improvement. Karpathy autoresearch gives the minimal public template of one file, one metric, and one time box."
        ]
      }
    ],
    tables: [
      {
        title: "Anchor papers and recent advances",
        headers: ["Paper", "Year", "Core idea"],
        rows: [
          ["Godel Machines by Schmidhuber", "2003", "Self rewrite after proof of utility"],
          ["STaR Self Taught Reasoner", "2022", "Bootstrap rationales that lead to right answers"],
          ["Self Refine", "2023", "Writer critic reviser loop with one model"],
          ["Reflexion", "2023", "Verbal reflection stored in episodic memory"],
          ["FunSearch", "2023", "Code evolution guarded by automatic evaluator"],
          ["Self Rewarding Language Models", "2024", "Same model generates and judges for preference data"],
          ["Godel Agent", "2024", "Runtime self read and self patch with recursion"],
          ["Darwin Godel Machine", "2025", "Archive search with benchmark validation"],
          ["AlphaEvolve", "2025", "Full file evolution with rich context"],
          ["MetaEvolve", "2026", "RL for multi round repair meta skills"],
          ["RSI Survey across 1250 papers", "2026", "Taxonomy of behavior, policy, evaluator, research"],
          ["Dream RSI", "2026", "Replay simulator for cheap exploration feedback"],
          ["Meta N", "2026", "Fixed meta operator with growing input depth"],
          ["MetaRSI RSI2", "2026", "Composed data harness model operators"],
          ["Generalized Agent Iteration", "2026", "Formal frame with grounding dials"],
          ["Recursive Harness Self Improvement", "2026", "Prompt level harness edits from pairwise history"],
          ["RSIAgent", "2026", "Training free memory with broad then deep search"],
          ["The Last AI Built by Humans", "2026", "Roadmap across science, embodied work, software"],
          ["Karpathy autoresearch", "2026", "Minimal keep or discard research loop"],
          ["Anthropic progress note on RSI", "2026", "Industry view of harness model co evolution"]
        ]
      }
    ],
    codeSamples: [],
    links: [
      { label: "Godel Machines classic paper", target: "https://arxiv.org/abs/cs/0309048" },
      { label: "STaR Self Taught Reasoner", target: "https://arxiv.org/abs/2203.14465" },
      { label: "Self Refine", target: "https://arxiv.org/abs/2303.17651" },
      { label: "Reflexion", target: "https://arxiv.org/abs/2303.11366" },
      { label: "FunSearch", target: "https://arxiv.org/abs/2305.20050" },
      { label: "Self Rewarding Language Models", target: "https://arxiv.org/abs/2401.10020" },
      { label: "Godel Agent", target: "https://arxiv.org/abs/2410.04444" },
      { label: "Darwin Godel Machine", target: "https://arxiv.org/abs/2505.22954" },
      { label: "AlphaEvolve", target: "https://arxiv.org/abs/2506.13131" },
      { label: "MetaEvolve", target: "https://arxiv.org/abs/2607.21971" },
      { label: "RSI Survey across 1250 papers", target: "https://arxiv.org/abs/2607.07663" },
      { label: "Dream RSI", target: "https://arxiv.org/abs/2609.14858" },
      { label: "Meta N emergent depth", target: "https://arxiv.org/abs/2608.24735" },
      { label: "MetaRSI RSI2", target: "https://arxiv.org/abs/2609.06396" },
      { label: "Generalized Agent Iteration", target: "https://arxiv.org/abs/2609.13406" },
      { label: "Recursive Harness Self Improvement", target: "https://arxiv.org/abs/2607.15524" },
      { label: "RSIAgent", target: "https://arxiv.org/abs/2609.15364" },
      { label: "The Last AI Built by Humans", target: "https://arxiv.org/abs/2609.11873" },
      { label: "Karpathy autoresearch", target: "https://github.com/karpathy/autoresearch" },
      { label: "Code review with spam filter", target: "/docs/code-review" },
      { label: "Core loop deep dive", target: "/docs/loop" }
    ]
  },
  {
    slug: "code-review",
    title: "Code Review With Spam Filter",
    summary: "Trusted public repos, thin studies, and spam patterns with a strict check before reuse.",
    group: "Code Review",
    readingTime: "11 min read",
    difficulty: "Intermediate",
    updated: "2026-09-18",
    sections: [
      {
        heading: "How verification works",
        paragraphs: [
          "Public RSI code ranges from strong systems to thin wrappers. Many repos reuse the same keywords with little code, few tests, no benchmarks, and no history. The atlas applies a strict pass before trust.",
          "A repo earns trust when it shows runnable code, a clear loop, an evaluator that is separate from the worker, logged runs or benchmarks, recent maintenance, and a license. A repo is marked thin when it shows only prompts, only slides, only a fork with no changes, or only keyword text with no execution path."
        ]
      },
      {
        heading: "Trusted references",
        paragraphs: [
          "Darwin Godel Machine is the reference for open ended agent evolution with archive search and coding benchmarks. Godel Agent is the reference for self referential runtime with readable modules and task scripts.",
          "Recursive improve by Kayba is the reference for trace driven product loops with capture, skill, benchmark, dashboard, and ratchet discipline. Karpathy autoresearch is the reference for minimal research loops with one editable file and a fixed budget.",
          "The self improving research kernel is the reference for gated promotion with immutable guards and capability fixtures. Reflexion remains the classic baseline for reflection memory. Each trusted repo maps to one atlas role so readers can borrow mechanics without copying hype."
        ]
      },
      {
        heading: "Thin studies and spam signs",
        paragraphs: [
          "Some repos hold a useful idea with a small community or early code. Program genetic RSI, three phase recursive agents, NFH separation loops, recursive selves, SEED evolution, curious creation, and small Godel inspired frameworks sit in this band. They merit study with tests before reuse.",
          "Spam signs repeat with steady rhythm. Watch for copied abstracts with no code. Watch for chat wrappers with RSI in the title. Watch for forks with no diff beyond the readme. Watch for benchmark claims with no logs. Watch for self judges with no separate check. Watch for update bursts that only touch badges. The atlas keeps these out of the trusted path."
        ]
      }
    ],
    tables: [
      {
        title: "Repository verdicts at time of writing",
        headers: ["Repository", "Signals", "Verdict"],
        rows: [
          ["jennyzzt dgm", "Paper plus benchmarks plus archive search", "Trusted reference"],
          ["Arvid pku Godel Agent", "Paper plus runnable modules", "Trusted reference"],
          ["kayba ai recursive improve", "Traces plus benchmark plus dashboard", "Trusted reference"],
          ["karpathy autoresearch", "Minimal loop plus wide forks", "Trusted reference"],
          ["self improving research kernel", "Immutable guard plus full test gate", "Trusted reference"],
          ["reflexion baseline", "Classic reflection memory", "Trusted reference"],
          ["program genetic RSI study", "Pareto selection with docs", "Useful study"],
          ["recursive agents study", "Three phase scaffold", "Useful study"],
          ["nfh loop study", "Hard shell guards", "Useful study"],
          ["keyword only repos", "No code or no runs", "Spam pattern"]
        ]
      }
    ],
    codeSamples: [],
    links: [
      { label: "Darwin Godel Machine repo", target: "https://github.com/jennyzzt/dgm" },
      { label: "Godel Agent repo", target: "https://github.com/Arvid-pku/Godel_Agent" },
      { label: "Recursive improve repo", target: "https://github.com/kayba-ai/recursive-improve" },
      { label: "Karpathy autoresearch repo", target: "https://github.com/karpathy/autoresearch" },
      { label: "Reflexion repo", target: "https://github.com/noahshinn024/reflexion" },
      { label: "This atlas repo", target: "https://github.com/aniruddhaadak80/RSI" },
      { label: "Research map", target: "/docs/research-papers" },
      { label: "Safety boundary", target: "/docs/safety" }
    ]
  },
  {
    slug: "safety",
    title: "Safety Boundary And Governance",
    summary: "Frozen judges, sandbox limits, kill switch, rollback, and records that keep autonomy measured.",
    group: "Safety",
    readingTime: "10 min read",
    difficulty: "Advanced",
    updated: "2026-09-18",
    sections: [
      {
        heading: "A boundary that code enforces",
        paragraphs: [
          "Safety is a property of the boundary, not a hope about the worker. The worker may be creative. The boundary stays strict. Sandboxing limits writes to the working branch. Network access stays off by default. Secrets never enter prompts or traces.",
          "The judge code, the gate code, and the loop entry point are marked immutable. Any candidate that touches those paths is rejected by rule. High risk patches wait for human approval. A kill switch halts the scheduler at once and leaves the last kept mainline intact."
        ]
      },
      {
        heading: "Records that make trust possible",
        paragraphs: [
          "Every promotion links to tests, scores, costs, and reviewer notes. Every rejection links to reasons and residue. Benchmarks run on held out cases that the generator never sees during search. Judge calibration runs on a schedule with known good and known bad sets.",
          "Cost and latency trends sit beside quality trends so trade choices stay visible. Lineage views show which old win enabled a later breakthrough. A new reader can follow any cycle from task to verdict without hunting through logs."
        ]
      },
      {
        heading: "Named failure modes",
        paragraphs: [
          "Self confirming loops approve weak work because the judge shares worker bias. Model collapse narrows outputs after too much self training without fresh grounding. Diversity collapse fills the archive with near copies of one win.",
          "Metric gaming raises a proxy while true quality stalls. Direction drift changes goals without human consent. The atlas answers each with a named guard, from separate judges to frozen paths to human checkpoints and rollback."
        ]
      }
    ],
    tables: [
      {
        title: "Failure mode and guard",
        headers: ["Failure mode", "Early sign", "Guard"],
        rows: [
          ["Self confirming loop", "Judge approves almost everything", "Separate judge plus calibration sets"],
          ["Model collapse", "Outputs narrow across cycles", "Fresh grounding plus diversity checks"],
          ["Diversity collapse", "Archive fills with near copies", "Archive novelty scoring"],
          ["Metric gaming", "Proxy rises while transfer stalls", "Held out transfer cases"],
          ["Direction drift", "Goals shift without review", "Human checkpoints plus schedule logs"]
        ]
      }
    ],
    codeSamples: [],
    links: [
      { label: "Evaluation order", target: "/docs/evaluation" },
      { label: "Build and run", target: "/docs/build" }
    ]
  },
  {
    slug: "build",
    title: "Build And Run The Atlas",
    summary: "Local engine smoke runs plus docs app setup with calm defaults and small budgets.",
    group: "Build",
    readingTime: "10 min read",
    difficulty: "Intermediate",
    updated: "2026-09-18",
    sections: [
      {
        heading: "Engine smoke run",
        paragraphs: [
          "The engine favors clarity over speed. It stores state as JSON so history can be read without special tools. It writes one folder per generation with verdict and lesson files. It caps patch size to keep review human scale.",
          "Create a Python virtual environment and install the minimal requirements. Run the loop in dry mode for two generations. Read the diary and verdict files. Confirm that rejected tries carry clear reasons. Keep the first real experiment narrow with a fast test."
        ]
      },
      {
        heading: "Docs app setup",
        paragraphs: [
          "The docs app uses Next.js App Router with a fixed left sidebar on desktop and a calm top bar on small screens. The palette rests on slate, emerald, teal, amber, cyan, and warm neutrals. Type scale is steady and spacing is generous.",
          "Move into the docs folder and install dependencies with a clean cache policy. Run the development server and open the local address. Walk the sidebar from Start through Safety to Roadmap. Confirm that search filters by title and summary without a server round trip."
        ]
      },
      {
        heading: "First safe experiment",
        paragraphs: [
          "Pick one narrow task with a fast test. Add one fixture with a hidden check. Run one generation with a small change budget. Keep the patch only when the full suite passes. Archive the rest with reasons and share the diary entry with a reviewer.",
          "When a generation succeeds, raise difficulty by one notch. When a generation fails twice on the same pattern, step difficulty down and grow the lesson archive. Degenerate tasks with no hidden check are rejected at creation time."
        ]
      }
    ],
    tables: [
      {
        title: "Repository layout",
        headers: ["Path", "Purpose"],
        rows: [
          ["README.md", "Full atlas narrative with flowcharts and tables"],
          ["engine rsi loop", "Runnable bounded loop with gates and memory"],
          ["docs app", "Reading experience with sidebar and search"],
          ["docs lib", "Typed content model for pages"],
          ["docs components", "Sidebar, header, cards, diagrams, tables"]
        ]
      }
    ],
    codeSamples: [
      {
        title: "Engine dry run",
        language: "bash",
        code: "py engine/rsi_loop.py --state engine_state --generation 1 --files worker/planner.py --changes 1 --passed true --gain 0.2 --cost -0.1\npy engine/rsi_loop.py --state engine_state --generation 2 --files judge/judge.py --changes 1 --passed true --gain 0.4 --cost 0.0\ntype engine_state\\history.json"
      },
      {
        title: "Docs app commands",
        language: "bash",
        code: "cd docs\nnpm install --package-lock=false\nnpm run dev\nnpm run build"
      }
    ],
    links: [
      { label: "Roadmap", target: "/docs/roadmap" },
      { label: "Start with simple words", target: "/docs/start" }
    ]
  },
  {
    slug: "roadmap",
    title: "Roadmap And Contributions",
    summary: "Near term legibility, mid term operator composition, long term measured autonomy with open tasks.",
    group: "Roadmap",
    readingTime: "8 min read",
    difficulty: "Easy",
    updated: "2026-09-18",
    sections: [
      {
        heading: "Near term focus",
        paragraphs: [
          "Near term work favors legibility and small safe wins. The diary format gains richer cost views. The fixture set grows across math, code repair, and planning tasks. Judge calibration gains a visible dashboard.",
          "Docs gain guided paths for students, builders, and reviewers. Each path keeps plain words, steady rhythm, and calm color. New diagrams favor CSS and SVG so pages stay fast."
        ]
      },
      {
        heading: "Mid term composition",
        paragraphs: [
          "Mid term work composes data, harness, and model loops under joint budgets. Transfer tests cover new domains with true held out cases. The archive gains lineage views that show which old win enabled a later breakthrough.",
          "Meta scheduling revises operator order from evidence rather than habit. Cost aware routing sends cheap tries to fast loops and costly tries to gated loops. Review load stays human scale through small diffs."
        ]
      },
      {
        heading: "Long term measure",
        paragraphs: [
          "Long term work admits broader tasks only with stronger sandboxes and clearer stop rules. Governance grade measurement tracks autonomy, grounding strength, and drift with the same rigor as accuracy.",
          "Contributions stay welcome through small focused pull requests with tests attached. Open an issue first for larger ideas. Keep judges separate from workers. Keep costs visible. Keep language simple so the record stays shared."
        ]
      }
    ],
    tables: [
      {
        title: "Open tasks by horizon",
        headers: ["Horizon", "Task", "Proof of done"],
        rows: [
          ["Near", "Cost dashboard in diary", "Before and after cost per generation"],
          ["Near", "Guided student path", "Three readable pages with diagrams"],
          ["Mid", "Joint operator schedule", "Shared budget with logged choices"],
          ["Mid", "Lineage view", "Archive graph from win to later win"],
          ["Long", "Autonomy metrics", "Grounded scorecard with drift checks"]
        ]
      }
    ],
    codeSamples: [],
    links: [
      { label: "Build and run", target: "/docs/build" },
      { label: "Safety boundary", target: "/docs/safety" }
    ]
  }
];

export function getDoc(slug: string): DocPage | undefined {
  return docs.find(function (item) {
    return item.slug === slug;
  });
}

export function getDocsByGroup(group: string): DocPage[] {
  return docs.filter(function (item) {
    return item.group === group;
  });
}

export function searchDocs(query: string): DocPage[] {
  const clean = query.trim().toLowerCase();
  if (clean.length === 0) {
    return docs;
  }
  return docs.filter(function (item) {
    const hay = item.title.concat(" ").concat(item.summary).toLowerCase();
    return hay.includes(clean);
  });
}

export function getPrevNext(slug: string): { prev: DocPage | undefined; next: DocPage | undefined } {
  const index = docs.findIndex(function (item) {
    return item.slug === slug;
  });
  if (index < 0) {
    return { prev: undefined, next: undefined };
  }
  const prev = index > 0 ? docs[index - 1] : undefined;
  const next = index < docs.length - 1 ? docs[index + 1] : undefined;
  return { prev: prev, next: next };
}
