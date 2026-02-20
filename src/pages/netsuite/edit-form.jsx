 import Layout from "../../components/Layout";
import TutorialLayout from "../../components/TutorialLayout";
import StepBlock from "../../components/StepBlock";
import Breadcrumb from "../../components/Breadcrumb";

import step1 from "../../assets/images/netsuite/edit-form/step-1.webp";
import step2 from "../../assets/images/netsuite/edit-form/step-2.webp";
import step3 from "../../assets/images/netsuite/edit-form/step-3.webp";
import step4 from "../../assets/images/netsuite/edit-form/step-4.webp";
import step5 from "../../assets/images/netsuite/edit-form/step-5.webp";

function EditForm() {
  const category = { name: "NetSuite", slug: "netsuite" };
  const guide = { title: "Edit Form" };

  return (
    <Layout>
      <Breadcrumb category={category} guide={guide} />
      <TutorialLayout
        title={guide.title}
        description="Learn how to edit a standard form in NetSuite."
      >
        <StepBlock title="Step 1 – Open Record" image={step1} alt="Open record form">
          Open the record you want to edit.
        </StepBlock>
        <StepBlock title="Step 2 – Enter Edit Mode" image={step2} alt="Edit mode">
          Click 'Edit' in the record toolbar.
        </StepBlock>
        <StepBlock title="Step 3 – Make Changes" image={step3} alt="Make changes">
          Modify fields, labels, or layout.
        </StepBlock>
        <StepBlock title="Step 4 – Save Changes" image={step4} alt="Save changes">
          Click Save to apply updates.
        </StepBlock>
        <StepBlock title="Step 5 – Verify" image={step5} alt="Verify edits">
          Check that the form displays correctly.
        </StepBlock>
      </TutorialLayout>
    </Layout>
  );
}

export default EditForm;
