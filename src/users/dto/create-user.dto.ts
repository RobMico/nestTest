import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto{
    @ApiProperty({example:'qwerty@mail.com', description:'email'})
    readonly email:string;
    @ApiProperty({example:'Qwerty1-', description:'password'})
    readonly password:string;
}