
import Layout from "../../components/Layout";
import TutorialLayout from "../../components/TutorialLayout";
import StepBlock from "../../components/StepBlock";
import Breadcrumb from "../../components/Breadcrumb";

function CreatePieChart() {

  const category = { name: "excel", slug: "excel" };
  const guide = { title: "Create Pie Chart" };

  return (

    <Layout>

      <Breadcrumb category={category} guide={guide} />

      <TutorialLayout
        title={guide.title}
        description="Step-by-step guide to create pie chart."
      >

        <p>This guide explains how to create pie chart step-by-step. Follow the instructions below to complete the task efficiently.</p>

        
<StepBlock title="Step 1 go to the tab" image="" alt="Step 1 go to the tab">
  <p>create a bar chart </p>
</StepBlock>


      </TutorialLayout>

    </Layout>

  );

}

export default CreatePieChart;
