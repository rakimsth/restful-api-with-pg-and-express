const ROLES = ["user", "admin", "moderator"];
const db = require("../config/db.config");

const { models } = db;
const { user } = models;

checkDuplicateUsernameOrEmail = (req, res, next) => {
  // Username
  try {
    user
      .findOne({
        where: {
          username: req.body.username,
        },
      })
      .then((d) => {
        if (d) {
          res.status(400).send({
            message: "Failed! Username is already in use!",
          });
          return;
        }

        // Email
        user
          .findOne({
            where: {
              email: req.body.email,
            },
          })
          .then((user) => {
            if (user) {
              res.status(400).send({
                message: "Failed! Email is already in use!",
              });
              return;
            }
            next();
          });
      });
  } catch (e) {
    console.log({ middleware_err: e });
  }
};

checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: "Failed! Role does not exist = " + req.body.roles[i],
        });
        return;
      }
    }
  }

  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
  checkRolesExisted: checkRolesExisted,
};

module.exports = verifySignUp;
