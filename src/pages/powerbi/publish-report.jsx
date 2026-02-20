 import Layout from "../../components/Layout";
import TutorialLayout from "../../components/TutorialLayout";
import StepBlock from "../../components/StepBlock";
import Breadcrumb from "../../components/Breadcrumb";

import step1 from "../../assets/images/powerbi/publish-report/step-1.webp";
import step2 from "../../assets/images/powerbi/publish-report/step-2.webp";
import step3 from "../../assets/images/powerbi/publish-report/step-3.webp";
import step4 from "../../assets/images/powerbi/publish-report/step-4.webp";
import step5 from "../../assets/images/powerbi/publish-report/step-5.webp";

function PublishReport() {
  const category = { name: "Power BI", slug: "powerbi" };
  const guide = { title: "Publish Report" };

  return (
    <Layout>
      <Breadcrumb category={category} guide={guide} />
      <TutorialLayout
        title={guide.title}
        description="Step-by-step guide to publish a Power BI report online."
      >
        <StepBlock title="Step 1 – Save Report" image={step1} alt="Save report file">
          Save your Power BI report.
        </StepBlock>
        <StepBlock title="Step 2 – Click Publish" image={step2} alt="Publish button">
          Click Publish on Home tab.
        </StepBlock>
        <StepBlock title="Step 3 – Sign In" image={step3} alt="Sign in Power BI service">
          Sign in to Power BI Service.
        </StepBlock>
        <StepBlock title="Step 4 – Choose Workspace" image={step4} alt="Select workspace">
          Select a workspace to publish.
        </StepBlock>
        <StepBlock title="Step 5 – Confirm" image={step5} alt="Confirm publish">
          Click Publish and verify it appears in service.
        </StepBlock>
      </TutorialLayout>
    </Layout>
  );
}

export default PublishReport;
