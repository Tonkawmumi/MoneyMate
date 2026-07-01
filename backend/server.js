const express = require("express");
const cors = require("cors");
const connection = require("./db");
const bcrypt = require("bcrypt");

const app = express();

const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

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

      const isMatch = await bcrypt.compare(password, user.password);

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
          created_at: user.created_at,
          profile_image: user.profile_image,
        },
      });
    },
  );
});

app.put("/profile/:id", (req, res) => {
  const { username } = req.body;
  const { id } = req.params;

  connection.query(
    "UPDATE users SET username = ? WHERE id = ?",
    [username, id],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        success: true,
        message: "Profile Updated",
      });
    },
  );
});

app.use("/uploads", express.static("uploads"));

app.post("/upload-profile/:id", upload.single("image"), (req, res) => {
  const { id } = req.params;

  const imagePath = "/uploads/" + req.file.filename;

  connection.query(
    `
      UPDATE users
      SET profile_image = ?
      WHERE id = ?
      `,
    [imagePath, id],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        success: true,
        image: imagePath,
      });
    },
  );
});

app.get("/dashboard/:userId", (req, res) => {
  const { userId } = req.params;

  connection.query(
    "SELECT * FROM transactions WHERE user_id = ?",
    [userId],
    (err, results) => {
      if (err) {
        return res.status(500).json(err);
      }

      const totalIncome = results
        .filter((item) => item.type === "income")
        .reduce((sum, item) => sum + Number(item.amount), 0);

      const totalExpense = results
        .filter((item) => item.type === "expense")
        .reduce((sum, item) => sum + Number(item.amount), 0);

      const balance = totalIncome - totalExpense;

      const savingsRate =
        totalIncome > 0
          ? Math.round((balance / totalIncome) * 100)
          : 0;

      const currentMonth = new Date().getMonth() + 1;
      const previousMonth = currentMonth - 1;

      const currentMonthIncome = results
        .filter(
          (item) =>
            item.type === "income" &&
            new Date(item.transaction_date).getMonth() + 1 ===
              currentMonth
        )
        .reduce((sum, item) => sum + Number(item.amount), 0);

      const currentMonthExpense = results
        .filter(
          (item) =>
            item.type === "expense" &&
            new Date(item.transaction_date).getMonth() + 1 ===
              currentMonth
        )
        .reduce((sum, item) => sum + Number(item.amount), 0);

      const previousMonthIncome = results
        .filter(
          (item) =>
            item.type === "income" &&
            new Date(item.transaction_date).getMonth() + 1 ===
              previousMonth
        )
        .reduce((sum, item) => sum + Number(item.amount), 0);

      const previousMonthExpense = results
        .filter(
          (item) =>
            item.type === "expense" &&
            new Date(item.transaction_date).getMonth() + 1 ===
              previousMonth
        )
        .reduce((sum, item) => sum + Number(item.amount), 0);

      const currentMonthSaving =
        currentMonthIncome - currentMonthExpense;

      const previousMonthSaving =
        previousMonthIncome - previousMonthExpense;

      const savingDifference =
        currentMonthSaving - previousMonthSaving;

      res.json({
        totalIncome,
        totalExpense,
        balance,
        savingsRate,
        savingDifference,
      });
    }
  );
});

app.get("/transactions/:userId", (req, res) => {
  const { userId } = req.params;

  connection.query(
    `
    SELECT *
    FROM transactions
    WHERE user_id = ?
    ORDER BY transaction_date DESC
    `,
    [userId],
    (err, results) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json(results);
    }
  );
});

app.post("/transactions", (req, res) => {
  const { user_id, type, title, amount, category, transaction_date } = req.body;

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
    [user_id, type, title, amount, category, transaction_date],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        success: true,
        message: "Transaction Added",
      });
    },
  );
});


app.get("/recent-transactions/:userId", (req, res) => {
  const { userId } = req.params;
  connection.query(
    `
    SELECT *
    FROM transactions
    WHERE user_id = ?
    ORDER BY transaction_date DESC
    LIMIT 5
    `,
    [userId],
    (err, results) => {
      if (err) {
        return res.status(500).json(err);
      }

      const total = results.reduce((sum, item) => sum + Number(item.amount), 0);

      const data = results.map((item) => ({
        name: item.category,
        amount: Number(item.amount),
        percent: Math.round((Number(item.amount) / total) * 100),
      }));

      res.json(data);
    },
  );
});

app.get("/recent-transactions/:userId", (req, res) => {
  const { userId } = req.params;

  connection.query(
    `
    SELECT *
    FROM transactions
    WHERE user_id = ?
    ORDER BY transaction_date DESC
    LIMIT 5
    `,
    [userId],
    (err, results) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json(results);
    },
  );
});

app.get("/monthly-analysis/:userId", (req, res) => {
  const { userId } = req.params;

  connection.query(
    `
    SELECT
      MONTH(transaction_date) AS month,
      type,
      SUM(amount) AS total
    FROM transactions
    WHERE YEAR(transaction_date) = YEAR(CURDATE())
      AND user_id = ?
    GROUP BY MONTH(transaction_date), type
    ORDER BY MONTH(transaction_date)
    `,
    [userId],
    (err, results) => {
      if (err) {
        return res.status(500).json(err);
      }

      const monthNames = [
        "ม.ค.",
        "ก.พ.",
        "มี.ค.",
        "เม.ย.",
        "พ.ค.",
        "มิ.ย.",
        "ก.ค.",
        "ส.ค.",
        "ก.ย.",
        "ต.ค.",
        "พ.ย.",
        "ธ.ค.",
      ];

      const currentMonth = new Date().getMonth() + 1;

      const data = [];

      for (let i = 1; i <= currentMonth; i++) {
        data.push({
          month: monthNames[i - 1],
          income: 0,
          expense: 0,
        });
      }

      results.forEach((row) => {
        const index = row.month - 1;

        if (row.type === "income") {
          data[index].income = Number(row.total);
        }

        if (row.type === "expense") {
          data[index].expense = Number(row.total);
        }
      });

      res.json(data);
    },
  );
});

app.listen(5000, () => {
  console.log("Server Running");
});
