import { Router } from "express";

import { iniciarSesion, cerrarSesion, registrarUsuario } from "../controllers/welcomeController.js";

const router = Router();

router.get("/login", iniciarSesion);
router.get("/logout", cerrarSesion);
router.get("/register", registrarUsuario);

export default router;
