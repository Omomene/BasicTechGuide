 import Layout from "../../components/Layout";
import TutorialLayout from "../../components/TutorialLayout";
import StepBlock from "../../components/StepBlock";
import Breadcrumb from "../../components/Breadcrumb";

import step1 from "../../assets/images/powerpoint/create-presentation/step-1.webp";
import step2 from "../../assets/images/powerpoint/create-presentation/step-2.webp";
import step3 from "../../assets/images/powerpoint/create-presentation/step-3.webp";
import step4 from "../../assets/images/powerpoint/create-presentation/step-4.webp";
import step5 from "../../assets/images/powerpoint/create-presentation/step-5.webp";

function CreatePresentation() {
  const category = { name: "PowerPoint", slug: "powerpoint" };
  const guide = { title: "Create a Presentation" };

  return (
    <Layout>
      <Breadcrumb category={category} guide={guide} />
      <TutorialLayout
        title={guide.title}
        description="Step-by-step guide to create a new PowerPoint presentation."
      >
        <StepBlock title="Step 1 – Open PowerPoint" image={step1} alt="Open PowerPoint">
          Launch PowerPoint on your computer.
        </StepBlock>
        <StepBlock title="Step 2 – New Presentation" image={step2} alt="New presentation">
          Click 'New' → 'Blank Presentation'.
        </StepBlock>
        <StepBlock title="Step 3 – Add Slides" image={step3} alt="Add slides">
          Use 'New Slide' to add slides.
        </StepBlock>
        <StepBlock title="Step 4 – Insert Content" image={step4} alt="Insert text and images">
          Add text, images, or charts to slides.
        </StepBlock>
        <StepBlock title="Step 5 – Save Presentation" image={step5} alt="Save presentation">
          Save your presentation to your folder.
        </StepBlock>
      </TutorialLayout>
    </Layout>
  );
}

export default CreatePresentation;
