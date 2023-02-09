import { forwardRef, Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { AuthModule } from 'src/auth/auth.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Comment } from './comments.model';

@Module({
  providers: [CommentsService],
  controllers: [CommentsController],
  imports:[
    SequelizeModule.forFeature([Comment]),
    forwardRef(()=>AuthModule)
  ]
})
export class CommentsModule { }
