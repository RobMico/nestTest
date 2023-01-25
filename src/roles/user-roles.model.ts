//import { Model } from "sequelize";
import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Table, Model, BelongsToMany, ForeignKey } from "sequelize-typescript";
import { Role } from "src/roles/role.model";
import { User } from "src/users/user.model";


@Table({tableName:'user_roles', createdAt:false, updatedAt:false})
export class UserRoles extends Model<UserRoles>{

    @Column({type:DataType.INTEGER, unique:true, primaryKey:true, autoIncrement:true})
    id:Number;
    
    @ForeignKey(()=>Role)
    @Column({type:DataType.INTEGER})
    roleId:Number;

    @ForeignKey(()=>User)
    @Column({type:DataType.INTEGER})
    userId:Number;
}