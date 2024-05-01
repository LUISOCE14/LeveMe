import  express  from "express";
import cors from 'cors'
import { intereses } from "./data/data.js";
import { Router } from "express";

const app = express();
const port = process.env.port || 3000

app.use(cors({
    origin: 'http://localhost:19006' // Reemplaza con la dirección de tu aplicación React Native
}));

app.get('/',(req,res)=>{
    res.send('Hola Mundo')
   
});

app.get('/api/intereses',(req,res) =>{
    res.send(intereses)
})


app.listen(port, ()=>{
   
    console.log("Server listening on port",port)
});
