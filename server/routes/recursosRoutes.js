import { Router } from "express";
import { agregarRecursos, obtenerRecursos, obtenerRecursosPorTag } from "../controllers/recursosController.js";

const router = Router();

router.put("/AgregarRecursos/:idRecursos", agregarRecursos);
router.get("/ObtenerRecursos/", obtenerRecursos);
router.get("/ObtenerRecursosPorTag", obtenerRecursosPorTag);

export default router;
