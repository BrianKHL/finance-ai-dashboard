import "./BudgetStatus.css";
import { useState } from "react";

import AIInsightsModal from "./AIInsightsModal";
import { fetchAIInsight } from "../../services/api";

function BudgetStatus({ transactions }) {

  // Modal open/close state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [insight, setInsight] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const income = transactions
    .filter((t) => t.amount > 0)
    .reduce((sum, t) => sum + t.amount, 0);

  const expense = transactions
    .filter((t) => t.amount < 0)
    .reduce((sum, t) => sum + t.amount, 0);

  // Budget is based on income
  const budget = income;

  // Remaining money after expenses
  const remaining = budget + expense;

  // Ratio determines budget health
  const ratio = remaining / budget;

  // Status text
  let status = "";

  if (ratio >= 0.75) {
    status = "Great";
  } else if (ratio >= 0.25) {
    status = "Good";
  } else {
    status = "Warning";
  }

  const handleQuestionClick = async (question) => {
    setLoading(true);
    setError("");
    setInsight("");

    try {
      const data = await fetchAIInsight(question);
      setInsight(data.answer);
    } catch (requestError) {
      setError(requestError.message || "Failed to get AI insight.");
    } finally {
      setLoading(false);
    }
  };

  return (

    <section className="budget-status">

      <p>
        Current budget status is{" "}
        <span className={`status ${status.toLowerCase()}`}>
          {status}
        </span>
      </p>

      {/* AI Button */}
      <button
        className="ai-button"
        onClick={() => setIsModalOpen(true)}
      >
        Get AI Insights
      </button>

      {/* AI Modal */}
      <AIInsightsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onQuestionClick={handleQuestionClick}
        insight={insight}
        loading={loading}
        error={error}
      />

    </section>
  );
}

export default BudgetStatus;
