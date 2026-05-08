import "./Diagram.css";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#A020F0",
  "#FF4560",
];

function Diagram({ transactions }) {

  // 1. Filter expense only
  const expenses = transactions.filter(
    (transaction) => transaction.amount < 0
  );

  // 2. Group by category
  const categoryMap = {};

  expenses.forEach((transaction) => {

    // If category missing → Uncategorized
    const category =
      transaction.category?.trim() || "Uncategorized";

    // Convert negative expense to positive number
    const amount = Math.abs(transaction.amount);

    // Add amounts together
    categoryMap[category] =
      (categoryMap[category] || 0) + amount;
  });

  // 3. Convert object → chart array
  const chartData = Object.entries(categoryMap).map(
    ([name, value]) => ({
      name,
      value,
    })
  );

  return (
    <section className="diagram">

      <div className="chart-card">
        <h3>Expense Categories</h3>

        <ResponsiveContainer width="100%" height={350}>
          <PieChart>

            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              outerRadius={120}
              label
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip />
            <Legend />

          </PieChart>
        </ResponsiveContainer>

      </div>

    </section>
  );
}

export default Diagram;