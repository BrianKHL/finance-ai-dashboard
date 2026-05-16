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

import { useEffect, useState } from "react";
import Dashboard from "./pages/Dashboard";
import AuthPage from "./pages/AuthPage";
import "./App.css";
import {
  clearToken,
  fetchCurrentUser,
  getToken,
  login,
  setToken,
  signup,
} from "./services/api";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authMode, setAuthMode] = useState("login");
  const [authError, setAuthError] = useState("");

  useEffect(() => {
    const restoreSession = async () => {
      if (!getToken()) {
        setLoading(false);
        return;
      }

      try {
        const user = await fetchCurrentUser();
        setCurrentUser(user);
      } catch (error) {
        clearToken();
        setAuthError(error.message);
      } finally {
        setLoading(false);
      }
    };

    restoreSession();
  }, []);

  const handleAuthSubmit = async (formValues) => {
    setAuthError("");

    try {
      const response = authMode === "login"
        ? await login(formValues)
        : await signup(formValues);

      setToken(response.token);
      setCurrentUser(response.user);
    } catch (error) {
      setAuthError(error.message);
    }
  };

  const handleLogout = () => {
    clearToken();
    setCurrentUser(null);
    setAuthMode("login");
  };

  if (loading) {
    return <div className="container">Loading...</div>;
  }

  if (!currentUser) {
    return (
      <AuthPage
        mode={authMode}
        error={authError}
        onSubmit={handleAuthSubmit}
        onModeChange={setAuthMode}
      />
    );
  }

  return <Dashboard currentUser={currentUser} onLogout={handleLogout} />;
}

export default App;
