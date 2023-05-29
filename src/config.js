// Variables de entorno
import { config } from "dotenv";

config();

export default {
  port: process.env.PORT,
  mongo_uri: process.env.MONGO_URI || "mongodb://127.0.0.1:27017/pinter?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.8.2"
}