import servicosModel from "../models/servicosModel";
import { Request, Response } from "express";

const getAllServicos = async (req: Request, res: Response): Promise<void> => {
    try {
        const servicos = await servicosModel.getAllServices();
        if (!servicos || servicos.length === 0) {
            res.status(404).json({ message: "Nenhum serviço encontrado" });
            return;
        }
        res.status(200).json(servicos);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar todos os serviços" });
        console.error(error);
    }
};
const getServicoById = async (req: Request, res: Response) => {
    const servicoId = parseInt(req.params.id, 10);
    try {
        const servico = await servicosModel.getServiceById(servicoId);
        if (!servico) {
            res.status(404).json({ message: "Serviço não encontrado" });
            return;
        }
        res.status(200).json(servico);
    } catch (error) {
        res.status(404).json({ message: "Serviço não encontrado" });
        console.error(error);
    }
};
const createServico = async (req: Request, res: Response) => {
    const { nome, preco_cents, duracao_minutos }: { nome: string; preco_cents: number; duracao_minutos: number } = req.body;
    try {
        const newServico = await servicosModel.createService(nome, preco_cents, duracao_minutos);
        res.status(201).json(newServico);
    } catch (error) {
        res.status(500).json({ message: "Erro ao criar serviço" });
        console.error(error);
    }
};
const updateServico = async (req: Request, res: Response) => {
    const servicoId = parseInt(req.params.id, 10);
    const { nome, preco_cents, duracao_minutos }: { nome: string; preco_cents: number; duracao_minutos: number } = req.body;
    try {
        const updatedServico = await servicosModel.updateService(servicoId, nome, preco_cents, duracao_minutos);
        res.status(200).json(updatedServico);
    } catch (error) {
        res.status(404).json({ message: "Serviço não encontrado" });
        console.error(error);
    }
};
const deleteServico = async (req: Request, res: Response) => {
    const servicoId = parseInt(req.params.id, 10);
    try {
        const deletedServico = await servicosModel.deleteService(servicoId);
        res.status(200).json({ message: "Serviço deletado com sucesso" });
    } catch (error) {
        res.status(404).json({ message: "Serviço não encontrado" });
        console.error(error);
    }
};

export default { getAllServicos, getServicoById, createServico, updateServico, deleteServico };