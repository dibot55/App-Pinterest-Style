import { Router } from "express"; // Enrutador de Express
const router = Router();
import imgSchema from "../models/images.model"; // Modelo de las imagenes
import { unlink } from "fs-extra"; // Para eliminar la imagen subida del servidor
import path from "path"; // Ruta absoluta

// Read
router.get('/', async (req, res) => {

  try {
    // Encuentre los datos de las imagenes en mongo
    const imagesFind = await imgSchema.find({}).lean();
    // Las renderiza en el DOM
    res.render("gallery", { imagesFind });

  } catch (error) {
    res.status(500).json({
      message: error.message || "A ocurrido un error mostrando las imagenes"
    });
  }
});

// Formulario
router.get('/upload', (req, res) => {
  res.render("index"); // Renderice las vistas
});

// Create
router.post('/upload', async (req, res) => {
  try {
    // Destructuración
    const { title, description } = req.body;
    const { originalname, filename, mimetype, size } = req.file;

    // Juntar los datos de req.body y req.file
    const newImage = new imgSchema({
      title,
      description,
      originalname,
      filename,
      mimetype,
      size,
      path: '/img/uploads/' + filename // NO es el path del req.file
    });
    // Guardar los datos de la imagen
    const imgSaved = await newImage.save();
    console.log(imgSaved);

    // Response
    res.redirect('/');

  } catch (error) {
    res.status(500).json({
      message: error.message || "Ocurrio un error al guardar la imagen"
    })
  }
});

// Perfil/info
router.get('/img/:id', async(req, res) => {
  try {
    // Destructuración
    const { id } = req.params;

    const imgFindId = await imgSchema.findById(id).lean(); // Aqui no hace falta poner el {} por que el metodo del schema retorna un objeto no un arreglo. En handlebars solo has referencia al nombre del objeto "imgFindId"
    res.render('info', { imgFindId });

  } catch (error) {
    res.status(500).json({
      message: error.message || "La imagen no existe"
    });
  }
})

// Delete mongo e imagenes de public
router.get('/img/:id/delete/', async (req, res) => {
  try {
    // Borrar datos de la imagen
    const imgDeleted = await imgSchema.findByIdAndDelete(req.params.id);
    res.redirect('/');

    // Borrar imagen del servidor
    await unlink(path.resolve('./src/public' + imgDeleted.path)); // path.resolve me regresa a mi raiz del proyecto y solo concateno la ruta de la carpeta public con la ruta de la imagen que ya esta almacenada en mongo

    } catch (error) {
    res.status(500).json({
    message: error.message || "A ocurrido un error al borrar la imagen"
  });
}
});

// Exportar las rutas
export default router;