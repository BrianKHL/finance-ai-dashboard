import Header from "../components/Header/Header";
import UserInfo from "../components/UserInfo/UserInfo";
import SummarySection from "../components/SummarySection/SummarySection";

function Dashboard() {
  return (
    <div className="container">
      <Header />
      <UserInfo />
      <SummarySection />
    </div>
  );
}

export default Dashboard;