const express = require('express');
const { Venda } = require('../models');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const vendas = await Venda.findAll();
    res.json(vendas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
