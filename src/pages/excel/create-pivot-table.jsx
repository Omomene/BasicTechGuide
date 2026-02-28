 import Layout from "../../components/Layout";
import TutorialLayout from "../../components/TutorialLayout";
import StepBlock from "../../components/StepBlock";
import Breadcrumb from "../../components/Breadcrumb";

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
        <p>
          Charts in Excel help you visualize your data quickly and clearly. Before diving into the steps, 
          make sure your data is organized, with labels and values in proper rows and columns. 
          This introduction will prepare you to create accurate and meaningful charts.
        </p>

        <StepBlock
          title="Step 1 – Select Your Data"
          image="/assets/images/excel/create-pivot-table/step-1.webp"
          alt="Excel dataset selected before creating pivot table"
        >
          Select your entire dataset including headers.
        </StepBlock>

        <StepBlock
          title="Step 2 – Click Insert → PivotTable"
          image="/assets/images/excel/create-pivot-table/step-1.webp"
          alt="Excel insert tab pivot table button"
        >
          Click Insert and choose PivotTable.
        </StepBlock>

        <StepBlock
          title="Step 3 – Confirm Data Range"
          image="/assets/images/excel/create-pivot-table/step-1.webp"
          alt="Excel pivot table dialog box data range"
        >
          Confirm the data range and choose new worksheet.
        </StepBlock>
      </TutorialLayout>
    </Layout>
  );
}

export default CreatePivotTable;
