import "./SummaryCard.css";

function SummaryCard({ title, value }) {
  return (
    <article className="card">
      <h3>{title}</h3>
      <p>{value}</p>
    </article>
  );
}

export default SummaryCard;