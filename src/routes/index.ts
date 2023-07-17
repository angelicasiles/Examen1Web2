import { Router } from "express";

import Colors from "./Colors";
import Marcas from "./Marcas";
import Vehiculos from "./Vehiculos";
import Tipos_Vehiculos from "./Tipos_Vehiculos";






const routes = Router();

routes.use('/Color', Colors);

routes.use('/Marca', Marcas)

routes.use('Vehiculo', Vehiculos)

routes.use('TipoVehiculo', Tipos_Vehiculos)








export default routes;