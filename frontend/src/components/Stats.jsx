function Stats() {
  const stats = [
    { value: "50K+", label: "Reports Submitted" },
    { value: "95%", label: "Resolved Cases" },
    { value: "100+", label: "Cities Connected" },
    { value: "24/7", label: "Availability" }
  ];

  return (
    <section id="stats" className="stats">
      <h2>CivicPulse Impact</h2>

      <div className="stats-grid">
        {stats.map((item, index) => (
          <div className="stat-box" key={index}>
            <h3>{item.value}</h3>

            <p>{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Stats;