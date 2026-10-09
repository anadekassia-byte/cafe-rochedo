const express = require('express');
const { Venda } = require('../models');
const router = express.Router();

router.get('/vendas', async (req, res) => {
  try {
    const vendas = await Venda.findAll();
    const total = vendas.reduce((sum, v) => sum + parseFloat(v.total), 0);
    res.json({ vendas, total });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
