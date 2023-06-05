function applyExtraSetup(sequelize) {
  const { role, user } = sequelize.models;

  user.belongsToMany(role, {
    through: "user_roles",
    foreignKey: "userId",
    otherKey: "roleId",
  });

  role.belongsToMany(user, {
    through: "user_roles",
    foreignKey: "roleId",
    otherKey: "userId",
  });
}

module.exports = { applyExtraSetup };
