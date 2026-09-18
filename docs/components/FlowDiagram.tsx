type Step = {
  title: string;
  text: string;
};

const steps: Step[] = [
  { title: "Task arrives", text: "A narrow goal enters with scope, budget, and stop rules written in plain form." },
  { title: "Plan and act", text: "The planner sets one aim. The actor writes code while the recorder saves the trace." },
  { title: "Score and reflect", text: "Tests run first. Judges review second. A short lesson names pattern and repair." },
  { title: "Propose one patch", text: "One small change ships with one matching test on a separate branch." },
  { title: "Gate and verdict", text: "Frozen paths are checked. The full suite runs. Accept moves forward, reject archives." },
  { title: "Memory compounds", text: "Wins update method. Losses update lessons. The next round starts stronger." }
];

export default function FlowDiagram() {
  return (
    <div className="flow-steps" aria-label="RSI loop steps">
      {steps.map(function (step, index) {
        return (
          <div className="flow-step" key={step.title}>
            <div className="flow-number">{String(index + 1).padStart(2, "0")}</div>
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
