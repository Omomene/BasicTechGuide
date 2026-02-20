 import Layout from "../../components/Layout";
import TutorialLayout from "../../components/TutorialLayout";
import StepBlock from "../../components/StepBlock";
import Breadcrumb from "../../components/Breadcrumb";

import step1 from "../../assets/images/powerautomate/create-flow/step-1.webp";
import step2 from "../../assets/images/powerautomate/create-flow/step-2.webp";
import step3 from "../../assets/images/powerautomate/create-flow/step-3.webp";
import step4 from "../../assets/images/powerautomate/create-flow/step-4.webp";
import step5 from "../../assets/images/powerautomate/create-flow/step-5.webp";

function CreateFlow() {
  const category = { name: "Power Automate", slug: "powerautomate" };
  const guide = { title: "Create a Simple Flow" };

  return (
    <Layout>
      <Breadcrumb category={category} guide={guide} />
      <TutorialLayout
        title={guide.title}
        description="Step-by-step guide to create a simple flow in Power Automate."
      >
        <StepBlock title="Step 1 – Open Power Automate" image={step1} alt="Power Automate homepage">
          Launch Power Automate from Office 365.
        </StepBlock>
        <StepBlock title="Step 2 – Create Flow" image={step2} alt="Create flow button">
          Click 'Create' → 'Instant cloud flow'.
        </StepBlock>
        <StepBlock title="Step 3 – Name & Trigger" image={step3} alt="Flow name and trigger">
          Give your flow a name and select a trigger.
        </StepBlock>
        <StepBlock title="Step 4 – Add Action" image={step4} alt="Add action">
          Add an action, e.g., send an email.
        </StepBlock>
        <StepBlock title="Step 5 – Save & Test" image={step5} alt="Save flow">
          Save the flow and run a test.
        </StepBlock>
      </TutorialLayout>
    </Layout>
  );
}

export default CreateFlow;
