 import Layout from "../../components/Layout";
import TutorialLayout from "../../components/TutorialLayout";
import StepBlock from "../../components/StepBlock";
import Breadcrumb from "../../components/Breadcrumb";

import step1 from "../../assets/images/powerautomate/use-conditionals/step-1.webp";
import step2 from "../../assets/images/powerautomate/use-conditionals/step-2.webp";
import step3 from "../../assets/images/powerautomate/use-conditionals/step-3.webp";
import step4 from "../../assets/images/powerautomate/use-conditionals/step-4.webp";
import step5 from "../../assets/images/powerautomate/use-conditionals/step-5.webp";

function UseConditionals() {
  const category = { name: "Power Automate", slug: "powerautomate" };
  const guide = { title: "Use Conditionals" };

  return (
    <Layout>
      <Breadcrumb category={category} guide={guide} />
      <TutorialLayout
        title={guide.title}
        description="Guide to add conditional logic in a Power Automate flow."
      >
        <StepBlock title="Step 1 – Create Flow" image={step1} alt="Create new flow">
          Start a new flow or edit an existing one.
        </StepBlock>
        <StepBlock title="Step 2 – Add Condition" image={step2} alt="Add condition action">
          Insert a Condition action.
        </StepBlock>
        <StepBlock title="Step 3 – Set Logic" image={step3} alt="Define conditional logic">
          Specify IF/THEN rules.
        </StepBlock>
        <StepBlock title="Step 4 – Test Flow" image={step4} alt="Test conditional flow">
          Run flow to see condition applied.
        </StepBlock>
        <StepBlock title="Step 5 – Save Flow" image={step5} alt="Save flow">
          Save your conditional flow.
        </StepBlock>
      </TutorialLayout>
    </Layout>
  );
}

export default UseConditionals;
