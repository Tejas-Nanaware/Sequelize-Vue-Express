const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('users', {
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
    freezeTableName: true
  })
}