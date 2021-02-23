const { models } = require('../sequelize')
const { Op } = require('sequelize')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

const jwtSignUser = (user) => {
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: config.authentication.jwtExpiresIn
  })
}

module.exports = {
  async register (req, res) {
    try {
      const user = await models.users.create({
        Email: req.body.email,
        Password: req.body.password,
        CreatedAt: Date.now(),
        UpdatedAt: Date.now()
      })
      res.send(user.toJSON())
    } catch (err) {
      res.status(400).send({
        error: 'Error while registering' + err
      })
    }
  },
  async login (req, res) {
    await models.users.findOne({
      where: {
        Email: {
          [Op.eq]: req.body.email
        },
        password: {
          [Op.eq]: req.body.password
        }
      }
    }).then(user => {
      console.log(user)
      if (!user) {
        res.status(403).send({
          error: 'Credentials not found'
        })
      }
      const userJSON = user.toJSON()
      res.send({
        user: userJSON,
        token: jwtSignUser(userJSON)
      })
    }).catch(err => {
      res.status(400).send({
        error: 'Error while logging in' + err
      })
    })
  }
}