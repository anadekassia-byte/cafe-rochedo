const express = require('express');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const { User } = require('../models');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'cafe-rochedo-secret-key';

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });

    if (!user || !bcryptjs.compareSync(password, user.password)) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({ token, user: { id: user.id, username: user.username, role: user.role } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/register', async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 8);

    const user = await User.create({
      username,
      password: hashedPassword,
      role: role || 'garcom'
    });

    res.status(201).json({ message: 'Usuário criado com sucesso', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
