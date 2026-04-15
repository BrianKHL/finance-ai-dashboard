import { useState, useEffect } from "react";
import "./Transactions.css";
import TransactionItem from "../TransactionItem/TransactionItem";

function Transactions() {
    const [transactions, setTransactions] = useState([]);

    //Temporary mock data
    useEffect(() => {
        const mockData = [
            {
                id: 1,
                category: "Dinning",
                date: '2023-01-01',
                name: 'Chick-fil-A',
                amount: -10.25,
            },
            {
                id: 2,
                category: "Online",
                date: '2023-01-02',
                name: 'Amazon',
                amount: -80.88,
            },
            {
                id: 3,
                category: "Shopping",
                date: '2023-01-03',
                name: 'Target (Return)',
                amount: +30,
            },
        ];

        setTransactions(mockData);
    }, []);


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
