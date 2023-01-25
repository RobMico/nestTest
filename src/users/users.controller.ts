import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';
import { Roles } from 'src/auth/roles.auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.model';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor (private userService: UsersService){}


    @ApiOperation({summary:'Create user to db'})
    @ApiResponse({status:201, type:User})
    @Post('/create')
    create(@Body() userDto:CreateUserDto){
        return this.userService.createUser(userDto);
    }

    @ApiOperation({summary:'Get all users'})
    @ApiResponse({status:201, type:[User]})
    @Roles("USER")
    @UseGuards(RolesGuard)
    @Get('/all')
    getAll(){
        return this.userService.getUsers();
    }

    @ApiOperation({summary:'Add role'})
    @ApiResponse({status:200})
    @Roles("USER")
    @UseGuards(RolesGuard)
    @Post('/role')
    addRole(@Body() dto:AddRoleDto){
        return this.userService.addRole(dto);
    }

    @ApiOperation({summary:'Ban user'})
    @ApiResponse({status:200})
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Post('/ban')
    banUser(@Body() dto:BanUserDto){
        return this.userService.banUser(dto);
    }
}
