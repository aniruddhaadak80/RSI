type Metric = {
  value: string;
  label: string;
  note: string;
  tone: string;
};

const metrics: Metric[] = [
  { value: "1250", label: "Papers mapped", note: "A 2026 survey across four loop families plus foundations", tone: "card card-soft-emerald" },
  { value: "20 to 50", label: "SWE bench path", note: "Reported Darwin Godel Machine movement in percent", tone: "card card-soft-teal" },
  { value: "One", label: "Change per cycle", note: "Small diffs keep review human scale and safe", tone: "card card-soft-amber" },
  { value: "Full", label: "Suite for promotion", note: "Partial tests guide search, full suite decides", tone: "card card-soft-cyan" }
];

export default function MetricRow() {
  return (
    <div className="grid-three" aria-label="Atlas metrics">
      {metrics.slice(0, 3).map(function (item) {
        return (
          <div className={item.tone} key={item.label}>
            <div style={{ fontSize: 34, fontWeight: 850, letterSpacing: "-0.02em" }}>{item.value}</div>
            <h3>{item.label}</h3>
            <p>{item.note}</p>
          </div>
        );
      })}
      <div className={metrics[3].tone} key={metrics[3].label}>
        <div style={{ fontSize: 34, fontWeight: 850, letterSpacing: "-0.02em" }}>{metrics[3].value}</div>
        <h3>{metrics[3].label}</h3>
        <p>{metrics[3].note}</p>
      </div>
    </div>
  );
}
