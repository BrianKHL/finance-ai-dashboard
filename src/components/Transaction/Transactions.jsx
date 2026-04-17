import "./Transactions.css";
import TransactionItem from "../TransactionItem/TransactionItem";

function Transactions() {
    return (
        <section className="transactions">
            <h2>Recent Transactions</h2>
            <div className="transaction-list">
                {transactions.map((item) => (
                    <TransactionItem
                        key={item.id}
                        category={item.category}
                        date={item.date}
                        name={item.name}
                        amount={item.amount}
                    />
                ))}
            </div>
        </section>
    );
}
export default Transactions;
