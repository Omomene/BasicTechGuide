 import Layout from "../../components/Layout";
import TutorialLayout from "../../components/TutorialLayout";
import StepBlock from "../../components/StepBlock";
import Breadcrumb from "../../components/Breadcrumb";

import step1 from "../../assets/images/netsuite/personalize-dashboard/step-1.webp";
import step2 from "../../assets/images/netsuite/personalize-dashboard/step-2.webp";
import step3 from "../../assets/images/netsuite/personalize-dashboard/step-3.webp";
import step4 from "../../assets/images/netsuite/personalize-dashboard/step-4.webp";
import step5 from "../../assets/images/netsuite/personalize-dashboard/step-5.webp";

function PersonalizeDashboard() {
  const category = { name: "NetSuite", slug: "netsuite" };
  const guide = { title: "Personalize Dashboard" };

  return (
    <Layout>
      <Breadcrumb category={category} guide={guide} />
      <TutorialLayout
        title={guide.title}
        description="Guide to personalize your NetSuite dashboard."
      >
        <StepBlock title="Step 1 – Open Dashboard" image={step1} alt="Open dashboard">
          Navigate to your homepage dashboard.
        </StepBlock>
        <StepBlock title="Step 2 – Enter Edit Mode" image={step2} alt="Edit mode">
          Click Edit or Customize.
        </StepBlock>
        <StepBlock title="Step 3 – Add Portlets" image={step3} alt="Add portlets">
          Drag portlets to desired positions.
        </StepBlock>
        <StepBlock title="Step 4 – Resize & Arrange" image={step4} alt="Resize portlets">
          Adjust sizes and layout.
        </StepBlock>
        <StepBlock title="Step 5 – Save Dashboard" image={step5} alt="Save dashboard">
          Save your changes.
        </StepBlock>
      </TutorialLayout>
    </Layout>
  );
}

export default PersonalizeDashboard;
