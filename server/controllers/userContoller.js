import { UserModel } from "../models/User.js";
import dotenv from "dotenv";
import validator from "validator";

dotenv.config({
  path: "../.env",
});

export const ObtenerDatosUsuario = async (req, res) => {
  try {
    const  idUser  = req.params.idUser;
    
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // Extrae el token del encabezado Authorization


    if (!token) {
      return res
        .status(401)
        .json({ message: "Token de acceso no proporcionado." });
    }
        

    // Verifica si idUser es una cadena vacía además de verificar que no sea nulo o 'undefined'
    if (typeof idUser !== "string" || !validator.isMongoId(idUser)) {
      return res.status(400).json({ message: "ID de usuario inválido." });
    }
    // Aquí asumimos que tienes una función para buscar al usuario por ID en tu modelo de usuarios.
    // Debes reemplazar esta parte con la lógica real de búsqueda en tu base de datos.
    const user = await UserModel.findById(idUser).select("-password");

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }
    res.json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
};




export const actualizarFoto = async (req,res) =>{
    const {id, avatar} = req.body;
    console.log("si me esta enviando")
    try {
      if (typeof id !== "string" || !validator.isMongoId(id)) {
        return res.status(400).json({ message: "ID de usuario inválido." });
      }
      if (!validator.isURL(avatar)) {
        return res.status(400).json({ message: "Debes proporcionar la url de la imagen." });
      }
      const user = await UserModel.findByIdAndUpdate(id, { avatar }, { new: true });

      if (!user) {
        return res.status(404).json({ message: "No se puedo actualizar la foto de perfil." });
      }else{
        res.status(200).json({ message: "Foto de perfil fue actualizada correctamente." });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error interno del servidor." });
    }
} 
