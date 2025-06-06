import pool from '../config/database';
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
import { Request, Response } from 'express';
require("dotenv").config();

const login = async (req: Request, res: Response) => {
    console.log('Requisição recebida:', req.body);
    const { email, password } = req.body;

    try {
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (result.rows.length === 0) {
            return res.status(400).json({ message: 'Usuário não encontrado' });
        }

        const user = result.rows[0];

        console.log('Usuário encontrado:', user);

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            return res.status(401).json({ message: 'Senha incorreta' });
        }

        const token = jwt.sign(
            { id: user.id, email: user.email, tipo: user.tipo },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        return res.status(200).json({ token });
    } catch (err) {
        console.error('Erro no login:', err);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
};

export default  login ;