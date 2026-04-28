# Financial Dashboard

Frontend is built with React + Vite, and the backend uses Spring Boot + H2.

## Frontend

```bash
npm install
npm run dev
```

The frontend expects the backend API at `http://localhost:8080/api`.

## Backend

Run the Spring Boot server with:

```bash
cd backend
mvn spring-boot:run
```

H2 console is available at `http://localhost:8080/h2-console`.

Use these values in the H2 console:

```text
JDBC URL: jdbc:h2:mem:financial_dashboard
User Name: sa
Password: (leave blank)
```

## Transactions API

Available endpoints:

- `GET /api/transactions`
- `POST /api/transactions`
- `PUT /api/transactions/{id}`
- `DELETE /api/transactions/{id}`
- `GET /api/dashboard/summary`
- `GET /api/dashboard/chart`

Sample transaction shape:

```json
{
  "id": 1,
  "category": "Dining",
  "name": "Chick-fil-A",
  "amount": -10.25,
  "date": "2023-01-01"
}
```

Dashboard summary response:

```json
{
  "totalIncome": 3850.0,
  "totalExpense": 215.74,
  "netProfit": 3634.26
}
```

Dashboard chart response:

```json
{
  "income": 3850.0,
  "expense": 215.74,
  "categories": [
    { "category": "Utilities", "amount": 120.5, "percentage": 55.9 },
    { "category": "Shopping", "amount": 84.99, "percentage": 39.4 },
    { "category": "Dining", "amount": 10.25, "percentage": 4.8 }
  ]
}
```

All list and dashboard endpoints also support optional `from` and `to` query params, for example:

- `GET /api/transactions?from=2023-01-01&to=2023-01-31`
- `GET /api/dashboard/summary?from=2023-01-01&to=2023-01-31`

On first startup, the backend inserts sample income and expense transactions if the table is empty.
