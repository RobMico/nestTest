import { Controller, Post, Req, UploadedFile, UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/roles.auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
    constructor(private postService: PostsService){}

    @Roles('USER')
    @UseGuards(RolesGuard)
    @Post('/create')
    createPost(dto:CreatePostDto, @Req() req: any, @UploadedFile() image)
    {
        let user = req.user;
        this.postService.create(dto, user.id, image);
    }
}
