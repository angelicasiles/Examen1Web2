
import { Router } from "express";
import VehiculoController from "../controller/VehiculoController";


const routes = Router();

//Para mostrar toda la información
routes.get("", VehiculoController.getAll);

//Para que determine que es paracmetro, ponemos los dos :
routes.get("/getById/:id", VehiculoController.getById);

//Para poder agregar un dato a la base de datos, desde el postman
routes.post("", VehiculoController.add);

//Para actualizar datos por medio del ID
routes.patch("/getById/:id", VehiculoController.update)

//Para eliminar datos por medio del ID
routes.delete("/getById/:id", VehiculoController.delete)

export default routes;