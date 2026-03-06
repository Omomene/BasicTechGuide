import Layout from "../components/Layout";
import AboutSidebar from "../components/AboutSidebar";

function PrivacyPolicy() {
  return (
    <Layout sidebar={<AboutSidebar />}>

      <h1>Privacy Policy</h1>
      <p><em>Last updated: March 2026</em></p>
      <p>
        At BasicTechGuide, we respect your privacy and are committed to protecting
        your personal information. This Privacy Policy explains what information
        we collect, how we use it, and what rights you have regarding your data.
      </p>

      <h2>1. Information We Collect</h2>

      <p>
        We may collect personal information when you voluntarily contact us
        through our contact form or by email.
      </p>

      <p>This information may include:</p>

      <ul>
        <li>Your name</li>
        <li>Your email address</li>
        <li>The message you send us</li>
      </ul>

      <p>
        This information is only collected when you choose to provide it.
      </p>

      <h2>2. How We Use Your Information</h2>

      <p>
        The information you provide is used only for the purpose of:
      </p>

      <ul>
        <li>Responding to your questions or messages</li>
        <li>Improving the content and usefulness of BasicTechGuide</li>
        <li>Maintaining communication with users who request assistance</li>
      </ul>

      <p>
        We do not sell, rent, or share your personal information with third parties.
      </p>

      <h2>3. Website Analytics</h2>

      <p>
        Like most websites, BasicTechGuide may collect anonymous usage data
        through analytics tools. This may include information such as:
      </p>

      <ul>
        <li>Pages visited</li>
        <li>Time spent on pages</li>
        <li>General geographic region</li>
        <li>Device or browser type</li>
      </ul>

      <p>
        This information is used only to understand how visitors use the site
        and to improve our guides and tutorials.
      </p>

      <h2>4. Cookies</h2>

      <p>
        BasicTechGuide may use cookies or similar technologies to improve
        the user experience and understand website traffic.
      </p>

      <p>
        Cookies are small files stored on your device that help websites
        remember preferences and analyze usage patterns.
      </p>

      <h2>5. Third-Party Services</h2>

      <p>
        Our contact form is powered by Formspree, a third-party service that
        processes form submissions and forwards them to our email inbox.
        When you submit the contact form, your information is processed
        according to Formspree's privacy practices.
      </p>

      <h2>6. Data Protection</h2>

      <p>
        We take reasonable measures to protect the information submitted
        through this website. However, no internet transmission can be
        guaranteed to be completely secure.
      </p>

      <h2>7. Your Rights</h2>

      <p>
        If you are located in the European Union, you have rights under
        the General Data Protection Regulation (GDPR), including the right to:
      </p>

      <ul>
        <li>Request access to the personal data we hold about you</li>
        <li>Request correction or deletion of your data</li>
        <li>Withdraw consent for data processing</li>
      </ul>

      <h2>8. Contact</h2>

      <p>
        If you have any questions about this Privacy Policy or your data,
        you may contact us at:
      </p>

      <p>
        <strong>Email:</strong>{" "}
        <a href="mailto:info@basictechguide.com">
          info@basictechguide.com
        </a>
      </p>

      <h2>9. Updates to This Policy</h2>

      <p>
        This Privacy Policy may be updated from time to time to reflect
        changes to the website or legal requirements. Updates will be
        posted on this page.
      </p>

    </Layout>
  );
}

export default PrivacyPolicy;