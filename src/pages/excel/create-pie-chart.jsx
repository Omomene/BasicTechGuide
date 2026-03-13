
import Layout from "../../components/Layout";
import TutorialLayout from "../../components/TutorialLayout";
import StepBlock from "../../components/StepBlock";
import Breadcrumb from "../../components/Breadcrumb";

function CreatePieChart() {
  const category = { name: "excel", slug: "excel" };
  const guide = { title: "Create Pie Chart" };
  const intro = "This guide explains create pie chart step-by-step.";

  return (
    <Layout>
      <Breadcrumb category={category} guide={guide} />
      <TutorialLayout title={guide.title} description={intro}>
        <p>{intro}</p>
        
<StepBlock title="Step 1 go to the tab" image="/assets/images/excel/create-pie-chart/first-match.png">
  <p>create a bar chart </p>
</StepBlock>
      </TutorialLayout>
    </Layout>
  );
}

export default CreatePieChart;
