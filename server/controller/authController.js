const db = require("../config/connection");
const jwt = require("jsonwebtoken");

const handleSignin = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(401).send("Invalid email or password");
  }
  try {
    const results = await db.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, password]
    );

    if (results[0].insertId === 0)
      return res.status(401).send({ error: "Invalid credentials" });

    const successResponse = {
      status: "ok",
      message: "Signed in successfully",
    };

    return res.status(201).send(successResponse);
  } catch (error) {
    console.log("error: ", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};
const handleLogin = async (req, res) => {
  const { email, password } = req.body;

  const [results] = await db.query(
    "SELECT * FROM users WHERE email = ? AND password = ?",
    [email, password]
  );

  if (!results.length)
    return res.status(401).send({ error: "Invalid login credentials" });

  try {
    const user = results[0];
    const exp = Math.floor(Date.now() / 1000) + 3600; // Token expires in one hour
    const token = jwt.sign(
      { email: user.email, password: user.password, exp },
      "secretKey"
    );

    const tokenInserted = await db.query(
      "UPDATE users SET token = ? WHERE user_id = ?",
      [token, user.user_id]
    );
    if (!tokenInserted)
      return res.status(404).send({ error: "User not found" });

    const [userData] = await db.query("SELECT * FROM users WHERE user_id = ?", [
      user.user_id,
    ]);

    const successResponse = {
      status: "ok",
      message: "User Logged in succesfully",
      data: userData[0],
    };
    res.status(200).send(successResponse);
  } catch (error) {
    if (error) res.status(500).send({ error: "Internal Server Error" });
  }
};

// LOGOUT
const handleLogout = async (req, res) => {
  try {
    const [results] = await db.execute(
      "UPDATE users SET token = NULL WHERE user_id = ?",
      [req.body.user_id]
    );
    if (!results) return res.status(404).send({ error: "User not found" });

    const successResponse = {
      status: "ok",
      message: "Logged out successfully",
    };
    res.status(200).send(successResponse);
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error" });
  }
};

module.exports = { handleSignin, handleLogin, handleLogout };
