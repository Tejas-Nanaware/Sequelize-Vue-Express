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
      const userJSON = user.toJSON()
      res.send({
        user: userJSON,
        token: jwtSignUser(userJSON)
      })
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
      }
    }).then(user => {
      console.log(user)
      if (!user) {
        res.status(403).send({
          error: 'User not found'
        })
      }
      
      user.comparePassword(req.body.password, user)
      .then(isPasswordValid => {
        console.log('isPasswordValid', isPasswordValid)
        
        if (!isPasswordValid) {
          res.status(403).send({
            error: 'Invalid Password'
          })
        }
        const userJSON = user.toJSON()
        res.send({
          user: userJSON,
          token: jwtSignUser(userJSON)
        })
      })
      .catch(err => {
        res.status(500).send({
          error: 'Error while comparing passwords' + err
        })
      })
    }).catch(err => {
      res.status(400).send({
        error: 'Error while logging in' + err
      })
    })
  }
}