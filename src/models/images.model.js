// Modelo de los datos de las imagenes a guardar en mongodb
import { Schema, model } from "mongoose";

// Schema campos a guardar
// model son las tablas a guardar

const imgSchema = new Schema ({
  title: { type: String },
  description: { type: String },
  originalname: { type: String },
  filename: { type: String },
  mimetype: { type: String },
  size: { type: Number },
  path: { type: String }
},{
  timestamps: true, // created_at y updated_at
  versionKey: false // Para que mongoose no ponga __v: 0
});

// Query
export default model('image', imgSchema);