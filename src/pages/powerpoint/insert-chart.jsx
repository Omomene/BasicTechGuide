import Layout from "../../components/Layout";
import TutorialLayout from "../../components/TutorialLayout";
import StepBlock from "../../components/StepBlock";
import Breadcrumb from "../../components/Breadcrumb";

import step1 from "../../assets/images/powerpoint/insert-chart/step-1.webp";
import step2 from "../../assets/images/powerpoint/insert-chart/step-2.webp";
import step3 from "../../assets/images/powerpoint/insert-chart/step-3.webp";
import step4 from "../../assets/images/powerpoint/insert-chart/step-4.webp";
import step5 from "../../assets/images/powerpoint/insert-chart/step-5.webp";

function InsertChart() {
  const category = { name: "PowerPoint", slug: "powerpoint" };
  const guide = { title: "Insert a Chart" };

  return (
    <Layout>
      <Breadcrumb category={category} guide={guide} />
      <TutorialLayout
        title={guide.title}
        description="Guide to insert a chart into your PowerPoint slide."
      >
        <StepBlock title="Step 1 – Select Slide" image={step1} alt="Select slide">
          Click the slide where chart will be inserted.
        </StepBlock>
        <StepBlock title="Step 2 – Insert Tab" image={step2} alt="Insert tab">
          Go to the Insert tab → Chart.
        </StepBlock>
        <StepBlock title="Step 3 – Choose Chart Type" image={step3} alt="Choose chart type">
          Select a chart type (Bar, Pie, Line, etc.).
        </StepBlock>
        <StepBlock title="Step 4 – Edit Data" image={step4} alt="Edit chart data">
          Enter data in Excel sheet that opens.
        </StepBlock>
        <StepBlock title="Step 5 – Adjust Design" image={step5} alt="Adjust chart design">
          Customize chart design and colors.
        </StepBlock>
      </TutorialLayout>
    </Layout>
  );
}

export default InsertChart; 
