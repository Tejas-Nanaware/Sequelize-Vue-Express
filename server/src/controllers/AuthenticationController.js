const { models } = require('../sequelize')

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
  }
}