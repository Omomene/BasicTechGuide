
import Layout from "../../components/Layout";
import TutorialLayout from "../../components/TutorialLayout";
import StepBlock from "../../components/StepBlock";
import Breadcrumb from "../../components/Breadcrumb";

function Transactionaldata() {
  const category = { name: "netsuite", slug: "netsuite" };
  const guide = { title: "Transactional data" };

  return (
    <Layout>
      <Breadcrumb category={category} guide={guide} />
      <TutorialLayout title={guide.title} description="">
        <p>Transactions are the key to having life for real</p>
<StepBlock title="Take it from me" image="/assets/images/netsuite/transactional-data/largest-value-smaller-than-lookup-value.png">
<p>Do not invest stupidly</p>
</StepBlock>
      </TutorialLayout>
    </Layout>
  );
}

export default Transactionaldata;
