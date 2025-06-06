import pool from '../config/database';
const bcrypt = require('bcryptjs');

const getAllUsers = async () => {
    const result = await pool.query('SELECT * FROM users');
    return result.rows;
}

const getUserById = async (id: number) => {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    if (result.rows.length === 0) {
        throw new Error('User not found');
    }
    return result.rows[0];
}
const createUser = async ( name: string, email: string, password:string ) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
        'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
        [name, email, hashedPassword]
    );
    return result.rows[0];
}
const updateUser = async (id: number, name: string, email: string, password: string) => {
    const result = await pool.query(
        'UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4 RETURNING *',
        [name, email, password, id]
    );
    if (result.rows.length === 0) {
        throw new Error('User not found');
    }
    return result.rows[0];
}
const deleteUser = async (id: number) => {
    const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
        throw new Error('User not found');
    }
    return result.rows[0];
}

export default { getAllUsers, getUserById, createUser, updateUser, deleteUser };