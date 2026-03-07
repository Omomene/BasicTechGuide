
import Layout from "../../components/Layout";
import TutorialLayout from "../../components/TutorialLayout";
import StepBlock from "../../components/StepBlock";
import Breadcrumb from "../../components/Breadcrumb";

function TrimFunctioninExcel() {
  const category = { name: "excel", slug: "excel" };
  const guide = { title: "Trim Function in Excel" };

  return (
    <Layout>
      <Breadcrumb category={category} guide={guide} />
      <TutorialLayout
        title={guide.title}
        description="Step-by-step guide to trim function in excel."
      >
        <p>This guide explains how to trim function in excel step-by-step. Follow the instructions below to complete the task efficiently.</p>

        
    <StepBlock title="Step 1 " image="/assets/images/excel/trim-function-in-excel/first-match.png" alt="Step 1 ">
      <p>Trim function helps to trim</p>
    </StepBlock>
    

      </TutorialLayout>
    </Layout>
  );
}

export default TrimFunctioninExcel;
