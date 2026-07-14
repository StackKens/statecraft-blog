const pool = require("../db/index");
const bcrypt = require("bcryptjs");

//function to handle the login
async function login(req, res) {
  const { email, password } = req.body;

  //validate input
  if (!email || !password) {
    return res.status(400).json({ message: "Email or password is required!" });
  }
  try {
    //find user by email(check whether the user with the same email already exists)
    const result = await pool.query("SELECT * FROM users WHERE email =$1", [
      email,
    ]);

    //check if the user already exists
    if (result.rows.lenght === 0) {
      return res.status(404).json({ message: "Invalid credentials" });
    }

    const user = result.rows[0];

    //compare what user typed in against the hash
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
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
