 import Layout from "../../components/Layout";
import TutorialLayout from "../../components/TutorialLayout";
import StepBlock from "../../components/StepBlock";
import Breadcrumb from "../../components/Breadcrumb";

import step1 from "../../assets/images/netsuite/create-shortcut/step-1.webp";
import step2 from "../../assets/images/netsuite/create-shortcut/step-2.webp";
import step3 from "../../assets/images/netsuite/create-shortcut/step-3.webp";
import step4 from "../../assets/images/netsuite/create-shortcut/step-4.webp";
import step5 from "../../assets/images/netsuite/create-shortcut/step-5.webp";

function CreateShortcut() {
  const category = { name: "NetSuite", slug: "netsuite" };
  const guide = { title: "Create Shortcut" };

  return (
    <Layout>
      <Breadcrumb category={category} guide={guide} />
      <TutorialLayout
        title={guide.title}
        description="Quick guide to create a shortcut in NetSuite."
      >
        <StepBlock title="Step 1 – Open Homepage" image={step1} alt="NetSuite homepage">
          Go to your NetSuite homepage.
        </StepBlock>
        <StepBlock title="Step 2 – Locate Menu" image={step2} alt="NetSuite menu">
          Navigate to the menu item you want to shortcut.
        </StepBlock>
        <StepBlock title="Step 3 – Create Shortcut" image={step3} alt="Create shortcut">
          Click 'Add Shortcut' or drag to shortcut bar.
        </StepBlock>
        <StepBlock title="Step 4 – Confirm Placement" image={step4} alt="Confirm shortcut">
          Verify the shortcut appears in your bar.
        </StepBlock>
        <StepBlock title="Step 5 – Test Shortcut" image={step5} alt="Test shortcut">
          Click it to ensure it opens the page correctly.
        </StepBlock>
      </TutorialLayout>
    </Layout>
  );
}

export default CreateShortcut;
