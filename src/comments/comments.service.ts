import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Comment } from './comments.model';
import { CreateCommentDto } from './dto/create-comment.dto';
import { EditCommentDto } from './dto/edit-comment.dto';

@Injectable()
export class CommentsService {
    constructor(@InjectModel(Comment) private commentsRepository: typeof Comment) { }

    async createComment(dto: CreateCommentDto, userId: number) {
        try {
            let res = await this.commentsRepository.create({ ...dto, userId: userId });
            return res;
        } catch (ex) {
            console.log(ex);
            throw ex;
        }
    }

    async editComment(dto: EditCommentDto, userId: any) {
        try {
            let res = await this.commentsRepository.update({content:dto.content}, {where:{id:dto.commentId, userId:userId}});
            return res;
        } catch (ex) {
            console.log(ex);
            throw ex;
        }
    }

    async getAll(postId: string) {
        try {
            let res = await this.commentsRepository.findAll({where:{postId:postId}});
            return res;
        } catch (ex) {
            console.log(ex);
            throw ex;
        }
    }
}
