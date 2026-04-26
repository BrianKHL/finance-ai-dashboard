import "./BudgetStatus.css";

function BudgetStatus({transactions}) {
  const income = transactions
    .filter((t) => t.amount > 0)
    .reduce((sum, t) => sum + t.amount, 0);

  const expense = transactions
    .filter((t) => t.amount < 0)
    .reduce((sum, t) => sum + t.amount, 0);

  // budget is based on income (Pocket money, salary, etc.)
  const budget = income; 

  const remaining = budget + expense; 
  //ratio will be used to determine the status
  //and AI will give the insights based on this ratio (not fixed)
  const ratio = remaining / budget;

  //It will affect the diagram and status text color
  //Should add 0 later
  let status = "";

  if (ratio >= 0.75) {
    status = "Great";
  } else if (ratio >= 0.25) {
    status = "Good";
  } else {
    status = "Warning";
  }

  return (
    <section className="budget-status">
      <p>
        Current budget status is:{" "}
        <span className={`status ${status.toLowerCase()}`}>
          {status}
        </span>
      </p>

      <button className="ai-button">
        Get AI Insights
      </button>
    </section>
  );
}

export default BudgetStatus;