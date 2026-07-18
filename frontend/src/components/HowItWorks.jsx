function HowItWorks() {
  const steps = [
    {
      number: "1",
      title: "Register",
      desc: "Create your CivicPulse account."
    },
    {
      number: "2",
      title: "Report Issue",
      desc: "Upload an image and description."
    },
    {
      number: "3",
      title: "AI Verification",
      desc: "AI classifies the complaint automatically."
    },
    {
      number: "4",
      title: "Track Progress",
      desc: "Monitor every stage until resolution."
    }
  ];

  return (
    <section id="how" className="how">
      <h2>How It Works</h2>

      <div className="steps">
        {steps.map((step, index) => (
          <div className="step-card" key={index}>
            <div className="step-number">{step.number}</div>

            <h3>{step.title}</h3>

            <p>{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default HowItWorks;