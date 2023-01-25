//import { Model } from "sequelize";
import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Table, Model, BelongsToMany, HasMany } from "sequelize-typescript";
import { UserPost } from "src/posts/post.model";
import { Role } from "src/roles/role.model";
import { UserRoles } from "src/roles/user-roles.model";

interface UserCreationAttributes{
    email:string;
    password:string;
}

@Table({tableName:'users'})
export class User extends Model<User, UserCreationAttributes>{

    @ApiProperty({example:'1', description:'ID'})
    @Column({type:DataType.INTEGER, unique:true, primaryKey:true, autoIncrement:true})
    id:number;

    @ApiProperty({example:'qwerty@mail.com', description:'user email'})
    @Column({type:DataType.STRING, unique:true, allowNull:false})
    email:string;

    @ApiProperty({example:'Qwerty1-', description:'user password'})
    @Column({type:DataType.STRING, allowNull:false})
    password:string;

    @ApiProperty({example:false, description:'is user baned'})
    @Column({type:DataType.BOOLEAN, defaultValue:false})
    banned:boolean;

    @ApiProperty({example:'multi-accounting', description:'ban reason'})
    @Column({type:DataType.STRING, allowNull:true})
    banReason:string;

    @BelongsToMany(()=>Role, ()=>UserRoles)
    roles:Role[]

    @HasMany(()=>UserPost)
    posts:UserPost[]
}