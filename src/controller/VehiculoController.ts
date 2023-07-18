import { Request, Response } from "express"
import { AppDataSource } from "../data-source";
import { Vehiculo } from "../entity/Vehiculo";
import { getRepository } from "typeorm";
import { Color } from "../entity/Color";
import { Marca } from "../entity/Marca";
import { Tipo_Vehiculo } from "../entity/Tipo_Vehiculo";

class VehiculoController {

    static getById = async (req: Request, resp: Response) => {

        try {
            const RepoId = AppDataSource.getRepository(Vehiculo);
            let mostrar, placa;
            placa = req.params["id"];
            if (!placa) {
                return resp.status(404).json({ mensaje: 'No se indica el ID' })
            }

            try {
                mostrar = await RepoId.findOneOrFail({ where: { placa }, relations: { Colors: true, TiposVehiculos: true, marcasVehi: true } })
            } catch (error) {
                return resp.status(404).json({ mensaje: "No existen datos." })
            }
            return resp.status(200).json(mostrar);
        } catch (error) {
            return resp.status(404).json({ mensaje: "Hubo un error al procesar los datos los datos" })
        }
    }

    static add = async (req: Request, resp: Response) => {
        try {
            // Destructuring
            // De esa manera estamos sacando del body esos datos:
            const { id, placa, id_marca, id_color, cilindraje, id_TipoVehiculo, cantidadPasajero } = req.body;

            //Hacemos la instancia del repositorio

            const padreColorRepository = AppDataSource.getRepository(Color);
            const padreMarcarRepository = AppDataSource.getRepository(Marca);
            const padreTipoVehiRepository = AppDataSource.getRepository(Tipo_Vehiculo);
            const padreVehiRepository = AppDataSource.getRepository(Vehiculo);



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

    }
}

export default VehiculoController;