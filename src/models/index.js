const { sequelize } = require('../database/connection');
const { DataTypes } = require('sequelize');

// User Model
const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM('admin', 'garcom', 'cozinha', 'pdv'),
    defaultValue: 'garcom'
  }
});

// Cardápio Model
const Cardapio = sequelize.define('Cardapio', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  categoria: {
    type: DataTypes.STRING,
    allowNull: false
  },
  preco: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  descricao: DataTypes.TEXT,
  disponivel: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
});

// Comanda Model
const Comanda = sequelize.define('Comanda', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  mesa: {
    type: DataTypes.STRING,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('aberta', 'fechada', 'paga'),
    defaultValue: 'aberta'
  },
  total: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0
  }
});

// Comanda Items
const ComandaItem = sequelize.define('ComandaItem', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  quantidade: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  },
  preco_unitario: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  }
});

// Estoque Model
const Estoque = sequelize.define('Estoque', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  quantidade: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
});

// Venda Model
const Venda = sequelize.define('Venda', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  mesa: {
    type: DataTypes.STRING,
    allowNull: false
  },
  total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  metodo_pagamento: {
    type: DataTypes.ENUM('dinheiro', 'cartao', 'pix'),
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('concluida', 'cancelada'),
    defaultValue: 'concluida'
  }
});

// Associações
Comanda.hasMany(ComandaItem, { foreignKey: 'comanda_id' });
ComandaItem.belongsTo(Comanda, { foreignKey: 'comanda_id' });
ComandaItem.belongsTo(Cardapio, { foreignKey: 'cardapio_id' });

Cardapio.hasOne(Estoque, { foreignKey: 'cardapio_id' });
Estoque.belongsTo(Cardapio, { foreignKey: 'cardapio_id' });

module.exports = {
  User,
  Cardapio,
  Comanda,
  ComandaItem,
  Estoque,
  Venda
};
