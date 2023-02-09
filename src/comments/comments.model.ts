//import { Model } from "sequelize";
import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Table, Model, BelongsToMany, BelongsTo, ForeignKey } from "sequelize-typescript";
import { UserPost } from "src/posts/post.model";
import { User } from "src/users/user.model";

interface CommentCreationAttributes{
    content:string;
    userId:number;
    postId:string;
    replyTo?:number;
}

@Table({tableName:'comments'})
export class Comment extends Model<Comment, CommentCreationAttributes>{

    @ApiProperty({example:1, description:'ID'})
    @Column({type:DataType.INTEGER, unique:true, primaryKey:true, autoIncrement:true})
    id:number;

    @ApiProperty({example:'content', description:'content'})
    @Column({type:DataType.STRING, allowNull:false})
    content:string;

    @ForeignKey(()=>Comment)
    @Column({type:DataType.INTEGER, allowNull:true})
    replyTo:number;
    @BelongsTo(()=>Comment)
    reply:Comment

    @ForeignKey(()=>User)
    @Column({type:DataType.INTEGER, allowNull:false})
    userId:number;
    @BelongsTo(()=>User)
    author:User

    @ForeignKey(()=>UserPost)
    @Column({type:DataType.STRING, allowNull:false})
    postId:string;

    @BelongsTo(()=>UserPost)
    post:UserPost
}

// CREATE TABLE IF NOT EXISTS "comments" 
// ("id" NUMBER SERIAL UNIQUE , 
// "content" VARCHAR(255) NOT NULL, 
// "replyTo" INTEGER NOT NULL REFERENCES 
// "comments" ("id") ON DELETE NO ACTION ON UPDATE CASCADE, 
// "userId" INTEGER NOT NULL REFERENCES 
// "users" ("id") ON DELETE NO ACTION ON UPDATE CASCADE, 
// "postId" VARCHAR(255) NOT NULL REFERENCES
// "posts" ("id") ON DELETE NO ACTION ON UPDATE CASCADE, 
// "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, 
// "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, 
// PRIMARY KEY ("id"));