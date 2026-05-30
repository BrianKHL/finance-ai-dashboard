import { useState } from "react";
import "./TransactionForm.css";

const initialForm = {
  category: "",
  name: "",
  amount: "",
  date: "",
};

function TransactionForm({ onSubmit }) {
  const [formValues, setFormValues] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setMessage("");
    setError("");

    try {
      await onSubmit({
        ...formValues,
        amount: Number(formValues.amount),
      });
      setFormValues(initialForm);
      setMessage("Transaction added successfully.");
    } catch (submitError) {
      setError(submitError.message || "Failed to add transaction.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="transaction-form-card">
      <div className="transaction-form-header">
        <h2>Add Transaction</h2>
        <p>Add income or expense data to update your dashboard.</p>
      </div>

      <form className="transaction-form" onSubmit={handleSubmit}>
        <input
          name="category"
          placeholder="Category"
          value={formValues.category}
          onChange={handleChange}
          required
        />
        <input
          name="name"
          placeholder="Name"
          value={formValues.name}
          onChange={handleChange}
          required
        />
        <input
          name="amount"
          type="number"
          step="0.01"
          placeholder="Amount (- expense / + income)"
          value={formValues.amount}
          onChange={handleChange}
          required
        />
        <input
          name="date"
          type="date"
          value={formValues.date}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={submitting}>
          {submitting ? "Saving..." : "Add Transaction"}
        </button>
      </form>

      {message ? <p className="transaction-form-message">{message}</p> : null}
      {error ? <p className="transaction-form-error">{error}</p> : null}
    </section>
  );
}

export default TransactionForm;
