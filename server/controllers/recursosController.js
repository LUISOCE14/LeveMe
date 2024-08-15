import mongoose from "mongoose";
import { RecursoModel } from "../models/recursos.js";
import jwt from "jsonwebtoken";
import validator from "validator";

export const agregarRecursos = async (req, res) => {
    try {
        
        // Extraer los datos del cuerpo de la solicitud
        const { titulo, descripcion, tag, url } = req.body;

        // Crear un nuevo recurso con los datos recibidos
        const nuevoRecurso = new RecursoModel({
            titulo,
            descripcion,
            tag,
            url
        });
        
        // Guardar el nuevo recurso en la base de datos
        await nuevoRecurso.save();

        // Enviar respuesta indicando éxito
        res.status(201).json({ msg: "Recurso agregado exitosamente"});
    } catch (error) {
        console.error(error);
        res.status(500).json({msg:"Error interno del servidor"});
    }
};

export const obtenerRecursos = async (req, res) => {
    try {
        // Buscar todos los recursos en la base de datos
        const recursos = await RecursoModel.find();

        // Enviar respuesta con los recursos encontrados
        res.status(200).json({ msg: "Recursos obtenidos exitosamente", data: recursos });
    } catch (error) {
        console.error(error);
        res.status(500).json({msg:"Error interno del servidor"});
    }
};

export const obtenerRecursosPorTag = async (req, res) => {
    try {
        // Obtener el tag del query params
        const { tag } = req.query;
        if (!validator.isAlpha(tag)) {
            return res.status(400).json({ msg: "El tag debe contener solo letras." });
        }
        // Construir la consulta basada en el tag proporcionado
        let query = {};
        if (tag) {
            query.tag = tag;
        }

        // Buscar recursos que coincidan con el tag especificado
        const recursosFiltrados = await RecursoModel.find(query);
        if (recursosFiltrados.length === 0) {
            return res.status(404).json({ msg: "No hay recursos con el tag buscado." });
        }
        // Enviar respuesta con los recursos encontrados
        res.status(200).json({ msg: "Recursos obtenidos exitosamente", data: recursosFiltrados });
    } catch (error) {
        console.error(error);
        res.status(500).json({msg:"Error interno del servidor"});
    }
};