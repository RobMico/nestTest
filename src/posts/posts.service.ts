import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreatePostDto } from './dto/create-post.dto';
import { UserPost } from './post.model';
import * as crypto from 'crypto';

@Injectable()
export class PostsService {
    constructor(@InjectModel(UserPost) private postRepository: typeof UserPost) { }


    async getPost(uuid: string) {
        try {
            let res = await this.postRepository.findByPk(uuid);
            return res;
        } catch (ex) {
            console.log(ex);
            throw ex;
        }
    }

    async getUserPosts(userId:number) {
        try {
            let res = await this.postRepository.findAll({where:{userId:userId}});
            return res;
        } catch (ex) {
            console.log(ex);
            throw ex;
        }
    }

    async createUserPost(dto: CreatePostDto, userId: number) {
        try {
            let id: string = crypto.randomUUID();
            const post = await this.postRepository.create({ ...dto, userId: userId, id: id });
            return post;
        } catch (ex) {
            console.log(ex);
            throw ex;
        }
        //console.log(userId)
    }
    async createAnonPost(dto: CreatePostDto) {

        try {
            let id: string = crypto.randomUUID();
            const post = await this.postRepository.create({ ...dto, id: id });
            return post;
        } catch (ex) {
            console.log(ex)
            throw ex;
        }
    }
}
