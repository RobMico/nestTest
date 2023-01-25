//import { Model } from "sequelize";
import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Table, Model, BelongsToMany, BelongsTo, ForeignKey } from "sequelize-typescript";
import { User } from "src/users/user.model";

interface PostCreationAttributes{
    title:string;
    content:string;
    userId:number;
}

@Table({tableName:'posts'})
export class UserPost extends Model<UserPost, PostCreationAttributes>{

    @ApiProperty({example:'1', description:'ID'})
    @Column({type:DataType.INTEGER, unique:true, primaryKey:true, autoIncrement:true})
    id:number;

    @ApiProperty({example:'title', description:'post title'})
    @Column({type:DataType.STRING, allowNull:false})
    title:string;

    @ApiProperty({example:'content', description:'post content'})
    @Column({type:DataType.STRING, allowNull:false})
    content:string;

    @ApiProperty({example:'image.png', description:'image link'})
    @Column({type:DataType.STRING})
    image:string;


    @ForeignKey(()=>User)
    @Column({type:DataType.INTEGER})
    userId:number;

    @BelongsTo(()=>User)
    author:User
}