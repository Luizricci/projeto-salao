import pool from '../config/database';

const getAllUsersInfo = async () => {
    const result = await pool.query('SELECT * FROM user_info');
    return result.rows;
}

const getUserInfoById = async (id: number) => {
    const result = await pool.query('SELECT id, name, phone, address FROM user_info WHERE id = $1', [id]);
    if (result.rows.length === 0) {
        throw new Error('User not found');
    }
    return result.rows[0];
}

const updateUserInfo = async (id: number, name: string, phone: number, address: string) => {
    const result = await pool.query(
        'UPDATE user_info SET name = $1, phone = $2, address = $3 WHERE id = $4 RETURNING name, phone, address',
        [name, phone, address, id]
    );
    if (result.rows.length === 0) {
        throw new Error('User not found');
    }
    return result.rows[0];
};

export default { getUserInfoById, updateUserInfo, getAllUsersInfo };

