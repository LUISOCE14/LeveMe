import { Router } from "express";
import {
  obtenerAgendaUser,
  crearAgenda,
  actualizarAgenda,
  marcarComoRealizada,
  eliminarActividad,
} from "../controllers/agendaController.js";

const router = Router();

// Ruta de Agenda

router.get("/ObtenerAgendaUsuario/:idUser", obtenerAgendaUser);
router.put("/ActualizarAgenda/:idAgenda", actualizarAgenda);
router.post("/CrearAgenda", crearAgenda);
router.post("/MarcarComoRealizada/:idAgenda", marcarComoRealizada);
router.delete("/EliminarActividad/:idAgenda/:idActividad", eliminarActividad);
export default router;
