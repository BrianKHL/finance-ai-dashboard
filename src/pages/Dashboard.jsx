import Header from "../components/Header/Header";
import UserInfo from "../components/UserInfo/UserInfo";
import SummarySection from "../components/SummarySection/SummarySection";
import Diagram from "../components/Diagram/Diagram";
import Transactions from "../components/Transaction/Transactions";

function Dashboard() {
  return (
    <div className="container">
      <Header />
      <UserInfo />
      <SummarySection />
      <Diagram />
      <Transactions />
    </div>
  );
}

export default Dashboard;