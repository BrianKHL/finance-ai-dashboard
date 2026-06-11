# Finance AI Dashboard

A full-stack personal finance dashboard that helps users track income and expenses, visualize spending patterns, and receive AI-powered financial insights based on transaction history.

---

## Purpose

The goal of this project is to help users manage their finances in a more intuitive and efficient way.

Features include:

* Transaction management (income and expenses)
* Spending category visualization
* Budget status monitoring
* Financial summary dashboard
* AI-powered spending analysis using Gemini AI

---

## Technologies Used

### Frontend

* React
* JavaScript (ES6+)
* Vite
* CSS

### Backend

* Java
* Spring Boot
* Spring Data JPA

### Database

* MySQL

### AI Integration

* Google Gemini API

### Development Tools

* Git
* GitHub
* Postman

---

## Project Structure

```text
finance-ai-dashboard/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   └── App.jsx
│   └── package.json
│
├── backend/
│   ├── src/main/java/
│   │   ├── transaction/
│   │   ├── dashboard/
│   │   ├── ai/
│   │   └── config/
│   └── pom.xml
│
└── README.md
```

### Architecture Overview

```text
React Frontend
        │
        ▼
Spring Boot REST API
        │
 ┌──────┴──────┐
 ▼             ▼
MySQL      Gemini AI
Database     API
```

---

## How to Run the Project

### Prerequisites

Install:

* Java 21+
* Maven
* Node.js
* MySQL

---

### Start Backend Server

Open Terminal #1:

```bash
cd backend

export GEMINI_API_KEY=YOUR_API_KEY

mvn spring-boot:run
```

Expected output:

```text
Backend server ON (localhost:8080)
Connected to MySQL
API ready
```

---

### Start Frontend Server

Open Terminal #2 (New Terminal start needed):

```bash
cd frontend

npm install
npm run dev
```

Expected output:

```text
Frontend server ON
http://localhost:5173
```

Open:

```text
http://localhost:5173
```

in your browser.

---

## MySQL Setup (macOS)

If MySQL is not installed:

```bash
brew install mysql
```

Start MySQL:

```bash
brew services start mysql
```

Login:

```bash
mysql -u root
```

Verify database:

```sql
SHOW DATABASES;
USE finance_dashboard;
SHOW TABLES;
```

---

## Features

### Transaction Management

* Create transactions
* Update transactions
* Delete transactions
* Store data in MySQL

### Dashboard Analytics

* Total Income
* Total Expense
* Net Profit

### Spending Visualization

* Expense categories
* Category-based spending breakdown

### AI Financial Insights

Example questions:

* Where am I spending the most money?
* What category should I reduce?
* Is my spending healthy?
* What spending habits do you notice?

The application analyzes transaction history and generates personalized recommendations using Google Gemini AI.

---

## Demo Video

Demo Video:

[YouTube Link Here] - Will update soon

---

## Feedback & Contact

If you have any questions, feedback, or feature requests about this project, feel free to reach out.

### Brian Lee

* Email: briankhlee25@gmail.com
* LinkedIn: https://www.linkedin.com/in/briankwanghaklee/

### Jaehoon Choi

* [Github](https://github.com/hoons1130)

### Issues

For bugs, suggestions, or feature requests, please open an Issue in this GitHub repository.


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
