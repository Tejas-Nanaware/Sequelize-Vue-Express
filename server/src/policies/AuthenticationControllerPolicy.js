const Joi = require('joi')

module.exports = {
  register (req, res, next) {
    const schema = Joi.object({
      email: Joi.string().email(),
      password: Joi.string().regex(
        new RegExp('^[a-zA-Z0-9]{8,32}')
      )
    })
    console.log('trynna validate')
    const {error, value} = schema.validate(req.body)

    if (error) {
      console.log(error)
      // error
      switch (error.details[0].context.key) {
        case 'email':
          res.status(400).send({
            error: 'Need valid email address'
          })
          break
        case 'password':
          res.status(400).send({
            error: `Password must match the following rules:
              <br>
              1. It must contain only following characters: lower case and upper case alphabets and 0 to 9 numbers
              <br>
              2. It must be atleast 8 characters and not greater than 32 characters in length`
          })
          break
        default:
          res.status(400).send({
            error: 'Error validating while registration'
          })
          break
      }
    } else {
      console.log(value)
      next()
    }
  }
}