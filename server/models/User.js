import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema({
  nombreCompleto:{
    type: String,
    required: false
  },
  email :{
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
    trim: true
  },
  intereses:{
    type: Array,
    required: false,
  },
  agendas: {
    type: Array,
    required: false,
  },
});


UserSchema.methods.comparePassword = async (password) => {
  return await bcrypt.compare(password, this.password);
}

export const UserModel = mongoose.model("User", UserSchema);
