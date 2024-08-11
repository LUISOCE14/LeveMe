import { Router } from 'express';


const router = Router();


// Ruta de Agenda

router.get("/Agendas",obtenerAgendas);
router.get("/Agendas/ObtenerAgendaUsuario/:idUser",obtenerAgendaUser);
router.put("/Agendas/ActualizarAgenda/:idAgenda",actualizarAgenda);
router.post("/Agendas/CrearAgenda",crearAgenda);
router.post("/Agendas/MarcarComoRealizada/:idAgenda",marcarComoRealizada);

export default router;