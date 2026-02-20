 import Layout from "../../components/Layout";
import TutorialLayout from "../../components/TutorialLayout";
import StepBlock from "../../components/StepBlock";
import Breadcrumb from "../../components/Breadcrumb";

import step1 from "../../assets/images/excel/create-pivot-table/step-1.webp";
import step2 from "../../assets/images/excel/create-pivot-table/step-2.webp";
import step3 from "../../assets/images/excel/create-pivot-table/step-3.webp";

function CreatePivotTable() {
  const category = { name: "Excel", slug: "excel" };
  const guide = { title: "Create Pivot Table" };

  return (
    <Layout>
      <Breadcrumb category={category} guide={guide} />
      <TutorialLayout
        title={guide.title}
        description="Learn how to create a pivot table step-by-step with screenshots."
      >
        <StepBlock
          title="Step 1 – Select Your Data"
          image={step1}
          alt="Excel dataset selected before creating pivot table"
        >
          Select your entire dataset including headers.
        </StepBlock>

        <StepBlock
          title="Step 2 – Click Insert → PivotTable"
          image={step2}
          alt="Excel insert tab pivot table button"
        >
          Click Insert and choose PivotTable.
        </StepBlock>

        <StepBlock
          title="Step 3 – Confirm Data Range"
          image={step3}
          alt="Excel pivot table dialog box data range"
        >
          Confirm the data range and choose new worksheet.
        </StepBlock>
      </TutorialLayout>
    </Layout>
  );
}

export default CreatePivotTable;
