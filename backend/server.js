const express = require("express");
const cors = require("cors");
const connection = require("./db");
const bcrypt = require("bcrypt");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/users", (req, res) => {
  connection.query("SELECT * FROM users", (err, results) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json(results);
  });
});

app.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    connection.query(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
      [username, email, hashedPassword],
      (err, result) => {
        if (err) {
          return res.status(500).json(err);
        }

        res.json({
          success: true,
          message: "Register Success",
        });
      },
    );
  } catch (error) {
    res.status(500).json(error);
  }
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  connection.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, results) => {
      if (err) {
        return res.status(500).json(err);
      }

      if (results.length === 0) {
        return res.status(404).json({
          message: "Email not found",
        });
      }

      const user = results[0];

      const isMatch = await bcrypt.compare(
        password,
        user.password
      );

      if (!isMatch) {
        return res.status(401).json({
          message: "Wrong password",
        });
      }

      res.json({
        success: true,
        message: "Login Success",
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
        },
      });
    }
  );
});

app.post("/transactions", (req, res) => {
  const {
    user_id,
    type,
    title,
    amount,
    category,
    transaction_date,
  } = req.body;

  connection.query(
    `
    INSERT INTO transactions
    (
      user_id,
      type,
      title,
      amount,
      category,
      transaction_date
    )
    VALUES (?, ?, ?, ?, ?, ?)
    `,
    [
      user_id,
      type,
      title,
      amount,
      category,
      transaction_date,
    ],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        success: true,
        message: "Transaction Added",
      });
    }
  );
});

app.get("/transactions", (req, res) => {
  connection.query(
    "SELECT * FROM transactions ORDER BY transaction_date DESC",
    (err, results) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json(results);
    }
  );
});

app.listen(5000, () => {
  console.log("Server Running");
});
