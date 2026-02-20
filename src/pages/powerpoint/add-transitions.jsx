import Layout from "../../components/Layout";
import TutorialLayout from "../../components/TutorialLayout";
import StepBlock from "../../components/StepBlock";
import Breadcrumb from "../../components/Breadcrumb";

import step1 from "../../assets/images/powerpoint/add-transitions/step-1.webp";
import step2 from "../../assets/images/powerpoint/add-transitions/step-2.webp";
import step3 from "../../assets/images/powerpoint/add-transitions/step-3.webp";
import step4 from "../../assets/images/powerpoint/add-transitions/step-4.webp";
import step5 from "../../assets/images/powerpoint/add-transitions/step-5.webp";

function AddTransitions() {
  const category = { name: "PowerPoint", slug: "powerpoint" };
  const guide = { title: "Add Transitions" };

  return (
    <Layout>
      <Breadcrumb category={category} guide={guide} />
      <TutorialLayout
        title={guide.title}
        description="Step-by-step guide to add slide transitions."
      >
        <StepBlock title="Step 1 – Select Slide" image={step1} alt="Select slide">
          Click the slide you want to add a transition to.
        </StepBlock>
        <StepBlock title="Step 2 – Transitions Tab" image={step2} alt="Transitions tab">
          Go to the Transitions tab.
        </StepBlock>
        <StepBlock title="Step 3 – Choose Transition" image={step3} alt="Choose transition">
          Select a transition from gallery.
        </StepBlock>
        <StepBlock title="Step 4 – Set Duration" image={step4} alt="Set duration">
          Adjust duration and effect options.
        </StepBlock>
        <StepBlock title="Step 5 – Preview" image={step5} alt="Preview transition">
          Preview the transition by clicking 'Preview'.
        </StepBlock>
      </TutorialLayout>
    </Layout>
  );
}

export default AddTransitions;
