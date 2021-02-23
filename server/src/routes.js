module.exports = (app) => {
    app.post('/register', (req, res) => {
        res.send({
          message: `User ${req.body.email} was registered`
        })
      })
}