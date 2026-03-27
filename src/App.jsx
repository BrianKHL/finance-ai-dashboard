/**
 * [Header]<h1>
 * [User Info]<p> or <div> (ID + Date/Time)
 * [Summary Cards Row] [][][] <div> or <article>
 * [Income & Expense diagram][Budget Overview]
 */

import './App.css';

function App() {
  return (
    <div className = "container">
      <header>
        Finance AI Dashboard
      </header>

    <section className = "user-info">
      <div>ID:XXX</div>
      <div>Date / Time </div>
    </section>

    <section className = "summary-blocks">
      <article>
        Total Income
      </article>
      <article>
        Total Expense
      </article>
      <article>
        Net Profit
      </article>
    </section>

    </div>
  );
}

export default App;