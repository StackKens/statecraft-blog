const pool = require("../db/index");

//function to handle the login
async function login(req, res) {
  const { email, password } = req.body;

  //validate input
  if (!email || !password) {
    return res.status(400).json({ message: "Email or password is required!" });
  }
  try {
    //find user by email
    const result = await pool.query("SELECT * FROM users WHERE email =$1", [
      email,
    ]);

    //check if the user already exists
    if (result.rows === 0) {
      return res.status(404).json({ message: "Invalid credentials" });
    }

    const user = result.rows[0];
    res.json({
      token: "fake token",
      id: user.id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "server Error" });
  }
}

module.exports = login;
