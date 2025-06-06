import servicosController from "../controllers/servicosController";
import { Router } from "express";
import router from "./authRoutes";

const servicosRoutes = Router();

servicosRoutes.get("/", servicosController.getAllServicos);
servicosRoutes.get("/:id", servicosController.getServicoById);
servicosRoutes.post("/", servicosController.createServico);
servicosRoutes.put("/:id", servicosController.updateServico);
servicosRoutes.delete("/:id", servicosController.deleteServico);

export default servicosRoutes;