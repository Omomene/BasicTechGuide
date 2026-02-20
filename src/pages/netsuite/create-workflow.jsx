 import Layout from "../../components/Layout";
import TutorialLayout from "../../components/TutorialLayout";
import StepBlock from "../../components/StepBlock";
import Breadcrumb from "../../components/Breadcrumb";

import step1 from "../../assets/images/netsuite/create-workflow/step-1.webp";
import step2 from "../../assets/images/netsuite/create-workflow/step-2.webp";
import step3 from "../../assets/images/netsuite/create-workflow/step-3.webp";
import step4 from "../../assets/images/netsuite/create-workflow/step-4.webp";
import step5 from "../../assets/images/netsuite/create-workflow/step-5.webp";

function CreateWorkflow() {
  const category = { name: "NetSuite", slug: "netsuite" };
  const guide = { title: "Create Workflow" };

  return (
    <Layout>
      <Breadcrumb category={category} guide={guide} />
      <TutorialLayout
        title={guide.title}
        description="Step-by-step guide to create a simple workflow in NetSuite."
      >
        <StepBlock title="Step 1 – Go to Workflow Manager" image={step1} alt="Workflow manager">
          Open Workflow Manager in NetSuite.
        </StepBlock>
        <StepBlock title="Step 2 – Create New Workflow" image={step2} alt="New workflow">
          Click 'New Workflow' button.
        </StepBlock>
        <StepBlock title="Step 3 – Name and Record Type" image={step3} alt="Name workflow">
          Enter a name and select record type.
        </StepBlock>
        <StepBlock title="Step 4 – Add Action" image={step4} alt="Add action">
          Drag and configure a workflow action (like send email).
        </StepBlock>
        <StepBlock title="Step 5 – Save & Test" image={step5} alt="Save workflow">
          Save workflow and test functionality.
        </StepBlock>
      </TutorialLayout>
    </Layout>
  );
}

export default CreateWorkflow;
