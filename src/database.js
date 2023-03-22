// MongoDB conection
import mongoose from "mongoose"; // mongoose
import config from "./config"; // Variables de entorno

// Strict Query False
mongoose.set('strictQuery', { extends: false});

// Conexion String
(async() =>{

  try {
    
    const db = await mongoose.connect(config.mongo_uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Base de datos conectada en: ", db.connection.name);

  } catch (error) {
    console.error(error);
  }

}
)();