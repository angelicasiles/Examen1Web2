import { Request, Response } from "express"
import { AppDataSource } from "../data-source";
import { Vehiculo } from "../entity/Vehiculo";
import { getRepository } from "typeorm";
import { Color } from "../entity/Color";
import { Marca } from "../entity/Marca";
import { Tipo_Vehiculo } from "../entity/Tipo_Vehiculo";

class VehiculoController {

    static getById = async (req: Request, resp: Response) => {

        //Parte de la controladora para extraer la información por medio de ID
        try {
            const RepoId = AppDataSource.getRepository(Vehiculo);
            let mostrar, placa;
            placa = req.params["id"]; //Busca por medio de la placa
            if (!placa) {
                return resp.status(404).json({ mensaje: 'No se indica el ID' })
            }

            try {
                mostrar = await RepoId.findOneOrFail({ where: { placa }, relations: { Colors: true, TiposVehiculos: true, marcasVehi: true } }) //Aquí se realiza las relaciones con las demás tablas
            } catch (error) {
                return resp.status(404).json({ mensaje: "No existen datos." })
            }
            return resp.status(200).json(mostrar);
        } catch (error) {
            return resp.status(404).json({ mensaje: "Hubo un error al procesar los datos los datos" })
        }
    }

    static add = async (req: Request, resp: Response) => {

        //Parte de la controladora agregar nuevo vehiculo
        try {
            // Destructuring
            // De esa manera estamos sacando del body esos datos:
            const { id, placa, id_marca, id_color, cilindraje, id_TipoVehiculo, cantidadPasajero } = req.body;

            //Hacemos la instancia del repositorio

            const padreColorRepository = AppDataSource.getRepository(Color);
            const padreMarcarRepository = AppDataSource.getRepository(Marca);
            const padreTipoVehiRepository = AppDataSource.getRepository(Tipo_Vehiculo);
            const padreVehiRepository = AppDataSource.getRepository(Vehiculo);


            //Para realizar la busqueda del ID para despues verificar
            const marca= await padreMarcarRepository.findOne({where:{id:id_marca}});
            const color = await padreColorRepository.findOne({where:{id:id_color}});
            const tipoVehiculo = await padreTipoVehiRepository.findOne({where:{id:id_TipoVehiculo}});
            const vehi = await padreVehiRepository.findOne({where:{id}});

            // Validamos si el producto esta en la base de datos

            if (!marca) {
                return resp.status(404).json({ mensaje: 'La marca no esta en la base de datos' })
            }
            if(!color){
                return resp.status(404).json({ mensaje: 'El color no esta en la base de datos' })

            }
            if(!tipoVehiculo){
                return resp.status(404).json({ mensaje: 'El tipo no de vehiculo esta en la base de datos' })

            }
            if(vehi){
                return resp.status(404).json({ mensaje: 'El vehiculo ya existe esta en la base de datos' })

            }

             //Creamos el nuevo Vehiculo
             const fecha_ingreso = new Date();
             let NewVehiculo= new Vehiculo();


             NewVehiculo.id = id;
             NewVehiculo.placa = placa; 
             NewVehiculo.id_marca= id_marca; 
             NewVehiculo.id_color = id_color; 
             NewVehiculo.cilindraje= cilindraje; 
             NewVehiculo.id_TipoVehiculo=id_TipoVehiculo;
             NewVehiculo.cantidadPasajero= cantidadPasajero; 

             NewVehiculo.fecha_ingreso= fecha_ingreso; 

             //Guardamos
            await padreVehiRepository.save(NewVehiculo);
            return resp.status(200).json({ mensaje: 'Vehiculo Creado' });
             

        } catch (error) {

            return resp.status(400).json({ mensaje: error })
        }


    }

    static delete = async (req: Request, resp: Response) => {

        //Parte de la controladora para eliminar

        try {
            let placa;
            placa = req.params["id"]; //Busca por medio de la placa
            if (!placa) {
                return resp.status(400).json({ mensaje: 'Debe indicar la de placa que desea eliminar' })
            }

            const ElimiRepo = AppDataSource.getRepository(Vehiculo);
            // Buscamos la vehiculo por su placa
            const EliminarVehi = await ElimiRepo.findOne({ where: { placa, estado: true } }); //Se verifica si esta activo para poderlo eliminar por medio de la placa

            // Validamos si la factura existe en la base de datos
            if (!EliminarVehi) {
                return resp.status(404).json({ mensaje: 'La marca no existe en la base de datos' });
            }
            //Verifica si se elimina correctamente
            try {
                /* Este bloque de código es responsable de eliminar una marca de la base de datos. */
                EliminarVehi.estado = false;
                await ElimiRepo.save(EliminarVehi);//Se elimina
                return resp.status(200).json({ mensaje: 'Se elimino correctamente el vehiculo' })
            } catch (error) {
                return resp.status(400).json({ mensaje: 'No se pudo eliminar' })
            }

        } catch (error) {
            return resp.status(404).json({ mensaje: 'Ocurrio un problema al momento de eliminar' })
        }
    }
}


    

export default VehiculoController; //Exporta la controladora