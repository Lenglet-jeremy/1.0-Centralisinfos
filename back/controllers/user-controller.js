const User = require("../models/user.schema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  sendConfirmationEmail,
  sendValidationAccount,
  sendInvalidEmailToken,
} = require("../email/email");

const createTokenEmail = (email) => {
  return jwt.sign({ email }, process.env.SECRET, { expiresIn: "60s" });
};

const signupUser = async (req, res) => {
  const { username, email, password, firstName, lastName, phoneNumber } =
    req.body;
  console.log(req.body);
  try {
    const user = await User.findOne({ email });
    if (!user) {
      const token = createTokenEmail(email);
      console.log(token);
      await sendConfirmationEmail(email, token);
      const salt = await bcrypt.genSalt(10);
      const hashPassWord = await bcrypt.hash(password, salt);
      const user = new User({
        username,
        email,
        password: hashPassWord,
        firstname: firstName || null,
        lastName: lastName || null,
        phoneNumber: phoneNumber || null,
        token,
      });
      await user.save();
      res.status(200).json({
        message:
          "Veuillez confirmer votre inscription en consultant votre boite mail",
      });
    } else {
      res.status(400).json({
        message: "Email déjà existant",
      });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const verifyMail = async (req, res) => {
  const token = req.params.token;
  const isTokenNull = await User.findOne({ token: token });
  const decoded = jwt.verify(token, process.env.SECRET, {
    ignoreExpiration: true,
  });
  console.log(decoded.exp * 1000);
  console.log(new Date().getTime());
  try {
    if (!isTokenNull) {
      res.status(400).json({ message: "Token déjà validé" });
      return;
    }
    if (decoded.exp * 1000 > new Date().getTime()) {
      await User.findOneAndUpdate({ email: decoded.email }, { token: null });
      await sendValidationAccount(decoded.email);
      res.json({ message: "Inscrtiption confirmée avec succès" });
    } else {
      await User.findOneAndDelete({ email: decoded.email });
      await sendInvalidEmailToken(decoded.email);
      res.status(400).json({ message: "Token invalide ou expiré" });
    }
  } catch (error) {
    console.log(error);
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      if (!user.token) {
        const match = await bcrypt.compare(password, user.password);
        if (match) {
          res.status(200).json(user);
        } else {
          res.status(400).json({ message: "Mauvais Email et/ou Password" });
        }
      } else {
        res.status(400).json({ message: "Email non validé" });
      }
    } else {
      res.status(400).json({ message: "Mauvais Email et/ou Password" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { signupUser, verifyMail, loginUser };
