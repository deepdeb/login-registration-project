const Joi = require("joi");
const crypto = require("crypto");
const db = require("../models");

// Register Functionality
exports.register = async (req, res) => {
  const studentSchema = Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    age: Joi.number().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    phone: Joi.string(),
  });

  const body = req.body;

  const { error } = studentSchema.validate(body);
  if (error) {
    return res.status(400).json({ msg: "Incorrect payload", error });
  }

  //Duplicate email check start
  const { email } = body;

  const existingUser = await db.Student.findOne({
    where: db.sequelize.where(
      db.sequelize.fn("lower", db.sequelize.col("email")),
      db.sequelize.fn("lower", email)
    ),
  });

  if (existingUser) {
    return res.status(409).json({ error: "Email already registered" });
  }
  //Duplicate email check end

  const salt = crypto.randomBytes(16).toString("base64");
  if (body.password) {
    const hash = crypto
      .createHash("sha512", salt)
      .update(body.password)
      .digest("base64");
    body.password = salt + "$" + hash;
  }

  const student = await db.Student.create(req.body);

  if (student) {
    return res
      .status(201)
      .json({ msg: "Successfully created student", student });
  } else {
    return res.status(500).json("Failed to create student");
  }
};

//Login Functionality
exports.login = async (req, res) => {
  try {
    const loginSchema = Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });

    const body = req.body;

    const { error } = loginSchema.validate(body);
    if (error) {
      return res.status(400).json({ msg: "Incorrect payload", error });
    }

    const { email, password } = body;

    const matchedStudent = await db.Student.findOne({
      where: db.sequelize.where(
        db.sequelize.fn("lower", db.sequelize.col("email")),
        db.sequelize.fn("lower", email)
      ),
    });

    if (!matchedStudent) {
      return res.status(404).json({ msg: "Student not found" });
    }

    const [salt, responseHash] = matchedStudent.password.split("$");

    const requestedHashedPassword = crypto
      .createHash("sha512", salt)
      .update(password)
      .digest("base64");

    if (requestedHashedPassword !== responseHash) {
      return res.status(401).json({ msg: "Incorrect Password" });
    }

    return res.status(200).json({ studentId: matchedStudent.id });
  } catch (error) {
    return res.status(500).json({ msg: "Something went wrong", error });
  }
};

// List all students functionality
exports.getStudentList = async (req, res) => {
  const students = await db.Student.findAll();
  if (!students) {
    return res.status(404).json({ msg: "No data found" });
  }
  return res.status(200).json({ data: students });
};

// Delete student functionality
exports.deleteStudent = async (req, res) => {
  try {
    const deletedStudent = await db.Student.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!deletedStudent) {
      return res.status(500).json({ msg: "Failed to delete" });
    }
    return res.status(200).json({ msg: "Successfully deleted" });
  } catch (error) {
    return res.status(500).json({ msg: "Something went wrong", error });
  }
};

// Edit profile functionality
exports.editProfile = async (req, res) => {
  const [updatedCount, updatedStudent] = await db.Student.update(req.body, {
    where: { id: req.params.id },
  });
  if (!updatedCount > 0) {
    return res.status(500).json({ msg: "Failed to update" });
  }
  return res.status(200).json({ msg: "Successfully updated" });
};
