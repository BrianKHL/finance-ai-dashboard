import SummaryCard from "../SummaryCard/SummaryCard";
import "./SummarySection.css";

function SummarySection({ transactions}) {
  const income = transactions
  //.filter() picks only income > 0
  //.reduce() sums up the total
    .filter((t) => t.amount > 0)
    .reduce((sum, t) => sum + t.amount, 0);

  //.filter() picks only expense < 0
    const expense = transactions
    .filter((t) => t.amount < 0)
    .reduce((sum, t) => sum + t.amount, 0);
    
  const netProfit = income + expense;
  return (
    <section className="summary-blocks">
      <SummaryCard title="Total Income" value={`$${income.toFixed(2)}`} />
      <SummaryCard title="Total Expense" value={`$${Math.abs(expense).toFixed(2)}`} />
      <SummaryCard title="Net Profit" value={`$${netProfit.toFixed(2)}`} />
    </section>
  );
}

export default SummarySection;