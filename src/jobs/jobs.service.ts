import { Injectable } from '@nestjs/common';
import * as schedule from "node-schedule";
import { PostsService } from 'src/posts/posts.service';


@Injectable()
export class JobsService {
    constructor(private postsService:PostsService){
        const autoremove = schedule.scheduleJob('0 0 * * * *', this.postsService.clearOldPosts)
    }

}