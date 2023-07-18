
import { Router } from "express";
import VehiculoController from "../controller/VehiculoController";


const routes = Router();

//Para mostrar toda la información


//Para que determine que es paracmetro, ponemos los dos :
routes.get("/getById/:id", VehiculoController.getById);

//Para poder agregar un dato a la base de datos, desde el postman
routes.post("", VehiculoController.add);



//Para eliminar datos por medio del ID
routes.delete("/getById/:id", VehiculoController.delete)

export default routes;