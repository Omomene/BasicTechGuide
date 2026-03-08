
import Layout from "../../components/Layout";
import TutorialLayout from "../../components/TutorialLayout";
import StepBlock from "../../components/StepBlock";
import Breadcrumb from "../../components/Breadcrumb";

function SaveNetsuite() {
  const category = { name: "netsuite", slug: "netsuite" };
  const guide = { title: "Save Netsuite" };
  const intro = "This guide explains save netsuite step-by-step.";

  return (
    <Layout>
      <Breadcrumb category={category} guide={guide} />
      <TutorialLayout title={guide.title} description={intro}>
        <p>{intro}</p>
        
<StepBlock title="Save Netsuite" image="/assets/images/netsuite/save-netsuite/first-match.png">
  <p>Save Netsuite</p>
</StepBlock>

<StepBlock title="third Save Netsuite" image="/assets/images/netsuite/save-netsuite/largest-value-smaller-than-lookup-value.png">
  <p>Save again</p>
</StepBlock>
      </TutorialLayout>
    </Layout>
  );
}

export default SaveNetsuite;
