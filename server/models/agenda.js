import mongoose from "mongoose";

const agendaSchema = new mongoose.Schema({
  idUsuario:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  actividades: [
    {
      actividad: String,
      completada: Boolean,
      required: true,
    }
  ],
  create_at:{
    type: Date,
    default: Date.now,
  },
  isClosed:{
    type: Boolean,
    default: false,
  }
});

export const AgendaModel = mongoose.model("Agenda", agendaSchema);

