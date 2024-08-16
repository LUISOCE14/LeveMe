import { Router } from "express";
import { agregarPost, mostrarPost, mostrarTodosLosPosts, agregarComentario} from "../controllers/postController.js";


const router = Router();

router.post("/AgregarPost", agregarPost);
router.get("/MostrarPost/:idPost", mostrarPost);
router.get("/MostrarTodosLosPosts", mostrarTodosLosPosts);
router.post("/AgregarComentario", agregarComentario);

export default router;