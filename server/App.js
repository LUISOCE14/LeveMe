import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';



//Extraccion de las funciones de express y dotenv
const app = express();
dotenv.config();

console.log(process.env.PORT);


//configuracion del puerto en el que se va a correr el servidor
const port = process.env.PORT || 3000;  ;

//configuracion de express
app.use(cors());
// configuracion de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Error interno del servidor');
});



app.get("/",(req, res) => {
    res.send("Hola mundo");
});


app.get("/usuarios", async (req, res) => {

})




//configuracion del servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`	);
})