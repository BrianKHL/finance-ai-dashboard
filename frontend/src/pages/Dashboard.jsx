import { useState, useEffect } from "react";
import Header from "../components/Header/Header";
import UserInfo from "../components/UserInfo/UserInfo";
import SummarySection from "../components/SummarySection/SummarySection";
import Diagram from "../components/Diagram/Diagram";
import Transactions from "../components/Transaction/Transactions";
import BudgetStatus from "../components/BudgetStatus/BudgetStatus";
import ErrorBoundary from "../components/ErrorBoundary/ErrorBoundary";
import { fetchTransactions } from "../services/api";

function Dashboard({ currentUser, onLogout }) {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        const data = await fetchTransactions();
        setTransactions(data);
      } catch (err) {
        setError(err.message || "Failed to load transactions.");
        console.error(err);
      }
    };

    loadTransactions();
  }, []);

  return (
    <div className="container">
      <Header onLogout={onLogout} />
      {error ? <p>{error}</p> : null}
      <UserInfo currentUser={currentUser} />
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
