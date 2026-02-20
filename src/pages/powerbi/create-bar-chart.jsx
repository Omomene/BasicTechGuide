 import Layout from "../../components/Layout";
import TutorialLayout from "../../components/TutorialLayout";
import StepBlock from "../../components/StepBlock";
import Breadcrumb from "../../components/Breadcrumb";

import step1 from "../../assets/images/powerbi/create-bar-chart/step-1.webp";
import step2 from "../../assets/images/powerbi/create-bar-chart/step-2.webp";
import step3 from "../../assets/images/powerbi/create-bar-chart/step-3.webp";
import step4 from "../../assets/images/powerbi/create-bar-chart/step-4.webp";
import step5 from "../../assets/images/powerbi/create-bar-chart/step-5.webp";

function CreateBarChart() {
  const category = { name: "Power BI", slug: "powerbi" };
  const guide = { title: "Create a Bar Chart" };

  return (
    <Layout>
      <Breadcrumb category={category} guide={guide} />
      <TutorialLayout
        title={guide.title}
        description="Step-by-step guide to create a simple bar chart in Power BI."
      >
        <StepBlock title="Step 1 – Select Data" image={step1} alt="Select data for chart">
          Click on the table or fields you want to visualize.
        </StepBlock>
        <StepBlock title="Step 2 – Choose Visual" image={step2} alt="Choose bar chart visual">
          Select the bar chart icon from Visualizations pane.
        </StepBlock>
        <StepBlock title="Step 3 – Drag Fields" image={step3} alt="Drag fields to axis and value">
          Drag fields to Axis and Values.
        </StepBlock>
        <StepBlock title="Step 4 – Customize" image={step4} alt="Customize chart colors and labels">
          Adjust colors, labels, and title.
        </StepBlock>
        <StepBlock title="Step 5 – Save Chart" image={step5} alt="Save report">
          Save your report.
        </StepBlock>
      </TutorialLayout>
    </Layout>
  );
}

export default CreateBarChart;
