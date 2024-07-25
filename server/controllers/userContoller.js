import { UserModel } from "../models/User.js";
import dotenv from "dotenv";
import validator from "validator";
import { InteresModel } from "../models/Intereses.js";

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


export const obtenerIntereses = async (req,res) =>{
  
  const  idUser  = req.params.idUser;

  try {
    // Busca el usuario por ID
    //const user = await UserModel.findById(idUser);
    const usuarioConIntereses = await UserModel.findById(idUser)
  .populate('intereses')
  .exec();

    if (typeof idUser !== "string" || !validator.isMongoId(idUser)) {
      return res.status(400).json({ message: "ID de usuario inválido." });
    }
    
    if (!usuarioConIntereses) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    // Devuelve los intereses del usuario
    return res.json({ intereses: usuarioConIntereses.intereses });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
}

export const obtenerTodosLosIntereses = async (req,res) =>{

  const intereses = await InteresModel.find();

  console.log(intereses)
}

export const actualizarIntereses = async (req, res) => {
  const { idUser, intereses } = req.body;

  try {
    // Verificar si el ID del usuario es válido
    if (typeof idUser !== "string" || !validator.isMongoId(idUser)) {
      return res.status(400).json({ message: "ID de usuario inválido." });
    }

    // Buscar al usuario por ID
    const user = await UserModel.findByIdAndUpdate(idUser, { intereses }, { new: true });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    console.log(user)

    res.status(200).json({ message: "Intereses actualizados exitosamente." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
}


export const agregarIntereses = async (req, res) => {
  const { idUsuario, interesesIds } = req.body;

  try {
    const existingIntereses = await UserModel.findById(idUsuario).select('intereses');
    console.log(existingIntereses);
    if (!existingIntereses) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    let interesesYaExisten = [];
    for (let interesId of interesesIds) {
      const indice = existingIntereses.intereses.indexOf(interesId);
      if (indice > -1) {
        interesesYaExisten.push(interesId); // Agrega el ID del interés que ya existe
      }
    }

    if (interesesYaExisten.length === 0) {
      // Si no hay intereses duplicados, procede a agregar los nuevos intereses
    const updatedUser = await UserModel.agregarIntereses(idUsuario, interesesIds);
      return res.json({ message: "Intereses agregados exitosamente.", intereses: updatedUser.intereses });
    } else {
      // Si hay intereses duplicados, envía un mensaje indicando cuáles son
      return res.status(409).json({ message: "Algunos intereses ya están asociados con el usuario.", interesesDuplicados: interesesYaExisten });
    }
  } 
  catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
};

export const eliminarIntereses = async (req, res) => {

  const { idUsuario, idInteres } = req.body;

  try {
    
    if (typeof idUsuario !== "string" || !validator.isMongoId(idUsuario)) {
      return res.status(400).json({ message: "ID de usuario inválido." });
      }

    // Verifica si idInteres es una cadena vacía además de verificar que no sea nulo o 'undefined'
    if (typeof idInteres !== "string" || !validator.isMongoId(idInteres)) {
      return res.status(400).json({ message: "ID de interés inválido." });
    }

    const user = await UserModel.findByIdAndUpdate(
      idUsuario,
      { $pull: { intereses: idInteres } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "Usuario o interés no encontrado." });
    }

    res.status(200).json({ message: "Interés eliminado exitosamente." });

  } catch (error) {
    
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor." });

  }
}
