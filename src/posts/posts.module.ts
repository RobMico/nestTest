import { forwardRef, Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/user.model';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [PostsService],
  controllers: [PostsController],
  imports:[
    SequelizeModule.forFeature([User]),
    forwardRef(()=>AuthModule)
  ],
  exports:[
    PostsService
  ]
})
export class PostsModule {}
