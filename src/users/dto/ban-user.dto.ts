import { ApiProperty } from "@nestjs/swagger";

export class BanUserDto{
    @ApiProperty({example:'Multiaccount', description:'ban reason'})
    readonly banReason:string;
    @ApiProperty({example:1, description:'user id'})
    readonly userId:number;
}