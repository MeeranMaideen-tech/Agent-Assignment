const User = require('../models/User');
const jwt = require('jsonwebtoken');

// 🔐 Generate JWT token
const generateToken = (user) => {
  return jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};

// 📝 Register Admin or Agent
exports.register = async (req, res) => {
  try {
    const { name, email, phone, password, role } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const user = new User({
      name,
      email,
      phone,
      password,
      role,
    });

    await user.save();

    return res.status(201).json({ message: `${role} registered successfully` });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error during registration' });
  }
};

// 🔑 Login for Admin or Agent
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    // Check approval (only for agents)
    if (user.role === 'agent' && !user.isApproved) {
      return res.status(403).json({ message: 'Your account is pending approval' });
    }

    // Validate password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    // Create token
    const token = generateToken(user);

    return res.status(200).json({
      token,
      user: {
        _id: user._id,
        role: user.role,
        isApproved: user.isApproved,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error during login' });
  }
};
