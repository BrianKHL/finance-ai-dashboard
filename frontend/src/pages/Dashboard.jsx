import { useState, useEffect } from "react";
import Header from "../components/Header/Header";
import UserInfo from "../components/UserInfo/UserInfo";
import SummarySection from "../components/SummarySection/SummarySection";
import Diagram from "../components/Diagram/Diagram";
import Transactions from "../components/Transaction/Transactions";
import BudgetStatus from "../components/BudgetStatus/BudgetStatus";
import TransactionForm from "../components/TransactionForm/TransactionForm";
import ErrorBoundary from "../components/ErrorBoundary/ErrorBoundary";
import { createTransaction, fetchTransactions } from "../services/api";

function Dashboard({ currentUser, onLogout }) {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState("");
  const [showTransactionForm, setShowTransactionForm] = useState(false);

  const loadTransactions = async () => {
    try {
      const data = await fetchTransactions();
      setTransactions(data);
      setError("");
    } catch (err) {
      setError(err.message || "Failed to load transactions.");
      console.error(err);
    }
  };

  useEffect(() => {
    loadTransactions();
  }, []);

  const handleCreateTransaction = async (payload) => {
    await createTransaction(payload);
    await loadTransactions();
    setShowTransactionForm(false);
  };

  return (
    <div className="container">
      <Header onLogout={onLogout} />
      {error ? <p>{error}</p> : null}
      <UserInfo currentUser={currentUser} />
      <div className="transaction-form-toggle">
        <button
          className="transaction-toggle-button"
          onClick={() => setShowTransactionForm((current) => !current)}
        >
          {showTransactionForm ? "Close Transaction Form" : "Add Transaction"}
        </button>
      </div>
      {showTransactionForm ? (
        <TransactionForm onSubmit={handleCreateTransaction} />
      ) : null}
      <ErrorBoundary>
        <SummarySection transactions={transactions} />
      </ErrorBoundary>
      <ErrorBoundary>
        <Diagram transactions={transactions} />
      </ErrorBoundary>
      <ErrorBoundary>
        <Transactions transactions={transactions} />
      </ErrorBoundary>
      <ErrorBoundary>
        <BudgetStatus transactions={transactions} />
      </ErrorBoundary>
    </div>
  );
}

export default Dashboard;
