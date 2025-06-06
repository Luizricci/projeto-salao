import userController from "../controllers/userController";
import { Router } from "express";
import verifyToken from "../config/auth";

const userRoutes = Router();

userRoutes.get("/", userController.getAllUsers);
userRoutes.get("/:id", verifyToken, userController.getUserById);
userRoutes.post("/", userController.createUser);
userRoutes.put("/alterar-tipo", verifyToken, userController.alterarTipoUsuario);
userRoutes.put("/:id", userController.updateUser);
userRoutes.delete("/:id", userController.deleteUser);

export default userRoutes;
