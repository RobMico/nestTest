//import { Model } from "sequelize";
import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Table, Model, BelongsToMany } from "sequelize-typescript";
import { User } from "src/users/user.model";
import { UserRoles } from "./user-roles.model";

interface RoleCreationAttributes{
    value:string;
    description:string;
}

@Table({tableName:'roles'})
export class Role extends Model<Role>{

    @ApiProperty({example:'1', description:'ID'})
    @Column({type:DataType.INTEGER, unique:true, primaryKey:true, autoIncrement:true})
    id:number;

    @ApiProperty({example:'ADMIN', description:'role name(unique)'})
    @Column({type:DataType.STRING, unique:true, allowNull:false})
    value:string;

    @ApiProperty({example:'top admin', description:'role description'})
    @Column({type:DataType.STRING, allowNull:false})
    description:string;

    @BelongsToMany(()=>User, ()=>UserRoles)
    users:User[]
}