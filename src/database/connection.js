const { Sequelize } = require('sequelize');
const path = require('path');

// Always use SQLite for simplicity (both dev and production)
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '../../cafe_rochedo.db'),
  logging: false
});

module.exports = { sequelize };
