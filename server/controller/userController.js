const db = require("../config/connection");

// GET USER
const getSingleUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await db.query("SELECT * FROM users WHERE user_id = ?", [
      userId,
    ]);
    if (!user) return res.status(500).send("Error getting user");
    const successResponse = {
      status: "ok",
      message: "Success",
      data: user[0],
    };
    res.send(successResponse);
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error" });
  }
};

// GET ALL USERS
const getAllUsers = async (req, res) => {
  try {
    const users = await db.query("SELECT * FROM users");
    if (!users) return res.status(500).send("Error getting user");
    const successResponse = {
      status: "ok",
      message: "Success",
      data: users[0],
    };
    res.status(200).send(successResponse);
  } catch (error) {
    console.log("error: ", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

//UPDATE USER
const updateUser = async (req, res) => {
  const {
    name,
    email,
    dob,
    mobile,
    occupation,
    state,
    district,
    nationality,
    empno,
    role,
    user_id,
  } = req.body;
  try {
    const [updateUser] = await db.query(
      "UPDATE users SET name = ?, mobile = ?, email = ?, empno = ?, state = ?, district = ?,nationality = ?,occupation = ?, dob = ?,role = ? WHERE user_id = ?",
      [
        name,
        mobile,
        email,
        empno,
        state,
        district,
        nationality,
        occupation,
        dob,
        role,
        user_id,
      ]
    );
    if (!updateUser) return res.status(500).send("Error updating user");

    let user = await db.query("SELECT * FROM users WHERE user_id = ?", [
      user_id,
    ]);
    if (!user) return res.status(500).send("Error getting user");

    const successResponse = {
      status: "ok",
      message: "Success",
      data: user[0],
    };
    res.status(200).send(successResponse);
  } catch (error) {
    console.log("error: ", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

// UPDATE USER ROLE
const updateUserRole = async function (req, res) {
  const { role, user_id } = req.body;
  if (role == null || !user_id)
    return res.status(500).send({ error: "Invalid user data" });
  try {
    const [updateUser] = await db.query(
      "UPDATE users SET role = ? WHERE user_id = ?",
      [role, user_id]
    );
    if (!updateUser) return res.status(500).send("Error updating user");

    let user = await db.query("SELECT * FROM users WHERE user_id = ?", [
      user_id,
    ]);
    if (!user) return res.status(500).send("Error getting user");

    const successResponse = {
      status: "ok",
      message: "Success",
      data: user[0],
    };
    res.status(200).send(successResponse);
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error" });
  }
};

// DELETE
const deleteUser = async (req, res) => {
  try {
    const deleted = await db.query("DELETE FROM users WHERE user_id = ?", [
      req.params.id,
    ]);
    if (deleted[0]?.affectedRows == 1) {
      const users = await db.query("SELECT * FROM users");
      if (!users) return res.status(500).send("Error getting user");
      const successResponse = {
        status: "ok",
        message: "Success",
        data: users[0],
      };
      res.status(200).send(successResponse);
    }
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error" });
  }
};

module.exports = {
  getSingleUser,
  getAllUsers,
  updateUser,
  deleteUser,
  updateUserRole,
};
