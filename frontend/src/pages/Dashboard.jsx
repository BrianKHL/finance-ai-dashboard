import { useState, useEffect } from "react";
import Header from "../components/Header/Header";
import UserInfo from "../components/UserInfo/UserInfo";
import SummarySection from "../components/SummarySection/SummarySection";
import Diagram from "../components/Diagram/Diagram";
import Transactions from "../components/Transaction/Transactions";
import BudgetStatus from "../components/BudgetStatus/BudgetStatus";

function Dashboard() {
  const [transactions, setTransactions] = useState([]);

  //Temporary mock data
  useEffect(() => {
    const mockData = [
      {
        id: 1,
        category: "Dinning",
        date: '2023-01-01',
        name: 'Chick-fil-A',
        amount: -10.25,
      },
      {
        id: 2,
        category: "Online",
        date: '2023-01-02',
        name: 'Amazon',
        amount: -80.88,
      },
      {
        id: 3,
        category: "Shopping",
        date: '2023-01-03',
        name: 'Target (Return)',
        amount: +30,
      },
  ];

    setTransactions(mockData);
  }, []);



  return (
    <div className="container">
      <Header />
      <UserInfo />
      <SummarySection transactions={transactions}/>
      <Diagram />
      <Transactions transactions={transactions}/>
      <BudgetStatus transactions={transactions}/>
    </div>
  );
}

export default Dashboard;