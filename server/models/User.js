import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema({
  nombreCompleto:{
    type: String,
    required: false
  },
  edad:{
    type: Number,
    required: false,
  },
  email :{
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  avatar:{
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  intereses:[{
    type: String,
    required: true,
  }],
  agendas:[ {
    type: String,
    required: true,
  }],
  date: {
    type: Date,
    default: Date.now,
  },
});


UserSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export const UserModel = mongoose.model("User", UserSchema);
