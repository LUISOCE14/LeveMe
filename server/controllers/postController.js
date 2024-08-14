import mongoose from "mongoose";
import { PostModel } from "../models/post.js";
import jwt from "jsonwebtoken";
import validator from "validator";
import { UserModel } from "../models/User.js";
import { ComentarioModel} from "../models/comentario.js";

export const agregarPost = async (req, res) => {
    try {
        // Extraer el ID del usuario de la solicitud
        const userId = req.params.idUser;
        // Verificar si el usuario existe
        const userExists = await UserModel.findById(userId);
        if (!userExists) {
            return res.status(404).json({ msg: "El usuario no existe." });
        }

        // Crear el post con el ID del usuario especificado
        const newPost = new PostModel({
            idUsuario: userId,
            descripcion: req.body.descripcion, // Asumiendo que la descripción se envía en el cuerpo de la solicitud
            // Puedes agregar más campos según sea necesario
        });
        if (!validator.isLength(newPost.descripcion, { min: 1 })) {
            return res.status(400).json({ msg: "La descripción debe tener al menos 1 caracteres." });
        }
        // Guardar el post en la base de datos
        const savedPost = await newPost.save();
        res.status(201).json(savedPost); // Enviar el post guardado como respuesta

    } catch (error) {
        console.error(error);
        res.status(500).json({msg:'Hubo un error al procesar la solicitud.'});
    }
};

export const mostrarPost = async (req, res) => {
    try {
        // Obtener el ID del post de la solicitud
        const postId = req.params.idPost;
        // Buscar el post en la base de datos
        const post = await PostModel.findById(postId).populate("comentarios").exec();
        // Verificar si el post existe
        if (!post) {
            return res.status(404).json({ msg: "El post no existe." });
        }
        
        // Devolver los detalles del post
        res.status(200).json(post);

    } catch (error) {
        console.error(error);
        res.status(500).json({msg:'Hubo un error al procesar la solicitud.'});
    }
};

export const mostrarTodosLosPosts = async (req, res) => {
    try {
        // Buscar todos los posts en la base de datos
        const posts = await PostModel.find().select("-comentarios");

        // Verificar si hay posts
        if (posts.length === 0) {
            return res.status(200).json({ msg: "No hay posts.", data: [] });
        }

        // Devolver todos los posts
        res.status(200).json(posts);

    } catch (error) {
        console.error(error);
        res.status(500).json({msg:'Hubo un error al procesar la solicitud.'});
    }
};

export const agregarComentario = async (req, res) => {
    const { idPost, idUser, comentario } = req.body;

    try {
        if (!validator.isMongoId(idUser)) {
            return res.status(400).json({ msg: "ID de usuario inválido." });
        }
        if (!validator.isMongoId(idPost)) {
            return res.status(400).json({ msg: "ID de post inválido." });
        }
        if (!validator.isLength(comentario, { min: 1, max: 1000 })) {
            return res.status(400).json({ msg: "El comentario debe tener entre 1 y 1000 caracteres." });
        }
        // Verificar si el post y el usuario existen
        const postExists = await PostModel.findById(idPost);
        if (!postExists) {
            return res.status(404).json({ msg: "El post no existe." });
        }
        const userExists = await UserModel.findById(idUser);
        if (!userExists) {
            return res.status(404).json({ msg: "El usuario no existe." });
        }
        const newComentario = new ComentarioModel({
            idPost,
            idUsuario: idUser,
            contenido: comentario,
        });
        if (!validator.isLength(newComentario.contenido, { min: 1 })) {
            return res.status(400).json({ msg: "El comentario debe tener al menos 1 caracteres." });
        }
        const savedComentario = await newComentario.save();

        postExists.comentarios.push(savedComentario._id);
        await postExists.save();
        res.status(201).json({ msg: "Comentario agregado correctamente."});

        
    }catch (error) {
            console.error(error);
            return res.status(500).json({ msg: "Hubo un error al buscar el post." });
        }
        
};
