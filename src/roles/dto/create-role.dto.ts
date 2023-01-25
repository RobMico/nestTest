import { ApiProperty } from "@nestjs/swagger";

export class CreateRoleDto{
    @ApiProperty({example:'ADMIN', description:'role name(unique)'})
    readonly value:string;
    @ApiProperty({example:'descr', description:'role description'})
    readonly description:string;
}