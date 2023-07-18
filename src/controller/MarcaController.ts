import { Request, Response } from "express"
import { AppDataSource } from "../data-source";
import { Marca } from "../entity/Marca";

class  MarcaController{

    static getAll = async (req: Request, resp: Response) => {

        //Parte de la controladora para extraer la información 

        try {
            const RepoMarca = AppDataSource.getRepository(Marca);
            let mostrarmarca;
            try {
                mostrarmarca = await RepoMarca.find({where: {estado:true}})
            } catch (error) {
                return resp.status(404).json({mensaje: "No se encontro datos."})
            } 
            return resp.status(200).json(mostrarmarca);
        } catch (error) {
            return resp.status(404).json({mensaje: "Error al cargar los datos de la marca"})
        }

    }
    static getById = async (req: Request, resp: Response) => {

        //Parte de la controladora para extraer la información por ID

        try {
            const RepoMarcas = AppDataSource.getRepository(Marca);
            let id, mostrar; 
            id = parseInt(req.params["id"]); //Busca por medio de la placa
            if (!id) {
                return resp.status(404).json({ mensaje: 'No se indica el ID' })
            }
            
            try {
                mostrar = await RepoMarcas.findOneOrFail({where: {id,estado: true}}) //Verifica si esta activo
            } catch (error) {
                return resp.status(404).json({mensaje: "No existen datos."})
            } 
            return resp.status(200).json(mostrar);
        } catch (error) {
            return resp.status(404).json({mensaje: "Hubo un error al procesar los datos los datos"})
        }
       
    }

    static add = async (req: Request, resp: Response) => {

        try {
            // Destructuring
            // De esa manera estamos sacando del body esos datos:
            const {id,nombre,metalizado,estado} = req.body;
            //ValCodigo_Productoamos los datos de entrada
            
            
            //Hacemos la instancia del repositorio
            const MarcaRepo = AppDataSource.getRepository(Marca);
            
            let Mac; 
    
            
            Mac = await MarcaRepo.findOne({ where: { id }})
            
            // Validamos si el producto esta en la base de datos
            
            if(Mac){
                return resp.status(404).json({ mensaje: 'La Marca ya esta en la base de datos' })
            }
    
            //Creamos el nuevo producto
            let NewMarcas = new Marca();
           
            
    
            NewMarcas.id = id;
            NewMarcas.nombre = nombre;
            NewMarcas.metalizado = metalizado;
            NewMarcas.estado = estado;
            
            //Guardamos
            await MarcaRepo.save(NewMarcas);
           
            return resp.status(200).json({ mensaje: 'Marca Creada' });
    
    
            } catch (error) {
    
                return resp.status(400).json({mensaje:error})
        }

        
    }

    static update = async (req: Request, resp: Response) => {

        //Parte de la controladora para actualizar 

        try {
            const {nombre,metalizado,estado} = req.body;
            let id;
            //Extraemos el id, en fomrato Int
            id = parseInt(req.params["id"]);
            // Hacemos la instancia del repositorio
            const RepoUpadte = AppDataSource.getRepository(Marca);
          

            // Buscamos la factura por su número
            const Marcas = await RepoUpadte.findOne({ where: {id} });

           
            /* Este código está comprobando si la variable `Marcas` es falsa (nula, indefinida, falsa,
            0, cadena vacía) o no. Si `Marcas` es falsa, significa que la factura no existe en la
            base de datos. En ese caso, devuelve una respuesta JSON con un código de estado de 404
            (Not Found) y un mensaje que indica que la factura no existe en la base de datos. */
            if (!Marcas) {
                return resp.status(404).json({ mensaje: 'La factura no existe en la base de datos' });
            }
            Marcas.nombre= nombre; 
            Marcas.metalizado = metalizado;
            Marcas.estado = estado;
        

            await RepoUpadte.save(Marcas);

            // Buscamos el detalle de la factura
           
            return resp.status(200).json({ mensaje: 'Factura actualizada correctamente' });
        } catch (error) {
            return resp.status(400).json({ mensaje: error });
        }

    }
    static delete = async (req: Request, resp: Response) => {
        /* Este código intenta analizar el parámetro `id` de la URL de solicitud y convertirlo en un
        número entero. Luego comprueba si el `id` es falso (nulo, indefinido, 0, cadena vacía). Si
        es falso, devuelve una respuesta con un código de estado de 400 (Solicitud incorrecta) y un
        objeto JSON que contiene un mensaje que indica que el usuario debe indicar el número de la
        marca que desea eliminar. */
        try {
            let id;
            id = parseInt(req.params["id"]);
            if (!id) {
                return resp.status(400).json({ mensaje: 'Debe indicar el numero de marca que desea eliminar' })
            }

            const ElimiRepo = AppDataSource.getRepository(Marca);
            // Buscamos la factura por su número
            const EliminarMarca = await ElimiRepo.findOne({ where: { id, estado: true } });//Verifica si se encuentra activo para proceder a borrarlo

            // Validamos si la factura existe en la base de datos
            if (!EliminarMarca) {
                return resp.status(404).json({ mensaje: 'La marca no existe en la base de datos' });
            }
           /* Este bloque de código es responsable de eliminar una marca de la base de datos. */
            try {
                EliminarMarca.estado = false;
                await ElimiRepo.save(EliminarMarca);
                return resp.status(200).json({ mensaje: 'Se elimino correctamente la marca' })
            } catch (error) {
                return resp.status(400).json({ mensaje: 'No se pudo eliminar' })
            }

        } catch (error) {
            return resp.status(404).json({ mensaje: 'Ocurrio un problema al momento de eliminar' })
        }
    }
}

       
    
export default MarcaController;//exporta la controladora