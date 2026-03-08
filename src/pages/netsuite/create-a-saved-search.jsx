
import Layout from "../../components/Layout";
import TutorialLayout from "../../components/TutorialLayout";
import StepBlock from "../../components/StepBlock";
import Breadcrumb from "../../components/Breadcrumb";

function Createasavedsearch() {

  const category = { name: "netsuite", slug: "netsuite" };
  const guide = { title: "Create a saved search" };

  return (

    <Layout>

      <Breadcrumb category={category} guide={guide} />

      <TutorialLayout
        title={guide.title}
        description="Step-by-step guide to create a saved search."
      >

        <p>This guide explains how to create a saved search step-by-step. Follow the instructions below to complete the task efficiently.</p>

        
<StepBlock title="Step 1" image="" alt="Step 1">
  <p>Select existing record on netsuite</p>
</StepBlock>


      </TutorialLayout>

    </Layout>

  );

}

export default Createasavedsearch;
