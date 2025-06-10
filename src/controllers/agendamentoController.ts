import agendamentoModel from "../models/agendamentoModel";
import { Request, Response } from "express";

const getAllAgendamentos = async (req: Request, res: Response) => {
    try {
        const agendamentos = await agendamentoModel.getAllAgendamentos();
        res.status(200).json(agendamentos);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar agendamentos" });
    }
};

const getAgendamentoById = async (req: Request, res: Response): Promise<void> => {
    const clienteId = Number(req.params.id);
    if (isNaN(clienteId)) {
        res.status(400).json({ message: "ID inválido" });
        return ;
    }
    try {
        const agendamento = await agendamentoModel.getAgendamentoByClientId(clienteId);
        if (!agendamento) {
            res.status(404).json({ message: "Agendamento não encontrado" });
            return ;
        }
        res.status(200).json(agendamento);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar agendamento" });
    }
};

const createAgendamento = async (req: Request, res: Response) => {
    const { data, hora, cliente_id, servico_id, profissional_id } = req.body;
    try {
        const novoAgendamento = await agendamentoModel.createAgendamento(
            new Date(data),
            hora,
            cliente_id,
            servico_id,
            profissional_id
        );
        res.status(201).json(novoAgendamento);
    } catch (error: any) {
        res.status(400).json({ message: error.message || "Erro ao criar agendamento" });
    }
};

const cancelarAgendamento = async (req: Request, res: Response): Promise<void> => {
    const agendamentoId = Number(req.params.id);
    const clienteId = req.user?.id;
    try {
        if (isNaN(agendamentoId) || !clienteId) {
            res.status(400).json({ message: "ID inválido ou usuário não autenticado" });
            return ;
        }
        const agendamento = await agendamentoModel.cancelarAgendamento(agendamentoId, clienteId);
        res.status(200).json({ message: "Agendamento cancelado com sucesso" });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao cancelar agendamento" });
    }
};

export default {
    getAllAgendamentos,
    getAgendamentoById,
    createAgendamento,
    cancelarAgendamento
};