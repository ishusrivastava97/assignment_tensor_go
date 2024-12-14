// const jwt = require("jsonwebtoken");
// const User = require("../models/User");
// const bcrypt = require("bcrypt");

// exports.localSignup = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;
//     let user = await User.findOne({ email });
//     if (user) return res.status(400).json({ error: "Email already in use" });

//     const hashedPassword = await bcrypt.hash(password, 10);
//     // If your User model previously required googleId, make it optional or remove requirement
//     user = await User.create({ name, email, password: hashedPassword });

//     const token = jwt.sign(
//       { id: user._id, email: user.email },
//       process.env.JWT_SECRET,
//       { expiresIn: "1d" }
//     );
//     res.json({ token });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Signup failed" });
//   }
// };

// exports.localLogin = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });
//     // Ensure the user has a password field (meaning they've signed up locally)
//     if (!user || !user.password)
//       return res.status(400).json({ error: "Invalid credentials" });

//     const match = await bcrypt.compare(password, user.password);
//     if (!match) return res.status(400).json({ error: "Invalid credentials" });

//     const token = jwt.sign(
//       { id: user._id, email: user.email },
//       process.env.JWT_SECRET,
//       { expiresIn: "1d" }
//     );
//     res.json({ token });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Login failed" });
//   }
// };
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcrypt");


exports.localSignup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ error: "Email already in use" });

    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({ name, email, password: hashedPassword });

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Signup failed" });
  }
};


exports.localLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user || !user.password)
      return res.status(400).json({ error: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Login failed" });
  }
};


exports.createToken = (req, res) => {
  try {
    const user = req.user; 
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    
    res.redirect(`http://localhost:3001?token=${token}`);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create token" });
  }
};
