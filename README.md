# MoneyMate (Under Development)

## Overview
MoneyMate is a web-based personal finance management system developed to help users record, organize, and monitor their financial transactions. The system provides functionality for managing income and expenses, tracking financial activities, and presenting summarized financial information through an intuitive user interface.

This project was developed using React for the frontend, Express.js for the backend, and MySQL as the database management system.

# Features

## User Authentication
- User Registration
- User Login

## Dashboard
- Display total income and expenses
- Display current balance
- Display savings rate
- Monthly income and expense analysis
- Expense breakdown by category
- Budget overview
- Recent transactions overview

## Transactions
- Add income and expense transactions
- Edit and Delete transactions
- View transaction history
- Search transactions
- Filter transactions by category
- Filter transactions by month
- Filter transactions by transaction type

## Budget
- Create budget plans
- Set spending limits
- Track budget usage
- Monitor remaining budget

## Reports
- Monthly financial reports
- Income and expense summaries
- Spending analysis by category
- Financial performance overview


# Technology Stack

## Frontend
- React
- React Router DOM
- Axios
- Tailwind CSS
- Framer Motion
- Recharts

## Backend
- Node.js
- Express.js

## Database
- MySQL

## Development Tools
- Visual Studio Code
- Navicat Premium
- Postman
- Git & GitHub

# Installation
- Frontend

```bash
cd frontend
npm install
npm run dev
```

- Backend

```bash
cd backend
npm install
npm run dev
```

## Environment Variables

Create a `.env` file inside the backend directory.

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=moneymate
PORT=5000
```