import Layout from "../components/Layout";
import AboutSidebar from "../components/AboutSidebar";

function Terms() {
  return (
    <Layout sidebar={<AboutSidebar />}>

      <h1>Terms and Conditions</h1>

      <p><em>Last updated: March 2026</em></p>

      <p>
        Welcome to BasicTechGuide. By accessing or using this website,
        you agree to comply with and be bound by the following Terms
        and Conditions. If you do not agree with any part of these terms,
        please do not use the website.
      </p>

      <h2>1. Use of the Website</h2>

      <p>
        BasicTechGuide provides educational guides and tutorials designed
        to help users understand everyday technology, software, and web tools.
      </p>

      <p>
        You agree to use this website only for lawful purposes and in a way
        that does not harm the website, its users, or its content.
      </p>

      <h2>2. Intellectual Property</h2>

      <p>
        All content on BasicTechGuide, including guides, text, images,
        graphics, and design elements, is the property of BasicTechGuide
        unless otherwise stated.
      </p>

      <p>
        You may view and use the content for personal and educational
        purposes only. You may not reproduce, copy, modify, or distribute
        the content without permission.
      </p>

      <h2>3. Accuracy of Information</h2>

      <p>
        We aim to provide accurate and up-to-date information. However,
        technology changes quickly and we cannot guarantee that all
        information on the site is always complete or current.
      </p>

      <h2>4. External Links</h2>

      <p>
        BasicTechGuide may contain links to external websites. We are not
        responsible for the content, policies, or practices of those
        third-party websites.
      </p>

      <h2>5. Limitation of Liability</h2>

      <p>
        BasicTechGuide is provided for informational and educational
        purposes only. We are not responsible for any damages, losses,
        or issues that may occur from using the information on this site.
      </p>

      <h2>6. Changes to These Terms</h2>

      <p>
        We may update these Terms and Conditions from time to time.
        Updates will be posted on this page.
      </p>

      <h2>7. Contact</h2>

      <p>
        If you have questions about these Terms and Conditions,
        you may contact us at:
      </p>

      <p>
        <strong>Email:</strong>{" "}
        <a href="mailto:info@basictechguide.com">
          info@basictechguide.com
        </a>
      </p>

    </Layout>
  );
}

export default Terms;