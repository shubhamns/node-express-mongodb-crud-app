const User = require("../models/user");

exports.createUser = async (req, res) => {
  if (!req.body.firstName || !req.body.lastName || !req.body.email) {
    return res.status(422).json({
      firstName: "firstname is required",
      lastName: "firstname is required",
      email: "email is required",
    });
  }
  const user = new User(req.body);
  try {
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.readUser = async (req, res) => {
  try {
    const user = await User.find();
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updateUser = async (req, res) => {
  const id = req.params.userId;
  try {
    const user = await User.findByIdAndUpdate(id, req.body, {
      new: true,
      useFindAndModify: false,
    });
    if (!user) {
      return res.send({ message: `user not found with id ${id}` });
    }
    res.send({ message: "Update user successfully", user: user });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.deleteUser = async (req, res) => {
  const id = req.params.userId;
  try {
    const user = await User.findByIdAndRemove(id, {
      useFindAndModify: false,
    });
    if (!user) {
      return res.send({ message: `user not found with id ${id}` });
    }
    res.send({ message: "Delete user successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
};
