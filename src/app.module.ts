import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { UsersModule } from './users/users.module';
import { databaseProviders } from "./pg.provider";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./users/user.model";
import { RolesModule } from './roles/roles.module';
import { Role } from "./roles/role.model";
import { UserRoles } from "./roles/user-roles.model";
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { UserPost } from "./posts/post.model";
import { JobsModule } from './jobs/jobs.module';
import { CommentsModule } from './comments/comments.module';
import { Comment } from "./comments/comments.model";

process.env.NODE_ENV||(process.env.NODE_ENV="development");//for debug mode
@Module({
    
    //providers:[...databaseProviders],
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            username: process.env.POSTGRES_USER,
            port: Number(process.env.POSTGRES_PORT),
            database: process.env.POSTGRES_DB,
            password:process.env.POSTGRES_PASSWORD,
            models:[User, UserPost, Role, UserRoles, Comment],
            autoLoadModels:true
        }),
        UsersModule,
        RolesModule,
        AuthModule,
        PostsModule,
        JobsModule,
        CommentsModule,
    ]
})
export class AppModule { };