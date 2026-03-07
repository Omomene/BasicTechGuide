import Layout from "../../components/Layout";
import TutorialLayout from "../../components/TutorialLayout";
import StepBlock from "../../components/StepBlock";
import Breadcrumb from "../../components/Breadcrumb";

function XlookupFunction() {

  const category = { name: "Excel", slug: "excel" };
  const guide = { title: "Xlookup Function" };

  return (
    <Layout>
      <Breadcrumb category={category} guide={guide} />

      <TutorialLayout
        title={guide.title}
        description="Step-by-step guide to xlookup function."
      >

        <p>
          This guide explains how to xlookup function step-by-step. Follow the instructions below to complete the task efficiently.
        </p>

        
<StepBlock title="Xlookup Function in Excel" image="/assets/images/excel/xlookup-function/xlookup-function.png" alt="Xlookup Function in Excel">
  <p>Before creating a chart, you need to select the data that will be visualized.

Include both the labels (usually in the first row or column) and the values.
Make sure there are no blank rows or columns in your selection.
If you want non-adjacent data, hold Ctrl while selecting ranges.
Tip: Label your rows and columns clearly so Excel can generate accurate chart legends.</p>
</StepBlock>

      </TutorialLayout>
    </Layout>
  );
}

export default XlookupFunction;
