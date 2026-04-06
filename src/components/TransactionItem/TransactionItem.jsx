import "./TransactionItem.css";

function TransactionItem({ category, date, name, amount }) {
    const isIncome = amount > 0;

    return (
        <div className="transaction-item">
            <div className="left">
                <span className="category">{category}</span>
                <span className="date">{date}</span>
                <span className="name">{name}</span>
            </div>

            <div className ={`amount ${isIncome ? "income" : "expense"}`}>
                {isIncome ? "+" : "-"}${Math.abs(amount).toFixed(2)}
            </div>
        </div>
    );
}

export default TransactionItem;