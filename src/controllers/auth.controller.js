const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { Sequelize } = require("sequelize");

const config = require("../config/auth.config");
const db = require("../config/db.config");

const { models } = db;
const { user, role } = models;

const Op = Sequelize.Op;

exports.signup = async (req, res) => {
  // Save User to Database
  await user
    .create({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    })
    .then((d) => {
      if (req.body.roles) {
        role
          .findAll({
            where: {
              name: {
                [Op.or]: req.body.roles,
              },
            },
          })
          .then((roles) => {
            d.setRoles(roles).then(() => {
              res.send({ message: "User registered successfully!" });
            });
          });
      } else {
        // user role = 1
        d.setRoles([1]).then(() => {
          res.send({ message: "User registered successfully!" });
        });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  user
    .scope("withPassword")
    .findOne({
      where: {
        username: req.body.username,
      },
    })
    .then((d) => {
      if (!d) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(req.body.password, d.password);

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }

      var token = jwt.sign({ id: d.id }, config.secret, {
        expiresIn: 86400, // 24 hours
      });

      var authorities = [];
      d.getRoles().then((roles) => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        res.status(200).send({
          id: d.id,
          username: d.username,
          email: d.email,
          roles: authorities,
          accessToken: token,
        });
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
