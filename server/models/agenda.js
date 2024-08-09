import mongoose from "mongoose";

const agendaSchema = new mongoose.Schema({
  actividades: [
    {
      actividad: String,
      completada: Boolean,
      required: true,
    }
  ]
});

export const AgendaModel = mongoose.model("Agenda", agendaSchema);

