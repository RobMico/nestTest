import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreatePostDto } from './dto/create-post.dto';
import { UserPost } from './post.model';
import * as crypto from 'crypto';
import { Op } from "sequelize";

@Injectable()
export class PostsService {
    private POST_DEATH_USER: number;
    private POST_DEATH_ANON: number;
    constructor(@InjectModel(UserPost) private postRepository: typeof UserPost) {
        this.POST_DEATH_USER = process.env.POST_DEATH_USER ? parseInt(process.env.POST_DEATH_USER) : 1000 * 60 * 60 * 24 * 9;
        this.POST_DEATH_ANON = process.env.POST_DEATH_ANON ? parseInt(process.env.POST_DEATH_ANON) : 1000 * 60 * 60 * 24 * 3;
        this.clearOldPosts();
    }

    async removePost(uuid: string, userId: number) {
        try {
            let res = await this.postRepository.destroy({ where: { id: uuid, userId: userId } });
            return res;
        } catch (ex) {
            console.log(ex);
            throw ex;
        }
    }

    async getPost(uuid: string) {
        try {
            let res = await this.postRepository.findByPk(uuid);
            return res;
        } catch (ex) {
            console.log(ex);
            throw ex;
        }
    }

    async getUserPosts(userId: number) {
        try {
            let res = await this.postRepository.findAll({ where: { userId: userId } });
            return res;
        } catch (ex) {
            console.log(ex);
            throw ex;
        }
    }

    async createUserPost(dto: CreatePostDto, userId: number) {
        try {
            let id: string = crypto.randomUUID();
            let deathTime = Date.now() + this.POST_DEATH_USER;
            const post = await this.postRepository.create({ ...dto, userId: userId, id: id, deathTime: new Date(deathTime) });
            return post;
        } catch (ex) {
            console.log(ex);
            throw ex;
        }
    }
    async createAnonPost(dto: CreatePostDto) {
        try {
            let id: string = crypto.randomUUID();
            let deathTime = Date.now() + this.POST_DEATH_ANON;
            const post = await this.postRepository.create({ ...dto, id: id, deathTime: new Date(deathTime) });
            return post;
        } catch (ex) {
            console.log(ex);
            throw ex;
        }
    }


    public get clearOldPosts(){
        return this._clearOldPosts.bind(this);
    }
    private async _clearOldPosts() {
        try {
            const res = await this.postRepository.destroy({
                where: {
                    deathTime: {
                        [Op.lt]: new Date()
                    }
                }
            });
        } catch (ex) {
            console.log(ex);
            throw ex;
        }
    }
}
