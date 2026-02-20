import Layout from "../../components/Layout";
import TutorialLayout from "../../components/TutorialLayout";
import StepBlock from "../../components/StepBlock";
import Breadcrumb from "../../components/Breadcrumb";

import step1 from "../../assets/images/powerautomate/recurring-flow/step-1.webp";
import step2 from "../../assets/images/powerautomate/recurring-flow/step-2.webp";
import step3 from "../../assets/images/powerautomate/recurring-flow/step-3.webp";
import step4 from "../../assets/images/powerautomate/recurring-flow/step-4.webp";
import step5 from "../../assets/images/powerautomate/recurring-flow/step-5.webp";

function RecurringFlow() {
  const category = { name: "Power Automate", slug: "powerautomate" };
  const guide = { title: "Schedule a Recurring Flow" };

  return (
    <Layout>
      <Breadcrumb category={category} guide={guide} />
      <TutorialLayout
        title={guide.title}
        description="Guide to set up a recurring scheduled flow."
      >
        <StepBlock title="Step 1 – Create Flow" image={step1} alt="Create flow">
          Start a new scheduled flow.
        </StepBlock>
        <StepBlock title="Step 2 – Set Frequency" image={step2} alt="Set frequency">
          Choose daily, weekly, or monthly schedule.
        </StepBlock>
        <StepBlock title="Step 3 – Add Actions" image={step3} alt="Add actions">
          Add desired actions for recurring execution.
        </StepBlock>
        <StepBlock title="Step 4 – Test Flow" image={step4} alt="Test scheduled flow">
          Run a test to ensure it triggers on schedule.
        </StepBlock>
        <StepBlock title="Step 5 – Save Flow" image={step5} alt="Save scheduled flow">
          Save the flow.
        </StepBlock>
      </TutorialLayout>
    </Layout>
  );
}

export default RecurringFlow;
