import SummaryCard from "../SummaryCard/SummaryCard";
import "./SummarySection.css";

function SummarySection() {
  return (
    <section className="summary-blocks">
      <SummaryCard title="Total Income" value="$0" />
      <SummaryCard title="Total Expense" value="$0" />
      <SummaryCard title="Net Profit" value="$0" />
    </section>
  );
}

export default SummarySection;