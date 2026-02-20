 import Layout from "../../components/Layout";
import TutorialLayout from "../../components/TutorialLayout";
import StepBlock from "../../components/StepBlock";
import Breadcrumb from "../../components/Breadcrumb";

import step1 from "../../assets/images/excel/format-cells/step-1.webp";
import step2 from "../../assets/images/excel/format-cells/step-2.webp";
import step3 from "../../assets/images/excel/format-cells/step-3.webp";
import step4 from "../../assets/images/excel/format-cells/step-4.webp";
import step5 from "../../assets/images/excel/format-cells/step-5.webp";

function FormatCells() {
  const category = { name: "Excel", slug: "excel" };
  const guide = { title: "Format Cells" };

  return (
    <Layout>
      <Breadcrumb category={category} guide={guide} />
      <TutorialLayout
        title={guide.title}
        description="Step-by-step guide to format cells in Excel."
      >
        <StepBlock title="Step 1 – Select Cells" image={step1} alt="Select cells to format">
          Select the cells you want to format.
        </StepBlock>
        <StepBlock title="Step 2 – Open Format Cells" image={step2} alt="Open Format Cells dialog">
          Right-click → Format Cells.
        </StepBlock>
        <StepBlock title="Step 3 – Choose Format Type" image={step3} alt="Choose number/date format">
          Select number, date, or custom formatting.
        </StepBlock>
        <StepBlock title="Step 4 – Apply Font/Fill" image={step4} alt="Apply font and fill">
          Adjust font, color, or fill style.
        </StepBlock>
        <StepBlock title="Step 5 – Confirm" image={step5} alt="Final formatted cells">
          Press OK to apply changes.
        </StepBlock>
      </TutorialLayout>
    </Layout>
  );
}

export default FormatCells;
