import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Vehiculo } from "./Vehiculo";
import { IsNotEmpty } from "class-validator";


@Entity()

export class Color{

    @PrimaryGeneratedColumn()
    @IsNotEmpty({message:'El espacio esta vacio, debes de indicar id'})
    id: Number; 
    //Se realizo las entidades, también decoradores para validar los datos de entrada

    @Column({nullable: true})
    @IsNotEmpty({message:'El espacio esta vacio, debes de indicar nombre'})
    nombre: String; 
    //Se realizo las entidades, también decoradores para validar los datos de entrada y que debe de ser NOT NULL

    @Column({default: true, nullable: true})
    estado: boolean; 
    //El se coloca de forma automatica y debe de ser NOT NULL
    

    //Se realizo la relación de Vehiculo
    @OneToMany(()=>Vehiculo, (VehiculoColor)=>VehiculoColor.Colors,{cascade: ['insert', 'update']})
    vehiColor: Vehiculo[]; 



}