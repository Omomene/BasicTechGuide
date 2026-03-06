import Layout from "../components/Layout";
import AboutSidebar from "../components/AboutSidebar";

function Disclaimer() {
  return (
    <Layout sidebar={<AboutSidebar />}>

      <h1>Disclaimer</h1>

      <p><em>Last updated: March 2026</em></p>

      <p>
        The information provided on BasicTechGuide is for educational
        and informational purposes only.
      </p>

      <h2>Content Accuracy</h2>

      <p>
        While we strive to provide clear and accurate guides, technology
        changes frequently and we cannot guarantee that all information
        on this website will always be complete, accurate, or up to date.
      </p>

      <h2>No Professional Advice</h2>

      <p>
        The content on BasicTechGuide should not be considered
        professional technical advice. Users should verify information
        before applying it to their own systems or devices.
      </p>

      <h2>Use at Your Own Risk</h2>

      <p>
        By using the guides and tutorials on this website, you acknowledge
        that you do so at your own risk. BasicTechGuide will not be liable
        for any losses, damages, or technical issues that may result from
        following the instructions provided.
      </p>

      <h2>External Links</h2>

      <p>
        Some pages may include links to external websites. We are not
        responsible for the content, reliability, or practices of these
        third-party sites.
      </p>

      <h2>Contact</h2>

      <p>
        If you have questions about this disclaimer, you may contact us at:
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

export default Disclaimer;