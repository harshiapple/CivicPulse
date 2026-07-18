function Testimonials() {
  const testimonials = [
    {
      name: "Rahul Sharma",
      role: "Citizen",
      review:
        "Reporting road issues has never been easier. Authorities responded within two days."
    },
    {
      name: "Priya Reddy",
      role: "Resident",
      review:
        "The live tracking feature keeps me informed throughout the complaint process."
    },
    {
      name: "Municipal Officer",
      role: "Administrator",
      review:
        "AI categorization significantly reduced manual work and improved response times."
    }
  ];

  return (
    <section className="testimonials">
      <h2>What People Say</h2>

      <div className="testimonial-grid">
        {testimonials.map((item, index) => (
          <div className="testimonial-card" key={index}>
            <p>"{item.review}"</p>

            <h4>{item.name}</h4>

            <span>{item.role}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Testimonials;