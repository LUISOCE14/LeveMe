import mongoose from "mongoose";


const PogresoSchema = new mongoose.Schema({
    idUsuario:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    idAgenda:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Agenda",
        required: true,
    },
    date:{
        type: Date,
        required: true,
    },
    actividadesTotal:{
        type: Number,
        required: true,
    },
    actividadesCompletadas:{
        type: Number,
        required: true,
    },
    todasCompletadas:{
        type: Boolean,
        required: true,
    },
});

export default ProgresoModel =  mongoose.model("Progreso", PogresoSchema);