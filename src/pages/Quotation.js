import React, { useState } from "react";
import "../styles/Quotation.css";

const Quotation = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    requirements: "",
  });

  const [status, setStatus] = useState("idle"); // idle | submitting | success | error

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("submitting");

    // Simulate sending (replace with real API call later)
    setTimeout(() => {
      if (formData.fullName && formData.email && formData.phone && formData.requirements) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    }, 1200);
  };

  return (
    <div className="quotation-page">
      <div className="quotation-container">
        <h1>Get the Best Offer</h1>
        <p className="subtitle">
          Tell us your requirements and we'll get back to you with the best quote.
        </p>

        <form onSubmit={handleSubmit} className="quotation-form">
          <div className="form-group">
            <label htmlFor="fullName">
              Full Name <span className="required">*</span>
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              placeholder="Your full name"
              value={formData.fullName}
              onChange={handleChange}
              required
              disabled={status === "submitting"}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">
              Email Address <span className="required">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="yourname@example.com"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={status === "submitting"}
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">
              Phone / WhatsApp Number <span className="required">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="+92 321 1234567"
              value={formData.phone}
              onChange={handleChange}
              required
              disabled={status === "submitting"}
            />
          </div>

          <div className="form-group">
            <label htmlFor="requirements">
              Your Requirements / Project Details <span className="required">*</span>
            </label>
            <textarea
              id="requirements"
              name="requirements"
              placeholder="Example:
• 10 × 550W solar panels
• 5kW hybrid inverter
• 10kWh lithium battery
Location: Karachi"
              value={formData.requirements}
              onChange={handleChange}
              rows={5}
              required
              disabled={status === "submitting"}
            />
          </div>

          <button
            type="submit"
            className={`btn-submit ${status === "submitting" ? "loading" : ""}`}
            disabled={status === "submitting"}
          >
            {status === "submitting" ? (
              <>
                <span className="spinner"></span> Sending...
              </>
            ) : status === "success" ? (
              "Request Sent ✓"
            ) : (
              "Send Request"
            )}
          </button>

          {status === "success" && (
            <div className="success-message">
              Thank you! Your quotation request has been sent.<br />
              We'll contact you shortly with the best offer.
            </div>
          )}

          {status === "error" && (
            <div className="error-message">
              Please fill in all required fields.
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Quotation;