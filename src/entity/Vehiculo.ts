import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Marca } from "./Marca";
import { Tipo_Vehiculo } from "./Tipo_Vehiculo";
import { Color } from "./Color";
import { IsNotEmpty } from "class-validator";



@Entity() //Se genera las entidades

export class Vehiculo{ //Se exporta la clase

    @PrimaryGeneratedColumn()
    @IsNotEmpty({message:'El espacio esta vacio, debes de indicar id'})
    id: number; 
    //Se realizo las entidades, también decoradores para validar los datos de entrada

    @Column({nullable: true, unique: true})
    @IsNotEmpty({message:'El espacio esta vacio, debes de indicar la placa'})
    placa: string; 
    //Se realizo las entidades, también decoradores para validar los datos de entrada y que debe de ser NOT NULL

    @Column({nullable: true})
    @IsNotEmpty({message:'El espacio esta vacio, debes de indicar el id de la placa'})
    id_marca: number; 
    //Se realizo las entidades, también decoradores para validar los datos de entrada y que debe de ser NOT NULL

    @Column({nullable: true})
    @IsNotEmpty({message:'El espacio esta vacio, debes de indicar el id del color'})
    id_color: number; 
    //Se realizo las entidades, también decoradores para validar los datos de entrada y que debe de ser NOT NULL

    @Column({nullable: true})
    @IsNotEmpty({message:'El espacio esta vacio, debes de indicar el cilindraje'})
    cilindraje: number; 
    //Se realizo las entidades, también decoradores para validar los datos de entrada y que debe de ser NOT NULL

    @Column({nullable: true})
    @IsNotEmpty({message:'El espacio esta vacio, debes de indicar el id tipoVehiculo'})
    id_TipoVehiculo: number; 
    //Se realizo las entidades, también decoradores para validar los datos de entrada y que debe de ser NOT NULL

    @Column({nullable: true})
    @IsNotEmpty({message:'El espacio esta vacio, debes de indicar la cantidad de pasanjeros'})
    cantidadPasajero: number; 
    //Se realizo las entidades, también decoradores para validar los datos de entrada y que debe de ser NOT NULL

    @Column({nullable: true})
    fecha_ingreso:Date; 
    //La fecha se coloca de forma automatica y debe de ser NOT NULL

    @Column({default: true, nullable: true})
    estado: boolean; 
    //El se coloca de forma automatica y debe de ser NOT NULL

    //Se realizo la relación de Color 
    @ManyToOne(()=> Color, (Colores)=> Colores.vehiColor)
    @JoinColumn({name: "id_color"})
    Colors: Color; 
    
    //Se realizo la relación de Tipo de vehiculo 
    @ManyToOne(()=> Tipo_Vehiculo, (VehiculoTipo)=> VehiculoTipo.vehiculos)
    @JoinColumn({name: "id_TipoVehiculo"})
    TiposVehiculos: Tipo_Vehiculo;

    //Se realizo la relación de Marca
    @ManyToOne(()=> Marca, (MarcaVehiculo)=> MarcaVehiculo.vehiMarca)
    @JoinColumn({name: "id_marca"})
    marcasVehi: Marca; 


    


   




}