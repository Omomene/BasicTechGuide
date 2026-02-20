 import Layout from "../../components/Layout";
import TutorialLayout from "../../components/TutorialLayout";
import StepBlock from "../../components/StepBlock";
import Breadcrumb from "../../components/Breadcrumb";

import step1 from "../../assets/images/powerbi/add-slicer/step-1.webp";
import step2 from "../../assets/images/powerbi/add-slicer/step-2.webp";
import step3 from "../../assets/images/powerbi/add-slicer/step-3.webp";
import step4 from "../../assets/images/powerbi/add-slicer/step-4.webp";
import step5 from "../../assets/images/powerbi/add-slicer/step-5.webp";

function AddSlicer() {
  const category = { name: "Power BI", slug: "powerbi" };
  const guide = { title: "Add a Slicer" };

  return (
    <Layout>
      <Breadcrumb category={category} guide={guide} />
      <TutorialLayout
        title={guide.title}
        description="Guide to add a slicer for interactive filtering."
      >
        <StepBlock title="Step 1 – Select Page" image={step1} alt="Select report page">
          Go to the report page where you want the slicer.
        </StepBlock>
        <StepBlock title="Step 2 – Insert Slicer" image={step2} alt="Insert slicer">
          Click Slicer icon in Visualizations pane.
        </StepBlock>
        <StepBlock title="Step 3 – Drag Field" image={step3} alt="Drag field to slicer">
          Drag a field into the slicer.
        </StepBlock>
        <StepBlock title="Step 4 – Adjust Format" image={step4} alt="Adjust slicer format">
          Resize and style slicer.
        </StepBlock>
        <StepBlock title="Step 5 – Test Slicer" image={step5} alt="Test slicer filter">
          Check that filtering works on visuals.
        </StepBlock>
      </TutorialLayout>
    </Layout>
  );
}

export default AddSlicer;
