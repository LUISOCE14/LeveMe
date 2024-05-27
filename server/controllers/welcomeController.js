import express from "express";
import { UserModel } from "../models/User.js";


export const iniciarSesion =  async(req, res) => {
    try{
    const user = await UserModel.findOne({ nombreCompleto: "Luis Ocegueda"});
    res.status(200).json(user);
    }catch(error){
        res.status(500).json({message:error.message});
    }
};


export const cerrarSesion = (req, res) => {
    res.send("Cerrando sesion");
};

export const registrarUsuario = (req, res) => {
    res.send("Registrando usuario");
};
