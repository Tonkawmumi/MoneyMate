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

app.listen(5000, () => {
  console.log("Server Running");
});
