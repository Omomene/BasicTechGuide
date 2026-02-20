 import Layout from "../../components/Layout";
import TutorialLayout from "../../components/TutorialLayout";
import StepBlock from "../../components/StepBlock";
import Breadcrumb from "../../components/Breadcrumb";

import step1 from "../../assets/images/powerautomate/send-email/step-1.webp";
import step2 from "../../assets/images/powerautomate/send-email/step-2.webp";
import step3 from "../../assets/images/powerautomate/send-email/step-3.webp";
import step4 from "../../assets/images/powerautomate/send-email/step-4.webp";
import step5 from "../../assets/images/powerautomate/send-email/step-5.webp";

function SendEmail() {
  const category = { name: "Power Automate", slug: "powerautomate" };
  const guide = { title: "Send Automated Email" };

  return (
    <Layout>
      <Breadcrumb category={category} guide={guide} />
      <TutorialLayout
        title={guide.title}
        description="Guide to send an automated email in Power Automate."
      >
        <StepBlock title="Step 1 – Select Trigger" image={step1} alt="Select trigger">
          Choose a trigger such as 'When a form is submitted'.
        </StepBlock>
        <StepBlock title="Step 2 – Add Send Email Action" image={step2} alt="Add send email action">
          Add 'Send an email' action.
        </StepBlock>
        <StepBlock title="Step 3 – Fill Details" image={step3} alt="Fill email details">
          Enter recipient, subject, and body.
        </StepBlock>
        <StepBlock title="Step 4 – Test Flow" image={step4} alt="Test flow">
          Run the flow to ensure email sends.
        </StepBlock>
        <StepBlock title="Step 5 – Save Flow" image={step5} alt="Save flow">
          Save the flow for automation.
        </StepBlock>
      </TutorialLayout>
    </Layout>
  );
}

export default SendEmail;
