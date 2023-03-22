import "./config"; // variables de entorno
import app from "./app"; // Express
import "./database"; // mongodb


// Servidor
app.listen(app.get('port'), ()=>{
  console.log("Servidor escuchando en el puerto: ", app.get('port'));
})