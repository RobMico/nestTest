import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/roles.auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './role.model';
import { RolesService } from './roles.service';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
    constructor (private roleService: RolesService){}

    @ApiOperation({summary:'Create role to db'})
    @ApiResponse({status:201, type:Role})
    @Post('/create')
    create(@Body() dto:CreateRoleDto){
        return this.roleService.createRole(dto);
    }

    @ApiOperation({summary:'get role from db'})
    @ApiResponse({status:201, type:Role})
    @Get('/getbyval/:value')
    getByValue(@Param('value') value:string)
    {
        return this.roleService.getRoleByValue(value);
    }

}
