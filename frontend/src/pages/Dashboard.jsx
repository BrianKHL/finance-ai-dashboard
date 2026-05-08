import { useState, useEffect } from "react";
import Header from "../components/Header/Header";
import UserInfo from "../components/UserInfo/UserInfo";
import SummarySection from "../components/SummarySection/SummarySection";
import Diagram from "../components/Diagram/Diagram";
import Transactions from "../components/Transaction/Transactions";
import BudgetStatus from "../components/BudgetStatus/BudgetStatus";
import { fetchTransactions } from "../services/api";

function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        const data = await fetchTransactions();
        setTransactions(data);
      } catch (err) {
        setError("Failed to load transactions.");
        console.error(err);
      }
    };

    loadTransactions();
  }, []);

  return (
    <div className="container">
      <Header />
      {error ? <p>{error}</p> : null}
      <UserInfo />
      <SummarySection transactions={transactions} />
      <Diagram transactions={transactions} />
      <Transactions transactions={transactions} />
      <BudgetStatus transactions={transactions} />
    </div>
  );
}

export default Dashboard;
