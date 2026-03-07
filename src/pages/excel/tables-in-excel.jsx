
import Layout from "../../components/Layout";
import TutorialLayout from "../../components/TutorialLayout";
import StepBlock from "../../components/StepBlock";
import Breadcrumb from "../../components/Breadcrumb";

function TablesinExcel() {
  const category = { name: "excel", slug: "excel" };
  const guide = { title: "Tables in Excel" };

  return (
    <Layout>
      <Breadcrumb category={category} guide={guide} />
      <TutorialLayout
        title={guide.title}
        description="Step-by-step guide to tables in excel."
      >
        <p>This guide explains how to tables in excel step-by-step. Follow the instructions below to complete the task efficiently.</p>

        <StepBlock title="" image="/assets/images/excel/tables-in-excel/xlookup-function.png" alt="">
  <p><p>Before creating a chart, you need to select the data that will be visualized.</p><ul><li><p>Include both the labels (usually in the first row or column) and the values.</p></li><li><p>Make sure there are no blank rows or columns in your selection.</p></li><li><p>If you want non-adjacent data, hold <strong>Ctrl</strong> while selecting ranges.</p></li></ul><p><strong>Tip:</strong> Label your rows and columns clearly so Excel can generate accurate chart legends.</p></p>
</StepBlock>

<StepBlock title="Step 1" image="" alt="Step 1">
  <p><p>Before creating a chart, you need to select the data that will be visualized.</p><ul><li><p>Include both the labels (usually in the first row or column) and the values.</p></li><li><p>Make sure there are no blank rows or columns in your selection.</p></li><li><p>If you want non-adjacent data, hold <strong>Ctrl</strong> while selecting ranges.</p></li></ul><p><strong>Tip:</strong> Label your rows and columns clearly so Excel can generate accurate chart legends.</p></p>
</StepBlock>

      </TutorialLayout>
    </Layout>
  );
}

export default TablesinExcel;
