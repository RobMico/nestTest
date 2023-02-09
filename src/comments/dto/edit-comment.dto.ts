import { ApiProperty } from "@nestjs/swagger";

export class EditCommentDto{
    @ApiProperty({example:'content', description:'content'})
    readonly content:string;
    @ApiProperty({example:10, description:'link to comment'})
    readonly commentId:number;
}