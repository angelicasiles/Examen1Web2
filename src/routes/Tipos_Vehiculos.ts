import { Router } from "express";
import Tipo_VehiculoController from "../controller/Tipo_VehiculoController";

const routes = Router();

//Para mostrar toda la información
routes.get("", Tipo_VehiculoController.getAll);

//Para que determine que es paracmetro, ponemos los dos :
routes.get("/getById/:id", Tipo_VehiculoController.getById);

//Para poder agregar un dato a la base de datos, desde el postman
routes.post("", Tipo_VehiculoController.add);

//Para actualizar datos por medio del ID
routes.patch("/getById/:id", Tipo_VehiculoController.update)

//Para eliminar datos por medio del ID
routes.delete("/getById/:id", Tipo_VehiculoController.delete)

export default routes;