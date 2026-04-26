// /**
//  * [Header]<h1>
//  * [User Info]<p> or <div> (ID + Date/Time)
//  * [Summary Cards Row] [][][] <div> or <article>
//  * [Income & Expense diagram][Budget Overview]
//  */

// import './App.css';
// import { useState, useEffect } from 'react'; // For real-time clock

// function App() {

//   /* Real-time clock code */
//   const [currentTime, setCurrentTime] = useState(new Date());
  
//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentTime(new Date());
//     }, 1000);

//     return () => clearInterval(timer);
//   }, []);
// /* End of real-time clock code */

//   return (
//     <div className="container">

//       {/* Header */}
//       <header className="header">
//         <h1>
//           Finance AI Dashboard
//         </h1>
//       </header>

//       {/* User Info */}
//       <section className="user-info">
//         <div className="user-id">
//           ID: XXXXX
//           </div>
//         <div className="date-time">
//           {currentTime.toLocaleString()}
//           </div>
//       </section>

//       {/* Summary Cards */}
//       <section className="summary-blocks">
//         <article className="card">
//           <h3>
//             Total Income
//           </h3>
//           <p> 
//             $0 {/* Placeholder for income data */}
//           </p> 
//         </article>

//         <article className="card">
//           <h3>
//             Total Expense
//           </h3>
//           <p>
//             $0 {/* Placeholder for expense data */}
//           </p>
//         </article>

//         <article className="card">
//           <h3>
//             Net Profit
//           </h3>
//           <p>
//             $0 {/* Placeholder for net profit data */}
//           </p>
//         </article>
//       </section>

//       {/*Income & Expense Diagram */}
//       <section className="diagram">
//         <article className="box">
//           <h4>
//             Income & Expense
//           </h4>
//           <p> 
//             $0 {/* Placeholder for income data */}
//           </p> 
//         </article>
//       </section>


//     </div>
//   );
// }

// export default App;

import Dashboard from "./pages/Dashboard";
import "./App.css";

function App() {
  return <Dashboard />;
}

export default App;