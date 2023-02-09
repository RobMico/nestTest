import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/roles.auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('comments')
export class CommentsController {
    constructor(private commentsService:CommentsService){}
    @Roles('USER')
    @UseGuards(RolesGuard)
    @Post('/create')
    createAnonPost(@Req() req: any) {
        let user = req.user;
        let dto: CreateCommentDto = req.body;
        return this.commentsService.createComment(dto, user.id);
    }
}
