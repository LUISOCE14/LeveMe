import { Router } from "express";
import loginController from "./controllers/loginController";

const router = Router();

router.post("/login", iniciarSesion );





module.exports = router;