import express from "express";

export const iniciarSesion = (req, res) => {
    res.send("Iniciando sesion");
};


export const cerrarSesion = (req, res) => {
    res.send("Cerrando sesion");
};

export const registrarUsuario = (req, res) => {
    res.send("Registrando usuario");
};
