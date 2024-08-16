import mongoose from "mongoose";
import { PostModel } from "../models/post.js";
import jwt from "jsonwebtoken";
import validator from "validator";
import { UserModel } from "../models/User.js";
import { ComentarioModel } from "../models/comentario.js";
import { loadCensorWords, containsCensoredWords } from "../services/censorUtils.js";


export const agregarPost = async (req, res) => {
  try {
    // Cargar palabras censurables
    const words = loadCensorWords();
    
    const { idUser, descripcion } = req.body;
    if (!validator.isMongoId(idUser)) {
      return res.status(400).json({ msg: "ID de usuario inválido." });
    }

    const userExists = await UserModel.findById(idUser);
    if (!userExists) {
      return res.status(404).json({ msg: "El usuario no existe." });
    }

    if (!descripcion.trim()) {
      return res.status(400).json({ msg: "La descripción no puede estar vacía." });
    }

    // Verificar si la descripción contiene palabras censurables
    if (containsCensoredWords(descripcion, words)) {
      return res.status(400).json({ msg: "La descripción contiene palabras no permitidas." });
    }

    // Si llegamos aquí, la descripción es válida
    const newPost = new PostModel({
      idUsuario: idUser,
      descripcion: descripcion,
    });

    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error interno del servidor." });
  }
};

export const mostrarPost = async (req, res) => {
  try {
    // Obtener el ID del post de la solicitud
    const postId = req.params.idPost;
    // Buscar el post en la base de datos
    const post = await PostModel.findById(postId)
      .populate("comentarios")
      .exec();
    // Verificar si el post existe
    if (!post) {
      return res.status(404).json({ msg: "El post no existe." });
    }

    // Devolver los detalles del post
    res.status(200).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Hubo un error al procesar la solicitud." });
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
    res.status(500).json({ msg: "Hubo un error al procesar la solicitud." });
  }
};

export const agregarComentario = async (req, res) => {
  const { idPost, idUser, comentario } = req.body;

  try {
    // Cargar palabras censurables
    const words = loadCensorWords();

    if (!validator.isMongoId(idUser)) {
      return res.status(400).json({ msg: "ID de usuario inválido." });
    }
    if (!validator.isMongoId(idPost)) {
      return res.status(400).json({ msg: "ID de post inválido." });
    }
    if (!validator.isLength(comentario, { min: 1, max: 1000 })) {
      return res
        .status(400)
        .json({ msg: "El comentario debe tener entre 1 y 1000 caracteres." });
    }

    // Verificar si el comentario contiene palabras censurables
    if (containsCensoredWords(comentario, words)) {
      return res.status(400).json({ msg: "El comentario contiene palabras no permitidas." });
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

    const savedComentario = await newComentario.save();

    postExists.comentarios.push(savedComentario._id);
    await postExists.save();
    res.status(201).json({ msg: "Comentario agregado correctamente." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Hubo un error al agregar el comentario." });
  }
};