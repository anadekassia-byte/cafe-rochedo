const express = require('express');
const { Cardapio, Estoque } = require('../models');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const itens = await Cardapio.findAll({ include: [Estoque] });
    res.json(itens);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const item = await Cardapio.findByPk(req.params.id, { include: [Estoque] });
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { nome, categoria, preco, descricao } = req.body;
    const item = await Cardapio.create({ nome, categoria, preco, descricao });
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
