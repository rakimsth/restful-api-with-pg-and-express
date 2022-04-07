const User = require("../models/Users");
var userDao = {
  findAll: findAll,
  create: create,
  findById: findById,
  deleteById: deleteById,
  updateUser: update,
};

function findAll() {
  return User.findAll();
}

function findById(id) {
  return User.findByPk(id);
}

function deleteById(id) {
  return User.destroy({ where: { id: id } });
}

function create(user) {
  var newGig = new User(user);
  return newGig.save();
}

function update(user, id) {
  var update = {
    name: user.name,
    email: user.email,
    address: user.address,
  };
  return User.update(update, { where: { id: id } });
}
module.exports = userDao;
