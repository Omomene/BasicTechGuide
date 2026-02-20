 import Layout from "../../components/Layout";
import TutorialLayout from "../../components/TutorialLayout";
import StepBlock from "../../components/StepBlock";
import Breadcrumb from "../../components/Breadcrumb";

import step1 from "../../assets/images/powerbi/dashboard-tile/step-1.webp";
import step2 from "../../assets/images/powerbi/dashboard-tile/step-2.webp";
import step3 from "../../assets/images/powerbi/dashboard-tile/step-3.webp";
import step4 from "../../assets/images/powerbi/dashboard-tile/step-4.webp";
import step5 from "../../assets/images/powerbi/dashboard-tile/step-5.webp";

function DashboardTile() {
  const category = { name: "Power BI", slug: "powerbi" };
  const guide = { title: "Pin to Dashboard" };

  return (
    <Layout>
      <Breadcrumb category={category} guide={guide} />
      <TutorialLayout
        title={guide.title}
        description="Guide to pin a visualization to a Power BI dashboard."
      >
        <StepBlock title="Step 1 – Select Visual" image={step1} alt="Select visual">
          Click the visual you want to pin.
        </StepBlock>
        <StepBlock title="Step 2 – Pin Icon" image={step2} alt="Click pin icon">
          Click the pin icon in top-right.
        </StepBlock>
        <StepBlock title="Step 3 – Choose Dashboard" image={step3} alt="Select dashboard">
          Select existing or new dashboard.
        </StepBlock>
        <StepBlock title="Step 4 – Confirm" image={step4} alt="Confirm pinning">
          Click Pin to add to dashboard.
        </StepBlock>
        <StepBlock title="Step 5 – Verify" image={step5} alt="Verify tile on dashboard">
          Check dashboard to see tile.
        </StepBlock>
      </TutorialLayout>
    </Layout>
  );
}

export default DashboardTile;
