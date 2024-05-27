import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import welcomeRoutes from './routes/welcomeRoutes.js';
import bodyParser from 'body-parser';
import { connectDB } from './config/db.js';


//Extraccion de las funciones de express y dotenv
const app = express();
dotenv.config();

console.log(process.env.PORT);


//configuracion del puerto en el que se va a correr el servidor
const port = process.env.PORT || 3000;
const mongo_uri = process.env.MONGO_URI;

//configuracion de express
app.use(cors());
app.use(express.json());


//configuracion de rutas

app.use('/api/welcome', welcomeRoutes);

app.get('/', (req, res) => {
   res.send('Bienvenido a la API');
});




// configuracion de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Error interno del servidor');
});

//configuracion del servidor
const start = async() =>{
    try{
        await connectDB(mongo_uri);
        console.log('Conexion a la base de datos establecida');
        app.listen(port, () => {
            console.log(`Servidor corriendo en http://localhost:${port}`);
        });
    }catch(error){
       console.log(error);
    }
}

start();