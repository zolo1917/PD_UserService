import { body } from "express-validator";

exports.registerValidator = [
  body("email").isEmail().withMessage("invalid email").normalizeEmail(),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 charecters long"),
];

exports.loginValidator = [
  body("email").isEmail().withMessage("invalid email").normalizeEmail(),
  body("password").isLength({ min: 6 }).withMessage("invalid password"),
];
