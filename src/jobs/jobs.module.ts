import { Module } from '@nestjs/common';
import { PostsModule } from 'src/posts/posts.module';
import { JobsService } from './jobs.service';

@Module({
  providers: [JobsService],
  imports:[
    PostsModule
  ]
})
export class JobsModule {}
