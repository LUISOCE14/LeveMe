import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  nombreCompleto: String,
});

export const UserModel = mongoose.model("User", UserSchema);
