import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Comment } from './comments.model';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentsService {
    constructor(@InjectModel(Comment) private commentsRepository: typeof Comment){}
    async createComment(dto: CreateCommentDto, userId: number) {
        let res = await this.commentsRepository.create({...dto, userId:userId});
        return res;
    }
}
