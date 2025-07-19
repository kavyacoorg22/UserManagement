const validator = require("validator");

const validateRegister = (req, res, next) => {
  const { name, number, email, password } = req.body;

  if (!name || !number || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (!validator.isAlpha(name, 'en-US', { ignore: ' ' })) {
    return res.status(400).json({ message: "Name must contain only alphabets" });
  }

  
  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }


  if (!validator.isMobilePhone(number, 'en-IN')) {
    return res.status(400).json({ message: "Invalid phone number" });
  }

 
  if (!validator.isLength(password, { min: 8 })) {
    return res.status(400).json({ message: "Password must be at least 8 characters long" });
  }

  next();
};

module.exports = validateRegister;
