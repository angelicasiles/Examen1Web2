import { Column, Entity, OneToMany, PrimaryGeneratedColumn, } from "typeorm";
import { Vehiculo } from "./Vehiculo";
import { IsNotEmpty } from "class-validator";


@Entity()

export class Marca{

    @PrimaryGeneratedColumn()
    @IsNotEmpty({message:'El espacio esta vacio, debes de indicar id'})
    id: Number; 
    //Se realizo las entidades, también decoradores para validar los datos de entrada

    @Column({nullable: true})
    @IsNotEmpty({message:'El espacio esta vacio, debes de indicar nombre'})
    nombre: String; 
    //Se realizo las entidades, también decoradores para validar los datos de entrada y que debe de ser NOT NULL

    @Column({nullable: true})
    @IsNotEmpty({message:'El espacio esta vacio, debes de indicar si es metalizado o no'})
    metalizado: boolean; 
    //Se realizo las entidades, también decoradores para validar los datos de entrada y que debe de ser NOT NULL

    @Column({nullable: true, default: true})
    estado: boolean; 
    //El se coloca de forma automatica y debe de ser NOT NULL

    //Se creo la relación de Vehiculo
    @OneToMany(()=>Vehiculo, (VehiculoMarca)=>VehiculoMarca.marcasVehi,{cascade: ['insert', 'update']})
    vehiMarca: Vehiculo[]; 



}