import { BadRequestException, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/roles.auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { EditCommentDto } from './dto/edit-comment.dto';

@Controller('comments')
export class CommentsController {
    constructor(private commentsService: CommentsService) { }
    @Roles('USER')
    @UseGuards(RolesGuard)
    @Post('/create')
    createComment(@Req() req: any) {
        let user = req.user;
        let dto: CreateCommentDto = req.body;
        return this.commentsService.createComment(dto, user.id);
    }

    @Roles('USER')
    @UseGuards(RolesGuard)
    @Post('/edit')
    editComment(@Req() req: any) {
        let user = req.user;
        let dto: EditCommentDto = req.body;
        return this.commentsService.editComment(dto, user.id);
    }

    @Get('/getall')
    getComments(@Req() req: any) {
        const { postId } = req.body;
        if (postId) {
            return this.commentsService.getAll(postId);
        }
        throw new BadRequestException("PostId is not defined");
    }
}
