import userInfoModel from "../models/userInfoModel";
import { Request, Response } from "express";

const getAllUsersInfo = async (req: Request, res: Response) => {
    try {
        const users = await userInfoModel.getAllUsersInfo();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar todos os usuários" });
        console.error(error);
    }
}

const getUserInfoById = async (req: Request, res: Response) => {
    const userId = parseInt(req.params.id, 10);
    try {
        const userInfo = await userInfoModel.getUserInfoById(userId);
        res.status(200).json(userInfo);
    } catch (error) {
        res.status(404).json({ message: "Informações do usuário não encontradas" });
        console.error(error);
    }
};

const updateUserInfo = async (req: Request, res: Response) => {
    const userId = parseInt(req.params.id, 10);
    const { name, phone, address }: { name: string; phone: number; address: string } = req.body;
    try {
        const updatedUserInfo = await userInfoModel.updateUserInfo(userId, name, phone, address);
        res.status(200).json(updatedUserInfo);
    } catch (error) {
        res.status(404).json({ message: "Informações do usuário não encontradas" });
        console.error(error);
    }
};



export default { getUserInfoById, updateUserInfo, getAllUsersInfo };