import pool from '../config/database';

const getAllServices = async () => {
    const result = await pool.query('SELECT * FROM services');
    return result.rows;
}
const getServiceById = async (id: number) => {
    const result = await pool.query('SELECT * FROM services WHERE id = $1', [id]);
    if (result.rows.length === 0) {
        throw new Error('Service not found');
    }
    return result.rows[0];
}
const createService = async (name: string, description: string, price: number) => {
    const result = await pool.query(
        'INSERT INTO services (name, description, price) VALUES ($1, $2, $3) RETURNING *',
        [name, description, price]
    );
    return result.rows[0];
}