type Step = {
  title: string;
  text: string;
  accent: string;
  chip: string;
};

const steps: Step[] = [
  {
    title: "Task arrives",
    text: "A narrow goal enters with scope, budget, and stop rules written in plain form.",
    accent: "linear-gradient(135deg, #92400e, #b45309)",
    chip: "#fffbeb"
  },
  {
    title: "Plan and act",
    text: "The planner sets one aim. The actor writes code while the recorder saves the trace.",
    accent: "linear-gradient(135deg, #065f46, #047857)",
    chip: "#ecfdf5"
  },
  {
    title: "Score and reflect",
    text: "Tests run first. Judges review second. A short lesson names pattern and repair.",
    accent: "linear-gradient(135deg, #0e7490, #0284c7)",
    chip: "#ecfeff"
  },
  {
    title: "Propose one patch",
    text: "One small change ships with one matching test on a separate branch.",
    accent: "linear-gradient(135deg, #065f46, #0f766e)",
    chip: "#ecfdf5"
  },
  {
    title: "Gate and verdict",
    text: "Frozen paths are checked. The full suite runs. Accept moves forward, reject archives.",
    accent: "linear-gradient(135deg, #0f172a, #334155)",
    chip: "#f1f5f9"
  },
  {
    title: "Memory compounds",
    text: "Wins update method. Losses update lessons. The next round starts stronger.",
    accent: "linear-gradient(135deg, #0f766e, #0e7490)",
    chip: "#f0fdfa"
  }
];

export default function FlowDiagram() {
  return (
    <div className="flow-steps" aria-label="RSI loop steps">
      {steps.map(function (step, index) {
        return (
          <div className="flow-step" key={step.title} style={{ borderLeft: "6px solid transparent", borderLeftColor: step.chip }}>
            <div className="flow-number" style={{ background: step.accent }}>
              {String(index + 1).padStart(2, "0")}
            </div>
            <div>
              <p className="flow-step-title">{step.title}</p>
              <p className="flow-step-text">{step.text}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
