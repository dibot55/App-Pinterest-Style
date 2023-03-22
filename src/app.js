import express  from "express"; // express
const app = express();
import morgan from "morgan"; // Ver peticiones
import path from "path"; // __dirname Ruta Absoluta
import { create } from "express-handlebars"; // Template Engine
import multer from "multer"; // Almacenar imagenes
import indexRoutes from "./routes/index.routes"; // Rutas
import { v4 as uuidv4 } from "uuid"; // Modulo para ids unicos
import { format } from "timeago.js"; // Midleware para el time ago en la vista

// Views
app.set("views" ,path.join(__dirname, "views"));

// Template Engine Conf
app.engine(
  ".hbs",
  create({
    layoutsDir: path.join(app.get("views"), "layouts"),
    defaultLayout: "main",
    extname: ".hbs",
    partialsDir: path.join(app.get("views"), "partials"),
    helpers:{
      format: app.locals.format = format, // Formato de timeago.js
    }
  }).engine
);
// Usar el Template Engine
app.set("view engine", ".hbs");

// ---------------------- Middlwares -----------------------------

app.use(morgan('dev')); // Ver peticiones
app.use(express.urlencoded({ extended: false })); // Para que el servidor entienda los datos de los formularios
const storage = multer.diskStorage({ 
  destination: path.join(__dirname, "public/img/uploads"),
  filename: (req, file, callback, filename) => {
    callback(null, uuidv4() + path.extname(file.originalname)); // concatenamos una id unica con la extencion del nombre del archivo
  }
});
app.use(multer({ 
  // dest: path.join(__dirname, "public/img/uploads")
  storage: storage
}).single('image')); // Para que el servidor entienda las imgenes

// Rutas
app.use(indexRoutes);

// Archivos Estaticos
app.use(express.static(path.join(__dirname, "public")));

// Port
app.set('port', process.env.PORT || 3000);

// Export app
export default app;