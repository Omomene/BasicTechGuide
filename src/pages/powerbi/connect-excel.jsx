 import Layout from "../../components/Layout";
import TutorialLayout from "../../components/TutorialLayout";
import StepBlock from "../../components/StepBlock";
import Breadcrumb from "../../components/Breadcrumb";

import step1 from "../../assets/images/powerbi/connect-excel/step-1.webp";
import step2 from "../../assets/images/powerbi/connect-excel/step-2.webp";
import step3 from "../../assets/images/powerbi/connect-excel/step-3.webp";
import step4 from "../../assets/images/powerbi/connect-excel/step-4.webp";
import step5 from "../../assets/images/powerbi/connect-excel/step-5.webp";

function ConnectExcel() {
  const category = { name: "Power BI", slug: "powerbi" };
  const guide = { title: "Connect to Excel" };

  return (
    <Layout>
      <Breadcrumb category={category} guide={guide} />
      <TutorialLayout
        title={guide.title}
        description="Step-by-step guide to connect Power BI to an Excel file."
      >
        <StepBlock title="Step 1 – Open Power BI" image={step1} alt="Open Power BI Desktop">
          Launch Power BI Desktop.
        </StepBlock>
        <StepBlock title="Step 2 – Get Data" image={step2} alt="Get data from Excel">
          Click Get Data → Excel.
        </StepBlock>
        <StepBlock title="Step 3 – Select File" image={step3} alt="Select Excel file">
          Browse and select your Excel file.
        </StepBlock>
        <StepBlock title="Step 4 – Load Data" image={step4} alt="Load Excel data">
          Preview and load the data into Power BI.
        </StepBlock>
        <StepBlock title="Step 5 – Verify Tables" image={step5} alt="Verify loaded tables">
          Check that all tables appear in Fields pane.
        </StepBlock>
      </TutorialLayout>
    </Layout>
  );
}

export default ConnectExcel;
