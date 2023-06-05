const db = require("../config/db.config");

const { models } = db;
const { user } = models;

// API CRUD
const findAll = async (req, res) => {
  let data;
  if (req.query.showPassword) {
    data = await user.scope("withPassword").findAndCountAll();
  } else {
    data = await user.findAndCountAll();
  }
  res.status(200).send(data);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const data = await user.findByPk(id);
  res.status(200).send(data);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { password, username, ...rest } = req.body;
  await user.update(rest, { where: { id: id } });
  res.status(200).send(`User ${req.params.id} updated Successfully.`);
};

const deleteById = async (req, res) => {
  await user.destroy({ where: { id: req.params.id } });
  res.status(200).send(`User ${req.params.id} deleted Successfully.`);
};

// API testing
const allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

const userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

const adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

const moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};

const userController = {
  allAccess,
  userBoard,
  adminBoard,
  moderatorBoard,
  findById,
  findAll,
  deleteById,
  update,
};

module.exports = userController;
