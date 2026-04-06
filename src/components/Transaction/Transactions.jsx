import "./Transactions.css";
import TransactionItem from "../TransactionItem/TransactionItem";

function Transactions() {
    const transactions = [
    {
        category: "Dinning",
        date: '2023-01-01',
        name: 'Chick-fil-A',
        amount: -10.25,
    },
    {
        category: "Online",
        date: '2023-01-02',
        name: 'Amazon',
        amount: -80.88,
    },
    {
        category: "Shopping",
        date: '2023-01-03',
        name: 'Target (Return)',
        amount: +30,
    },
];

return (
    <section className="transactions">
        <h2>Recent Transactions</h2>
        <div className="transaction-list">
            {transactions.map((item, index) => (
                <TransactionItem
                    key={index}
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
