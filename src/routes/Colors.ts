import { Router } from "express";
import ColorController from "../controller/ColorController";


const routes = Router();

//Para mostrar toda la información
routes.get("", ColorController.getAll);

//Para que determine que es paracmetro, ponemos los dos :
routes.get("/getById/:id", ColorController.getById);

//Para poder agregar un dato a la base de datos, desde el postman
routes.post("", ColorController.add);

//Para actualizar datos por medio del ID
routes.patch("/getById/:id", ColorController.update)

//Para eliminar datos por medio del ID
routes.delete("/getById/:id", ColorController.delete)

export default routes;//Para exportar la ruta