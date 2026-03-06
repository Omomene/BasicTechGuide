import { useState } from "react";
import Layout from "../components/Layout";
import AboutSidebar from "../components/AboutSidebar";

function Contact() {

  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);

    const response = await fetch("https://formspree.io/f/mgonwbol", {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json"
      }
    });

    if (response.ok) {
      setSent(true);
    }

    setLoading(false);
  };

  return (
    <Layout sidebar={<AboutSidebar />}>
      <div className="post entry">

        {sent ? (

          <div className="contact-success">
            <p>
              ✓ Thank you for your message. We'll get back to you soon.
            </p>

            <a href="/" className="contact-home-link">
              Return to homepage
            </a>
          </div>

        ) : (

          <>
            <h1>Contact Us</h1>

            <p>
              If you have questions, suggestions, or feedback about BasicTechGuide,
              feel free to contact us. Email us at{" "}
              <a href="mailto:info@basictechguide.com">
                info@basictechguide.com
              </a>{" "}
              or fill the contact form below.
            </p>

            <form onSubmit={handleSubmit} className="contact-form">

              <input type="text" name="_gotcha" style={{ display: "none" }} />

              <label>Name</label>
              <input type="text" name="name" required />

              <label>Email</label>
              <input type="email" name="email" required />

              <label>Message</label>
              <textarea name="message" rows="6" required />

              <button type="submit" disabled={loading}>
                {loading ? "Sending..." : "Send Message"}
              </button>

            </form>
          </>

        )}

      </div>
    </Layout>
  );
}

export default Contact;