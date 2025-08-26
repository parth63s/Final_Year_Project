const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const multer = require("multer");

// Register
const storage = multer.memoryStorage(); // keeps file in memory (you can also store on disk)
const upload = multer({ storage });

router.post('/register', upload.single('profilePicture'), async (req, res) => {
  console.log(req.body);
  const { name, email, password, role, phone, address, kitchenName } = req.body;
  const existing = await User.findOne({ email });
  if (existing) return res.status(400).json({ msg: 'User already exists' });

  const hash = await bcrypt.hash(password, 10);
  const newUser = new User({ name, email, password: hash, role, phone, address });
  await newUser.save();
  console.log("s");
  res.json({ msg: 'Registered successfully' });

});

// Login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (!user) return res.status(400).json({ msg: info.message });
    req.logIn(user, (err) => {
      if (err) return next(err);
      res.json({ user: { email: user.email, role: user.role } });
    });
  })(req, res, next);
});

// routes/auth.js

router.get('/logout', (req, res) => {
  req.logout(err => {
    if (err) {
      console.error("Logout error:", err);
      return res.status(500).json({ msg: 'Logout failed' });
    }

    // If using express-session, also destroy session
    req.session.destroy(err => {
      if (err) {
        console.error("Session destroy error:", err);
        return res.status(500).json({ msg: 'Session not destroyed' });
      }

      res.clearCookie('connect.sid'); // Clear session cookie (name may vary)
      return res.json({ msg: 'Logged out successfully' });
    });
  });
});


module.exports = router;
