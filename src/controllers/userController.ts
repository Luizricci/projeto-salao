import userModel from "../models/userModel";
import { Request, Response } from "express";


const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await userModel.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar todos os Usuários" });
        console.error(error);
    }
}

const getUserById = async (req: Request, res: Response) => {
    const userId = parseInt(req.params.id, 10);
    try {
        const user = await userModel.getUserById(userId);
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: "Usuário não encontrado" });
        console.error(error);
    }
}

const createUser = async (req: Request, res: Response) => {
    const { name, email, password }: { name: string, email: string, password: string } = req.body;
    try {
        const newUser = await userModel.createUser(name, email, password);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: "Erro ao criar usuário" });
        console.error(error);
    }
}
const updateUser = async (req: Request, res: Response) => {
    const userId = parseInt(req.params.id, 10);
    const { name, email, password }: { name: string, email: string, password: string } = req.body;
    try {
        const updatedUser = await userModel.updateUser(userId, name, email, password);
        res.status(200).json(updatedUser);
    }
    catch (error) {
        res.status(404).json({ message: "Usuário não encontrado" });
        console.error(error);
    }
}
const deleteUser = async (req: Request, res: Response) => {
    const userId = parseInt(req.params.id, 10);
    try {
        const deletedUser = await userModel.deleteUser(userId);
        res.status(200).json({ message: "Usuário deletado com sucesso" });
    } catch (error) {
        res.status(404).json({ message: "Usuário não encontrado" });
        console.error(error);
    }
}
const alterarTipoUsuario = async (req: Request, res: Response): Promise<void> => {
    try {

        const idRaw = req.body.id;
        const novoTipo = req.body.novoTipo;
        const userLogado = req.user;


        const id = Number(idRaw);

        if (isNaN(id)) {
            res.status(400).json({ message: 'ID inválido.' });
            return;
        }

        if (userLogado?.tipo !== 'admin') {
            res.status(403).json({ message: 'Acesso negado. Apenas admin pode alterar o tipo.' });
            return;
        }

        if (!['cliente', 'profissional', 'admin'].includes(novoTipo)) {
            res.status(400).json({ message: 'Tipo inválido.' });
            return;
        }

        const usuarioAlterado = await userModel.alterarTipoUsuario(id, novoTipo);
        if (!usuarioAlterado) {
            res.status(404).json({ message: "Usuário não encontrado" });
            return;
        }

        res.status(200).json({ message: 'Tipo de usuário alterado com sucesso.' });
    } catch (error) {
        console.error('Erro ao alterar tipo:', error);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
};




export default { getAllUsers, getUserById, createUser, updateUser, deleteUser, alterarTipoUsuario };