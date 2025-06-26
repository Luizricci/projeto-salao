import { Router } from "express";
import agendamentoController from "../controllers/agendamentoController";
import verifyToken from "../config/auth";

const agendamentoRoutes = Router();

agendamentoRoutes.get("/", verifyToken, agendamentoController.getAllAgendamentos);
agendamentoRoutes.get("/:id", verifyToken, agendamentoController.getAgendamentoById);
agendamentoRoutes.get("/profissional/:id", verifyToken, agendamentoController.getAgendamentoByProfissionalId);
agendamentoRoutes.post("/", verifyToken, agendamentoController.createAgendamento);
agendamentoRoutes.delete("/:id", verifyToken, agendamentoController.cancelarAgendamento);


export default agendamentoRoutes;