const express = require('express');
const cors = require('cors');
const db = require('./database/connection');
const authRoutes = require('./routes/auth');
const cardapioRoutes = require('./routes/cardapio');
const comandaRoutes = require('./routes/comanda');
const pdvRoutes = require('./routes/pdv');
const estoqueRoutes = require('./routes/estoque');
const vendaRoutes = require('./routes/venda');
const relatorioRoutes = require('./routes/relatorio');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database sync
db.sequelize.sync().then(() => {
  console.log('Database synced');
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/cardapio', cardapioRoutes);
app.use('/api/comanda', comandaRoutes);
app.use('/api/pdv', pdvRoutes);
app.use('/api/estoque', estoqueRoutes);
app.use('/api/venda', vendaRoutes);
app.use('/api/relatorio', relatorioRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Café Rochedo API is running' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Café Rochedo API running on port ${PORT}`);
});
