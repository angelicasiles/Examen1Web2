import { Router } from "express";
import MarcaController from "../controller/MarcaController";



const routes = Router(); //Se crea la variable de rutas

//Para mostrar toda la información
routes.get("", MarcaController.getAll);

//Para que determine que es paracmetro, ponemos los dos :
routes.get("/getById/:id", MarcaController.getById);

//Para poder agregar un dato a la base de datos, desde el postman
routes.post("", MarcaController.add);

//Para actualizar datos por medio del ID
routes.patch("/getById/:id", MarcaController.update)

//Para eliminar datos por medio del ID
routes.delete("/getById/:id", MarcaController.delete)

export default routes; //Exportar la ruta para que otros puedan acceder