import pool from '../config/database';

const getAllServices = async () => {
    const result = await pool.query('SELECT * FROM servicos');
    return result.rows;
}
const getServiceById = async (id: number) => {
    const result = await pool.query('SELECT * FROM servicos WHERE id = $1', [id]);
    return result.rows[0];
}
const createService = async (nome: string, preco_cents: number, duracao_minutos: number) => {
    const result = await pool.query(
        'INSERT INTO servicos (nome, preco_cents, duracao_minutos) VALUES ($1, $2, $3) RETURNING *',
        [nome, preco_cents, duracao_minutos]
    );
    return result.rows[0];
}
const updateService = async (id: number, nome: string, preco_cents: number, duracao_minutos: number) => {
    const result = await pool.query(
        'UPDATE servicos SET nome = $1, preco_cents = $2, duracao_minutos = $3 WHERE id = $4 RETURNING *',
        [nome, preco_cents, duracao_minutos, id]
    );
    if (result.rows.length === 0) {
        throw new Error('Service not found');
    }
    return result.rows[0];
};
const deleteService = async (id: number) => {
    const result = await pool.query('DELETE FROM servicos WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
        throw new Error('Service not found');
    }
    return result.rows[0];
}

export default { getAllServices, getServiceById, createService, updateService, deleteService };
