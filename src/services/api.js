const API_URL = "http://localhost:8080/api";

export const fetchTransactions = async () => {
    const res = await fetch(`${API_URL}/transactions`);
    return res.json();
};