import * as express from "express"
import * as bodyParser from "body-parser"
import { Request, Response } from "express"
import { AppDataSource } from "./data-source"
import routes from "./routes"
import cors = require ("cors")
import helmet from "helmet"


/* La línea `const port = process.env.port || 3000;` está configurando el valor de la variable `port`.
Está comprobando si existe la variable de entorno `process.env.port` y, si existe, asigna su valor a
`port`. Si la variable de entorno `process.env.port` no existe o no está configurada, asigna el
valor `3000` a `port`. Esto permite que la aplicación use el puerto especificado si se proporciona
como una variable de entorno, o recurra al uso del puerto '3000' si no se proporciona. */
const port = process.env.port || 3000;

AppDataSource.initialize().then(async () => {

    // create express app
    const app = express()
    /* `app.use(cors())` habilita el uso compartido de recursos de origen cruzado (CORS) para la
    aplicación Express. CORS es un mecanismo que permite que los recursos (por ejemplo, fuentes,
    JavaScript, etc.) en una página web se soliciten desde otro dominio fuera del dominio desde el
    que se originó el recurso. */
    app.use(cors());
    app.use(helmet());
    app.use(express.json());
  
  
   //Rutas 
   app.use('/', routes);

   

   /* `app.listen(port,()=>{console.log(`Servidor ejecutando en puerto: `)});` está iniciando el
   servidor y escuchando las solicitudes entrantes en el puerto especificado. Una vez que el
   servidor se está ejecutando, registrará un mensaje en la consola que indica que el servidor se
   está ejecutando y escuchando en el puerto especificado. */
   app.listen(port,()=>{console.log(`Servidor corriendo en puerto: ${port}`)});

}).catch(error => console.log(error))
