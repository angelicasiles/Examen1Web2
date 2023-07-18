import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Vehiculo } from "./Vehiculo";
import { IsNotEmpty } from "class-validator";


@Entity() //Se genera las entidades

export class Tipo_Vehiculo{  //Se exporta la clase

    @PrimaryGeneratedColumn()
    @IsNotEmpty({message:'El espacio esta vacio, debes de indicar id'})
    id: Number; 
    //Se realizo las entidades, también decoradores para validar los datos de entrada

    @Column({nullable: true})
    @IsNotEmpty({message:'El espacio esta vacio, debes de indicar nombre'})
    nombre: String; 
    //Se realizo las entidades, también decoradores para validar los datos de entrada y que debe de ser NOT NULL

    @Column({default:true, nullable: true})
    estado: boolean; 
    //El se coloca de forma automatica y debe de ser NOT NULL

    
    //Se creo las relaciones de Vehiculo
    @OneToMany(()=>Vehiculo, (VehiculoTi)=>VehiculoTi.TiposVehiculos,{cascade: ['insert', 'update']})
    vehiculos: Vehiculo[];  //Se crea la lista

}


