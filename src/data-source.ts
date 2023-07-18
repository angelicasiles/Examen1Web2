import "reflect-metadata"
import { DataSource } from "typeorm"
import { Vehiculo } from "./entity/Vehiculo"
import { Tipo_Vehiculo } from "./entity/Tipo_Vehiculo"
import { Marca } from "./entity/Marca"
import { Color } from "./entity/Color"


/* El código crea una nueva instancia de la clase `DataSource` y la exporta como `AppDataSource`. La
clase `DataSource` se usa normalmente en TypeORM para conectarse a una base de datos y configurar
sus ajustes. */
export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "AngelicaS2004",
    database: "bdExamen",
    synchronize: false,
    logging: false,
    entities: [Vehiculo,Tipo_Vehiculo,Marca,Color],
    migrations: [],
    subscribers: [],
})
