const { sequelize } = require('./src/database/connection');
const { User, Cardapio } = require('./src/models');
const bcryptjs = require('bcryptjs');

async function initDB() {
  try {
    await sequelize.sync({ force: true });
    
    // Criar usuário admin
    await User.create({
      username: 'admin',
      password: bcryptjs.hashSync('admin123', 8),
      role: 'admin'
    });
    
    // Menu items
    const items = [
      { nome: 'Espresso', categoria: 'Bebidas', preco: 5.00 },
      { nome: 'Cappuccino', categoria: 'Bebidas', preco: 8.00 },
      { nome: 'Pão de Queijo', categoria: 'Salgados', preco: 6.00 },
      { nome: 'Croissant', categoria: 'Doces', preco: 7.00 },
      { nome: 'Bolo de Chocolate', categoria: 'Doces', preco: 5.50 },
    ];
    
    for (const item of items) {
      await Cardapio.create(item);
    }
    
    console.log('Database initialized successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  }
}

initDB();
