import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import welcomeRoutes from './routes/welcomeRoutes.js';
import bodyParser from 'body-parser';



//Extraccion de las funciones de express y dotenv
const app = express();
dotenv.config();

console.log(process.env.PORT);


//configuracion del puerto en el que se va a correr el servidor
const port = process.env.PORT || 3000;  ;

//configuracion de express
app.use(cors());
app.use(bodyParser.json());


//configuracion de rutas

app.use('/api/welcome', welcomeRoutes);

app.get('/', (req, res) => {
  res.send('Hola mundo');
});


// configuracion de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Error interno del servidor');
});



//configuracion del servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`	);
})