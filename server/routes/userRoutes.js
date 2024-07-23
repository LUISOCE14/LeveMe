import { Router } from "express";
import { ObtenerDatosUsuario, actualizarFoto } from "../controllers/userContoller.js";

const router = Router();

router.get("/obtenerPerfilUsuario/:idUser", ObtenerDatosUsuario);
router.post("/actualizarFoto",actualizarFoto)

export default router;
