 import Layout from "../../components/Layout";
import TutorialLayout from "../../components/TutorialLayout";
import StepBlock from "../../components/StepBlock";
import Breadcrumb from "../../components/Breadcrumb";

import step1 from "../../assets/images/powerautomate/save-attachments/step-1.webp";
import step2 from "../../assets/images/powerautomate/save-attachments/step-2.webp";
import step3 from "../../assets/images/powerautomate/save-attachments/step-3.webp";
import step4 from "../../assets/images/powerautomate/save-attachments/step-4.webp";
import step5 from "../../assets/images/powerautomate/save-attachments/step-5.webp";

function SaveAttachments() {
  const category = { name: "Power Automate", slug: "powerautomate" };
  const guide = { title: "Save Attachments to OneDrive" };

  return (
    <Layout>
      <Breadcrumb category={category} guide={guide} />
      <TutorialLayout
        title={guide.title}
        description="Save email attachments automatically to OneDrive."
      >
        <StepBlock title="Step 1 – Trigger Flow" image={step1} alt="Select trigger">
          Use 'When a new email arrives'.
        </StepBlock>
        <StepBlock title="Step 2 – Add Action" image={step2} alt="Add OneDrive action">
          Add 'Create file' action in OneDrive.
        </StepBlock>
        <StepBlock title="Step 3 – Map Attachment Content" image={step3} alt="Map attachment">
          Map email attachment content to OneDrive file content.
        </StepBlock>
        <StepBlock title="Step 4 – Test Flow" image={step4} alt="Test flow">
          Send an email to test automatic saving.
        </StepBlock>
        <StepBlock title="Step 5 – Save Flow" image={step5} alt="Save flow">
          Save the flow for automation.
        </StepBlock>
      </TutorialLayout>
    </Layout>
  );
}

export default SaveAttachments;
