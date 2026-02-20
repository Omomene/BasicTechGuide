 import Layout from "../../components/Layout";
import TutorialLayout from "../../components/TutorialLayout";
import StepBlock from "../../components/StepBlock";
import Breadcrumb from "../../components/Breadcrumb";

import step1 from "../../assets/images/excel/create-chart/step-1.webp";
import step2 from "../../assets/images/excel/create-chart/step-2.webp";
import step3 from "../../assets/images/excel/create-chart/step-3.webp";
import step4 from "../../assets/images/excel/create-chart/step-4.webp";
import step5 from "../../assets/images/excel/create-chart/step-5.webp";

function CreateChart() {
  const category = { name: "Excel", slug: "excel" };
  const guide = { title: "Create Chart" };

  return (
    <Layout>
      <Breadcrumb category={category} guide={guide} />
      <TutorialLayout
        title={guide.title}
        description="Step-by-step guide to create a chart in Excel."
      >
        <StepBlock title="Step 1 – Select Data" image={step1} alt="Select data for chart">
          Highlight the data for your chart.
        </StepBlock>
        <StepBlock title="Step 2 – Go to Insert Tab" image={step2} alt="Insert tab in Excel">
          Click the Insert tab.
        </StepBlock>
        <StepBlock title="Step 3 – Choose Chart Type" image={step3} alt="Choose chart type">
          Select a bar, line, or pie chart.
        </StepBlock>
        <StepBlock title="Step 4 – Customize Chart" image={step4} alt="Customize chart">
          Adjust colors, labels, and title.
        </StepBlock>
        <StepBlock title="Step 5 – Final Chart" image={step5} alt="Completed chart">
          Your chart is ready.
        </StepBlock>
      </TutorialLayout>
    </Layout>
  );
}

export default CreateChart;