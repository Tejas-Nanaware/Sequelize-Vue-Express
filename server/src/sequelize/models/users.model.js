const { DataTypes } = require('sequelize')
const Promise = require('bluebird')
// const { db } = require('../../config/config')
const bcrypt = Promise.promisifyAll(require('bcrypt'))

const hashPassword = async (user) => {
  const SALT_FACTOR = 10
  const salt = await bcrypt.genSalt(SALT_FACTOR)
  const hash = await bcrypt.hash(user.dataValues.Password, salt)
  user.setDataValue('PasswordSalt', salt)
  user.setDataValue('Password', hash)
}

module.exports = (sequelize) => {
  const User = sequelize.define('users', {
    ID: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    Email: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true
    },
    Password: {
      type: DataTypes.STRING
    },
    PasswordSalt: {
      type: DataTypes.STRING
    },
    CreatedAt: {
      allowNull: false,
      type: DataTypes.DATE(6)
    },
    UpdatedAt: {
      allowNull: false,
      type: DataTypes.DATE(6)
    }
  },
  {
    hooks: {
      beforeCreate: hashPassword,
      beforeUpdate: hashPassword
    }
  },
  {
    freezeTableName: true
  })

  User.prototype.comparePassword = async (password, user) => {
    const hash = await bcrypt.hash(password, user.dataValues.PasswordSalt)
    // const result = await bcrypt.compare(hash, user.dataValues.Password)
    // console.log('result', result)
    // return result
    if (hash === user.dataValues.Password) {
      return true
    } else {
      return false
    }
  }

  return User
}