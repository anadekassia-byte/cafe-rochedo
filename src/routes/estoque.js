const express = require('express');
const { Estoque, Cardapio } = require('../models');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const estoque = await Estoque.findAll({ include: [Cardapio] });
    res.json(estoque);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
