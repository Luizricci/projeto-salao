import userInfoController from "../controllers/userInfoController";
import { Router } from "express";
import verifyToken from "../config/auth";

const userInfoRoutes = Router();

userInfoRoutes.get("/", userInfoController.getAllUsersInfo);
userInfoRoutes.get("/:id", verifyToken,userInfoController.getUserInfoById);
userInfoRoutes.put("/:id", verifyToken, userInfoController.updateUserInfo);

export default userInfoRoutes;