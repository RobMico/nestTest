import { forwardRef, Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/user.model';
import { AuthModule } from 'src/auth/auth.module';
import { UserPost } from './post.model';

@Module({
  providers: [PostsService],
  controllers: [PostsController],
  imports:[
    SequelizeModule.forFeature([User, UserPost]),
    forwardRef(()=>AuthModule)
  ],
  exports:[
    PostsService
  ]
})
export class PostsModule {}
