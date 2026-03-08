
import Layout from "../../components/Layout";
import TutorialLayout from "../../components/TutorialLayout";
import StepBlock from "../../components/StepBlock";
import Breadcrumb from "../../components/Breadcrumb";

function CreateChart() {
  const category = { name: "excel", slug: "excel" };
  const guide = { title: "Create Chart" };

  return (
    <Layout>
      <Breadcrumb category={category} guide={guide} />
      <TutorialLayout
        title={guide.title}
        description="Step-by-step guide to create chart."
      >
        <p>This guide explains how to create chart step-by-step. Follow the instructions below to complete the task efficiently.</p>
        
<StepBlock title="Step 1 – Select Data" image="/assets/images/excel/create-chart/first-match.png" alt="Step 1 – Select Data">
  <p>Before creating a chart, you need to select the data that will be visualized.</p>
          <ul>
            <li>Include both the labels (usually in the first row or column) and the values.</li>
            <li>Make sure there are no blank rows or columns in your selection.</li>
            <li>If you want non-adjacent data, hold <strong>Ctrl</strong> while selecting ranges.</li>
          </ul>
          <p><strong>Tip:</strong> Label your rows and columns clearly so Excel can generate accurate chart legends.</p>
</StepBlock>


<StepBlock title="Step 2 – Go to Insert Tab" image="/assets/images/excel/create-chart/largest-value-smaller-than-lookup-value.png" alt="Step 2 – Go to Insert Tab">
  <p>Once your data is selected, you can start inserting a chart.</p>
          <ul>
            <li>Click the <strong>Insert</strong> tab in the Excel ribbon.</li>
            <li>You will see a variety of chart types: Column, Line, Pie, Bar, Area, Scatter, and more.</li>
            <li>Hover over any chart icon to see a preview of how your data will look.</li>
          </ul>
          <p><strong>Shortcut:</strong> Press <strong>Alt + N</strong> to quickly open the Insert tab.</p>
</StepBlock>


<StepBlock title="Step 3 – Choose Chart Type" image="/assets/images/excel/create-chart/step3.png" alt="Step 3 – Choose Chart Type">
  <p>Select the chart type that best represents your data.</p>
          <ul>
            <li><strong>Column/Bar Chart:</strong> Compare values across categories.</li>
            <li><strong>Line Chart:</strong> Show trends over time.</li>
            <li><strong>Pie Chart:</strong> Display percentages or proportions.</li>
            <li><strong>Scatter Plot:</strong> Explore relationships between two sets of values.</li>
          </ul>
          <p><strong>Tip:</strong> For most datasets, Column and Line charts are easiest to read and interpret.</p>
</StepBlock>


<StepBlock title="Step 4 – Customize Chart" image="" alt="Step 4 – Customize Chart">
  <p>After inserting the chart, you can enhance its readability and appearance.</p>
          <ul>
            <li>Change chart colors to match your presentation style.</li>
            <li>Add data labels to show exact values on each chart element.</li>
            <li>Include a chart title that clearly describes the data.</li>
            <li>Use the <strong>Chart Elements</strong> (+) button to add axes titles, gridlines, or a legend.</li>
            <li>Resize or move the chart for better layout in your worksheet.</li>
          </ul>
          <p><strong>Tip:</strong> Keep it simple – avoid too many colors or labels which can make the chart confusing.</p>
</StepBlock>


<StepBlock title="Step 5 – Final Chart" image="" alt="Step 5 – Final Chart">
  <p>Your chart is now ready to present your data visually.</p><ul><li><p>Double-check that all data is correctly represented.</p></li><li><p>Consider adding a subtle background or border to make it stand out.</p></li><li><p>Save your workbook to preserve the chart for future use.</p></li></ul><p><strong>Extra Tip:</strong> Copy your chart to PowerPoint or Word if you need it in a report or presentation</p>
</StepBlock>

      </TutorialLayout>
    </Layout>
  );
}

export default CreateChart;
