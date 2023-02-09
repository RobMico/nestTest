import { ApiProperty } from "@nestjs/swagger";

export class CreateCommentDto{
    @ApiProperty({example:'content', description:'content'})
    readonly content:string;
    @ApiProperty({example:'e1671899-8098-4411-988f-82a96ce30e9d', description:'link to post'})
    readonly postId:string;
    @ApiProperty({example:0, description:'reply to message'})
    readonly replyTo?:number;
}