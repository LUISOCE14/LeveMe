import mongoose from "mongoose";
import { AgendaModel } from "../models/agenda.js";
import jwt from "jsonwebtoken";
import validator from "validator"; // Asegúrate de tener 'validator' instalado
import { UserModel } from "../models/User.js";

export const obtenerAgendaUser = async (req, res) => {
  try {
    const idUser = req.params.idUser; // Obtener el ID del usuario desde los parámetros de la ruta
    
    //const authHeader = req.headers["authorization"];
    //const token = authHeader && authHeader.split(" ")[1];

    /*if (!token) {
        return res
          .status(401)
          .json({ msg: "Token de acceso no proporcionado." });
      }*/

    // Enviar las agendas activas como respuesta

    if (typeof idUser !== "string" || !validator.isMongoId(idUser)) {
      return res.status(400).json({ msg: "ID de usuario inválido." });
    }
    // Buscar todas las agendas del usuario que no están cerradas
    const agendasActivas = await AgendaModel.find({
      idUsuario: idUser,
      isClosed: false,
    });
    
    
    res.json(agendasActivas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al obtener la agenda del usuario." });
  }
};

export const crearAgenda = async (req, res) => {
  try {
    const actividades = req.body.actividades;
    const idUser = req.body.idUser;
    //const authHeader = req.headers["authorization"];
    //const token = authHeader && authHeader.split(" ")[1];

    /*if (!token) {
        return res
          .status(401)
          .json({ msg: "Token de acceso no proporcionado." });
      }*/

    if (typeof idUser !== "string" || !validator.isMongoId(idUser)) {
      return res.status(400).json({ msg: "ID de usuario inválido." });
    }
    const userExists = await UserModel.findById(idUser); // Asegúrate de que User es tu modelo de usuario
    if (!userExists)
      return res.status(404).send({ msg: "Usuario no encontrado" });

    // Aquí asumimos que tienes un middleware que valida el token y añade información del usuario a req.user
    // Si no es así, deberás implementar la lógica para validar el token y encontrar al usuario correspondiente

    // Crear la nueva agenda con los datos de la solicitud
    const newAgenda = new AgendaModel({
      idUsuario: idUser,
      actividades: actividades, // Asumiendo que las actividades vienen en el cuerpo de la solicitud
    });

    // Guardar la nueva agenda en la base de datos
    await newAgenda.save();

    res.status(201).json(newAgenda);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error inesperado." });
  }
};

export const actualizarAgenda = async (req, res) => {
  try {
    const idUser = req.body.idUser; // ID del usuario enviado en el cuerpo de la solicitud
    const nuevasActividades = req.body.nuevasActividades; // Nuevas actividades a agregar

    // Verificar si el ID del usuario está presente
    if (!idUser) {
      return res.status(400).json({ msg: "El ID del usuario es requerido." });
    }

    // Buscar la última agenda activa del usuario
    const ultimaAgendaActiva = await AgendaModel.findOne({
      idUsuario: idUser,
      isClosed: false,
    }).sort({ create_at: -1 }); // Ordenar por fecha de creación en orden descendente para obtener la más reciente

    if (!ultimaAgendaActiva) {
      return res
        .status(404)
        .json({
          msg: "No se encontró ninguna agenda activa para el usuario especificado.",
        });
    }

    // Eliminar todas las actividades de la agenda
    //ultimaAgendaActiva.actividades = [];

    // Agregar las nuevas actividades
    ultimaAgendaActiva.actividades.push(...nuevasActividades);

    // Guardar la agenda actualizada en la base de datos
    await ultimaAgendaActiva.save();

    // Enviar la agenda actualizada como respuesta
    res.status(200).json(ultimaAgendaActiva);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al actualizar la agenda." });
  }
};

export const marcarComoRealizada = async (req, res) => {
  try {
    const { idAgenda, nombreActividad } = req.body;

    // Validar que se hayan proporcionado ambos valores
    if (!idAgenda || !nombreActividad) {
      return res.status(400).json({ msg: "Se requiere el ID de la agenda y el nombre de la actividad." });
    }

    // Buscar la agenda por su ID
    const agenda = await AgendaModel.findById(idAgenda);

    if (!agenda) {
      return res.status(404).json({ msg: "La agenda especificada no fue encontrada." });
    }

    // Iterar sobre las actividades de la agenda
    const actividadEncontrada = agenda.actividades.find(actividad => actividad.actividad === nombreActividad);

    if (!actividadEncontrada) {
      return res.status(404).json({ msg: "La actividad especificada no fue encontrada en la agenda." });
    }

    // Marcar la actividad como realizada
    actividadEncontrada.completada = true;

    // Guardar la agenda actualizada en la base de datos
    await agenda.save();

    // Enviar la agenda actualizada como respuesta
    res.status(200).json(agenda);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al marcar la actividad como realizada." });
  }
};

export const eliminarActividad = async (req, res) => {
  try {
    const { idAgenda, idActividad } = req.params;
    
    if (typeof idAgenda !== "string" || !validator.isMongoId(idAgenda)) {
      return res.status(400).json({ msg: "ID de agenda inválido." });
    }
    // Verificar si se han proporcionado ambos IDs
    if (!idAgenda || !idActividad) {
      return res.status(400).json({ msg: "Se requieren los IDs de la agenda y la actividad." });
    }

    // Buscar la agenda por su ID
    const agenda = await AgendaModel.findById(idAgenda);

    if (!agenda) {
      return res.status(404).json({ msg: "La agenda especificada no fue encontrada." });
    }

    // Filtrar y eliminar la actividad específica de la agenda
    const index = agenda.actividades.findIndex(actividad => actividad._id.equals(idActividad));
    if (index === -1) {
      return res.status(404).json({ msg: "La actividad especificada no fue encontrada en la agenda." });
    }
    agenda.actividades.splice(index, 1);

    // Guardar la agenda actualizada en la base de datos
    await agenda.save();

    // Enviar la agenda actualizada como respuesta
    res.status(200).json(agenda);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al eliminar la actividad de la agenda." });
  }
};