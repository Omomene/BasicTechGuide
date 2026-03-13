
import Layout from "../../components/Layout";
import TutorialLayout from "../../components/TutorialLayout";
import StepBlock from "../../components/StepBlock";
import Breadcrumb from "../../components/Breadcrumb";

function SaveNetsuite() {
  const category = { name: "netsuite", slug: "netsuite" };
  const guide = { title: "Save Netsuite" };

  return (
    <Layout>
      <Breadcrumb category={category} guide={guide} />
      <TutorialLayout title={guide.title} description="">
        <p>Again I might love to check this out to see what happens</p>
<p>Just trying to test this out check</p>
<StepBlock title="third Save Netsuite" image="/assets/images/netsuite/save-netsuite/largest-value-smaller-than-lookup-value.png">
<p>Save again</p>
</StepBlock>
<StepBlock title="Save Netsuite" image="/assets/images/netsuite/save-netsuite/xlookup-function.png">
<p>Save Netsuite</p>
</StepBlock>
      </TutorialLayout>
    </Layout>
  );
}

export default SaveNetsuite;
