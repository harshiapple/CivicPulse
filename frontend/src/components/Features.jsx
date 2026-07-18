function Features() {
  const features = [
    {
      icon: "📍",
      title: "Location Tracking",
      description:
        "Automatically capture the exact location of reported civic issues."
    },
    {
      icon: "🤖",
      title: "AI Classification",
      description:
        "AI detects whether the issue is a pothole, garbage dump, streetlight, or water leakage."
    },
    {
      icon: "📸",
      title: "Photo Evidence",
      description:
        "Upload images so authorities can verify issues quickly."
    },
    {
      icon: "📈",
      title: "Live Status",
      description:
        "Track your complaint from submission to resolution."
    }
  ];

  return (
    <section id="features" className="features">
      <h2>Platform Features</h2>
      <p className="section-subtitle">
        Everything needed for smarter civic issue reporting.
      </p>

      <div className="feature-grid">
        {features.map((feature, index) => (
          <div className="feature-card" key={index}>
            <div className="feature-icon">{feature.icon}</div>

            <h3>{feature.title}</h3>

            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Features;