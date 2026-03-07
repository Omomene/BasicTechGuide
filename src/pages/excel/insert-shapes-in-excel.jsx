
import Layout from "../../components/Layout";
import TutorialLayout from "../../components/TutorialLayout";
import StepBlock from "../../components/StepBlock";
import Breadcrumb from "../../components/Breadcrumb";

function InsertShapesinExcel() {
  const category = { name: "excel", slug: "excel" };
  const guide = { title: "Insert Shapes in Excel" };

  return (
    <Layout>
      <Breadcrumb category={category} guide={guide} />
      <TutorialLayout
        title={guide.title}
        description="Step-by-step guide to insert shapes in excel."
      >
        <p>This guide explains how to insert shapes in excel step-by-step. Follow the instructions below to complete the task efficiently.</p>

        
    <StepBlock title="Step 1" image="" alt="Step 1">
      <p>thank you</p>
    </StepBlock>
    

      </TutorialLayout>
    </Layout>
  );
}

export default InsertShapesinExcel;
