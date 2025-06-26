import pool from  '../config/database';

const getAllAgendamentos = async () => {
    const result = await pool.query('SELECT * FROM agendamento');
    return result.rows;
}
const getAgendamentoByClientId = async (clienteId: number) => {
    const result = await pool.query(
        `SELECT 
            agendamento.*,
            servicos.nome AS servico_nome,
            profissional.name AS profissional_nome
        FROM agendamento
        LEFT JOIN servicos ON agendamento.servico_id = servicos.id
        LEFT JOIN users AS profissional ON agendamento.profissional_id = profissional.id
        WHERE agendamento.cliente_id = $1`,
        [clienteId]
    );
    return result.rows;
}
const getAgendamentoByProfissionalId = async (profissionalId: number) => {
    const result = await pool.query(
        `SELECT 
            agendamento.*,
            servicos.nome AS servico_nome,
            cliente.name AS cliente_nome
        FROM agendamento
        LEFT JOIN servicos ON agendamento.servico_id = servicos.id
        LEFT JOIN users AS cliente ON agendamento.cliente_id = cliente.id
        WHERE agendamento.profissional_id = $1`,
        [profissionalId]
    );
    return result.rows;
}

const horariosPermitidos = [
  "09:00:00", "10:00:00", "11:00:00", "12:00:00",
  "13:00:00", "14:00:00", "15:00:00", "16:00:00",
  "17:00:00", "18:00:00", "19:00:00"
];


function isHorarioFuncionamento(data: Date, hora: string) {
    const diaSemana = data.getDay(); 
    if (diaSemana === 0) return false; 
    const [h, m, s] = hora.split(":").map(Number);
    const horaNum = h + (m / 60);
    return horaNum >= 9 && horaNum <= 19;
}

const createAgendamento = async ( data: Date, hora: string, cliente_id: number, servico_id: number, profissional_id: number) => {
    if (!horariosPermitidos.includes(hora) || !isHorarioFuncionamento(data, hora)) {
        throw new Error("Horário não permitido ou fora do horário de funcionamento");
    }

    const conflitoCliente = await pool.query(
        'SELECT 1 FROM agendamento WHERE data = $1 AND hora = $2 AND cliente_id = $3',
        [data, hora, cliente_id]
    );
    if (conflitoCliente.rows.length > 0) {
        throw new Error("Você já possui um agendamento neste horário");
    }

    const conflitoProfissional = await pool.query(
        'SELECT 1 FROM agendamento WHERE data = $1 AND hora = $2 AND profissional_id = $3',
        [data, hora, profissional_id]
    );
    if (conflitoProfissional.rows.length > 0) {
        throw new Error("Horário já ocupado para esse profissional");
    }

    const result = await pool.query(
        'INSERT INTO agendamento (data, hora, cliente_id, servico_id, profissional_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [data, hora, cliente_id, servico_id, profissional_id]
    );
    return result.rows[0];
};

const cancelarAgendamento = async (agendamentoId: number, clienteId: number) => {
    const result = await pool.query('DELETE FROM agendamento WHERE id = $1 AND cliente_id = $2 RETURNING *', [agendamentoId, clienteId]);
    if (result.rows.length === 0) {
        throw new Error("Agendamento não encontrado ou você não tem permissão para cancelá-lo");
    }
    const agendamento = result.rows[0];
};

export default {
    getAllAgendamentos,
    getAgendamentoByClientId,
    createAgendamento,
    cancelarAgendamento,
    getAgendamentoByProfissionalId
};