import Layout from "../../components/Layout";
import TutorialLayout from "../../components/TutorialLayout";
import StepBlock from "../../components/StepBlock";
import Breadcrumb from "../../components/Breadcrumb";

import step1 from "../../assets/images/powerpoint/add-animation/step-1.webp";
import step2 from "../../assets/images/powerpoint/add-animation/step-2.webp";
import step3 from "../../assets/images/powerpoint/add-animation/step-3.webp";
import step4 from "../../assets/images/powerpoint/add-animation/step-4.webp";
import step5 from "../../assets/images/powerpoint/add-animation/step-5.webp";

function AddAnimation() {
  const category = { name: "PowerPoint", slug: "powerpoint" };
  const guide = { title: "Add Animation" };

  return (
    <Layout>
      <Breadcrumb category={category} guide={guide} />
      <TutorialLayout
        title={guide.title}
        description="Guide to add animations to text or objects on slides."
      >
        <StepBlock title="Step 1 – Select Object" image={step1} alt="Select object">
          Click the object you want to animate.
        </StepBlock>
        <StepBlock title="Step 2 – Animations Tab" image={step2} alt="Animations tab">
          Go to the Animations tab.
        </StepBlock>
        <StepBlock title="Step 3 – Choose Animation" image={step3} alt="Choose animation">
          Select an entrance, exit, or emphasis animation.
        </StepBlock>
        <StepBlock title="Step 4 – Adjust Timing" image={step4} alt="Adjust timing">
          Set start, duration, and delay options.
        </StepBlock>
        <StepBlock title="Step 5 – Preview Animation" image={step5} alt="Preview animation">
          Click Preview to test animation.
        </StepBlock>
      </TutorialLayout>
    </Layout>
  );
}

export default AddAnimation; 
