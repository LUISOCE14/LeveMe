import { UserModel } from "../models/User.js";
import jwt from "jsonwebtoken";


export const iniciarSesion = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            res.status(404).json({ message: "Usuario no encontrado" });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            res.status(401).json({ message: "Contraseña incorrecta" });
        }
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "24h" });

        res.status(200).json({token });

    } catch (error) {
        res.status(500).json({ message: error.message });
    };
};

export const cerrarSesion = (req, res) => {
    res.send("Cerrando sesion");
};

export const registrarUsuario = (req, res) => {
    res.send("Registrando usuario");
};
