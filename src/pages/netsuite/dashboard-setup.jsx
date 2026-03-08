
import Layout from "../../components/Layout";
import TutorialLayout from "../../components/TutorialLayout";
import StepBlock from "../../components/StepBlock";
import Breadcrumb from "../../components/Breadcrumb";

function Dashboardsetup() {
  const category = { name: "netsuite", slug: "netsuite" };
  const guide = { title: "Dashboard setup" };
  const intro = "This guide explains dashboard setup step-by-step.";

  return (
    <Layout>
      <Breadcrumb category={category} guide={guide} />
      <TutorialLayout title={guide.title} description={intro}>
        <p>{intro}</p>
        
<StepBlock title="Step 1 - Create your dashboard" image="/assets/images/netsuite/dashboard-setup/xlookup-function.png">
  <p>Create a dashboard</p>
</StepBlock>

<StepBlock title="Step 2 - Guide your setup" image="/assets/images/netsuite/dashboard-setup/first-match.png">
  <p>Guide your setup</p>
</StepBlock>
      </TutorialLayout>
    </Layout>
  );
}

export default Dashboardsetup;
