const express = require('express');
const { Venda, Comanda } = require('../models');
const router = express.Router();

router.post('/checkout', async (req, res) => {
  try {
    const { mesa, total, metodo_pagamento } = req.body;
    const venda = await Venda.create({ mesa, total, metodo_pagamento });
    await Comanda.update({ status: 'paga' }, { where: { mesa } });
    res.status(201).json(venda);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
