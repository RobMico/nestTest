import { Body, Controller, Get, Param, Post, Req, UploadedFile, UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/roles.auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
    constructor(private postService: PostsService) { }

    @Roles('USER')
    @UseGuards(RolesGuard)
    @Post('/create')
    createUserPost(@Body() dto: CreatePostDto, @Req() req: any) {
        let user = req.user;
        return this.postService.createUserPost(dto, user.id);
    }

    @Post('/create_anon')
    createAnonPost(@Req() req: any) {
        let dto: CreatePostDto = req.body;
        return this.postService.createAnonPost(dto);
    }

    @Roles('USER')
    @UseGuards(RolesGuard)
    @Get('/posts')
    getUsersPosts(@Req() req: any) {
        let user = req.user;
        return this.postService.getUserPosts(user.id)
    }


    @Get('/:uuid')
    getPost(@Param('uuid') uuid: string) {
        return this.postService.getPost(uuid)
    }

    @Roles('USER')
    @UseGuards(RolesGuard)
    @Get('/rm')
    removePost(@Body() {uuid}:{uuid: string}, @Req() req: any) {
        const user = req.user;
        return this.postService.removePost(uuid, user.id)
    }
}
