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

app.get("/dashboard", (req, res) => {
  const { userId } = req.query;

  connection.query(
    "SELECT * FROM transactions WHERE user_id = ?",
    [userId],
    (err, results) => {
      if (err) {
        return res.status(500).json(err);
      }

      const currentMonth = new Date().getMonth() + 1;
      const currentYear = new Date().getFullYear();
      const previousMonth = currentMonth === 1 ? 12 : currentMonth - 1;
      const previousYear = currentMonth === 1 ? currentYear - 1 : currentYear;

      const totalIncome = results
        .filter(
          (item) =>
            item.type === "income" &&
            new Date(item.transaction_date).getMonth() + 1 === currentMonth &&
            new Date(item.transaction_date).getFullYear() === currentYear,
        )
        .reduce((sum, item) => sum + Number(item.amount), 0);

      const totalExpense = results
        .filter(
          (item) =>
            item.type === "expense" &&
            new Date(item.transaction_date).getMonth() + 1 === currentMonth &&
            new Date(item.transaction_date).getFullYear() === currentYear,
        )
        .reduce((sum, item) => sum + Number(item.amount), 0);

      const balance = totalIncome - totalExpense;

      const savingsRate =
        totalIncome > 0 ? Math.round((balance / totalIncome) * 100) : 0;


      const previousMonthIncome = results.filter(
        (item) =>
          item.type === "income" &&
          new Date(item.transaction_date).getMonth() + 1 === previousMonth &&
          new Date(item.transaction_date).getFullYear() === previousYear,
      )
      .reduce((sum, item) => sum + Number(item.amount), 0);

      const previousMonthExpense = results.filter(
        (item) =>
          item.type === "expense" &&
          new Date(item.transaction_date).getMonth() + 1 === previousMonth &&
          new Date(item.transaction_date).getFullYear() === previousYear,
      )
      .reduce((sum, item) => sum + Number(item.amount), 0);

      const currentMonthSaving = totalIncome - totalExpense;

      const previousMonthSaving = previousMonthIncome - previousMonthExpense;

      const savingDifference = currentMonthSaving - previousMonthSaving;

      res.json({
        totalIncome,
        totalExpense,
        balance,
        savingsRate,
        savingDifference,
      });
    },
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
    },
  );
});

// API สำหรับเพิ่มข้อมูล (Create)
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

// API สำหรับแก้ไขข้อมูล (Update)
app.put("/transactions/:id", (req, res) => {
  const { id } = req.params;
  const { user_id, type, title, amount, category, transaction_date } = req.body;

  connection.query(
    `
    UPDATE transactions 
    SET type = ?, title = ?, amount = ?, category = ?, transaction_date = ?
    WHERE id = ? AND user_id = ?
    `,
    [type, title, amount, category, transaction_date, id, user_id],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }
      res.json({ success: true, message: "Transaction Updated" });
    }
  );
});

// API สำหรับลบข้อมูล (Delete)
app.delete("/transactions/:id", (req, res) => {
  const { id } = req.params;
  const { userId } = req.query;

  connection.query(
    `
    DELETE FROM transactions 
    WHERE id = ? AND user_id = ?
    `,
    [id, userId],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }
      res.json({ success: true, message: "Transaction Deleted" });
    }
  );
});

app.get("/recent-transactions", (req, res) => {
  const { userId } = req.query;

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

app.get("/monthly-analysis", (req, res) => {
  const { userId, year } = req.query;

  connection.query(
    `
    SELECT
      MONTH(transaction_date) AS month,
      type,
      SUM(amount) AS total
    FROM transactions
    WHERE YEAR(transaction_date) = ?
      AND user_id = ?
    GROUP BY MONTH(transaction_date), type
    ORDER BY MONTH(transaction_date)
    `,
    [year, userId],
    (err, results) => {
      if (err) {
        return res.status(500).json(err);
      }

      const monthNames = [
        "ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.",
        "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค.",
      ];

      const currentYear = new Date().getFullYear();

      let loopEnd = 12; 

      if (Number(year) === currentYear) {
        loopEnd = new Date().getMonth() + 1;
      }

      const data = [];

      for (let i = 1; i <= loopEnd; i++) {
        data.push({
          month: monthNames[i - 1],
          income: 0,
          expense: 0,
        });
      }

      results.forEach((row) => {
        const index = row.month - 1;

        if (index < loopEnd) {
          if (row.type === "income") {
            data[index].income = Number(row.total);
          }

          if (row.type === "expense") {
            data[index].expense = Number(row.total);
          }
        }
      });

      res.json(data);
    },
  );
});

// app.get("/monthly-analysis", (req, res) => {
//   const { userId } = req.query;

//   connection.query(
//     `
//     SELECT
//       MONTH(transaction_date) AS month,
//       type,
//       SUM(amount) AS total
//     FROM transactions
//     WHERE YEAR(transaction_date) = YEAR(CURDATE())
//       AND user_id = ?
//     GROUP BY MONTH(transaction_date), type
//     ORDER BY MONTH(transaction_date)
//     `,
//     [userId],
//     (err, results) => {
//       if (err) {
//         return res.status(500).json(err);
//       }

//       const monthNames = [
//         "ม.ค.",
//         "ก.พ.",
//         "มี.ค.",
//         "เม.ย.",
//         "พ.ค.",
//         "มิ.ย.",
//         "ก.ค.",
//         "ส.ค.",
//         "ก.ย.",
//         "ต.ค.",
//         "พ.ย.",
//         "ธ.ค.",
//       ];

//       const currentMonth = new Date().getMonth() + 1;

//       const data = [];

//       for (let i = 1; i <= currentMonth; i++) {
//         data.push({
//           month: monthNames[i - 1],
//           income: 0,
//           expense: 0,
//         });
//       }

//       results.forEach((row) => {
//         const index = row.month - 1;

//         if (row.type === "income") {
//           data[index].income = Number(row.total);
//         }

//         if (row.type === "expense") {
//           data[index].expense = Number(row.total);
//         }
//       });

//       res.json(data);
//     },
//   );
// });

app.get("/expense-breakdown", (req, res) => {
  const { userId, month, year } = req.query;

  connection.query(
    `
    SELECT
      category,
      SUM(amount) AS amount
    FROM transactions
    WHERE user_id = ?
      AND type = 'expense'
      AND MONTH(transaction_date) = ?
      AND YEAR(transaction_date) = ?
    GROUP BY category
    ORDER BY amount DESC
    `,
    [userId, month, year],
    (err, results) => {
      if (err) {
        return res.status(500).json(err);
      }

      const total = results.reduce((sum, item) => sum + Number(item.amount), 0);

      const data = results.map((item) => ({
        name: item.category,
        amount: Number(item.amount),
        percent:
          total === 0 ? 0 : Math.round((Number(item.amount) / total) * 100),
      }));

      res.json(data);
    },
  );
});

app.listen(5000, () => {
  console.log("Server Running");
});
