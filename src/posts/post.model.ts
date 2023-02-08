//import { Model } from "sequelize";
import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Table, Model, BelongsToMany, BelongsTo, ForeignKey } from "sequelize-typescript";
import { User } from "src/users/user.model";

interface PostCreationAttributes{
    id:string;
    title:string;
    content:string;
    userId?:number;
    deathTime:Date;
}

@Table({tableName:'posts'})
export class UserPost extends Model<UserPost, PostCreationAttributes>{

    @ApiProperty({example:'1', description:'Unique hash'})
    @Column({type:DataType.STRING, unique:true, primaryKey:true})
    id:string;

    @ApiProperty({example:'title', description:'post title'})
    @Column({type:DataType.STRING, allowNull:false})
    title:string;

    @ApiProperty({example:'content', description:'post content'})
    @Column({type:DataType.STRING, allowNull:false})
    content:string;

    @ApiProperty({example:'image.png', description:'image link'})
    @Column({type:DataType.STRING})
    image:string;

    @ApiProperty({description:'Time when post can be removed'})
    @Column({type:DataType.DATE})
    deathTime:Date

    @ForeignKey(()=>User)
    @Column({type:DataType.INTEGER, allowNull:true})
    userId:number;

    @BelongsTo(()=>User)
    author:User
}