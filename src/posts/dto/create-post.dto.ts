import { ApiProperty } from "@nestjs/swagger";

export class CreatePostDto{
    @ApiProperty({example:'title', description:'title'})
    readonly title:string;
    @ApiProperty({example:'content', description:'content'})
    readonly content:string;
}