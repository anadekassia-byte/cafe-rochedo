const express = require('express');
const { Comanda, ComandaItem, Cardapio } = require('../models');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const comandas = await Comanda.findAll({ include: [{ model: ComandaItem, include: [Cardapio] }] });
    res.json(comandas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { mesa } = req.body;
    const comanda = await Comanda.create({ mesa });
    res.status(201).json(comanda);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/:comanda_id/itens', async (req, res) => {
  try {
    const { cardapio_id, quantidade } = req.body;
    const cardapio = await Cardapio.findByPk(cardapio_id);
    const item = await ComandaItem.create({
      comanda_id: req.params.comanda_id,
      cardapio_id,
      quantidade,
      preco_unitario: cardapio.preco
    });
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
