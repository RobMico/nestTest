import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreatePostDto } from './dto/create-post.dto';
import { UserPost } from './post.model';

@Injectable()
export class PostsService {
    constructor (@InjectModel(UserPost) private postRepository: typeof UserPost){}
    
    
    async create(dto:CreatePostDto, userId:number, image:any)
    {
        const filename = 'temp';
        const post = await this.postRepository.create({...dto, userId:userId});
        return post;
        //console.log(userId)
    }
}
