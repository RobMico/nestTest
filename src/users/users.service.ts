import { BadRequestException, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RolesService } from 'src/roles/roles.service';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.model';

@Injectable()
export class UsersService {
    constructor (    
        @InjectModel(User) private usersRepository: typeof User,
        private roleService: RolesService
        ){}
    async createUser(dto:CreateUserDto) {
        const user = await this.usersRepository.create(dto);
        const role = await this.roleService.getRoleByValue('USER');
        await user.$set('roles', [role.id]);
        user.roles = [role];
        return user;
        
    }

    async getUsers() {
        const users = await this.usersRepository.findAll({include:{all:true}});
        return users;
    }

    async getUserByEmail(email:string){
        const users = await this.usersRepository.findOne({where:{email:email}, include:{all:true}});
        return users;
    }

    async addRole(dto:AddRoleDto)
    {
        const user = await this.usersRepository.findByPk(dto.userId);
        const role = await this.roleService.getRoleByValue(dto.value);
        if(role&&user)
        {
            await user.$add('role', role.id);
            return dto;
        }
        throw new HttpException('User or role not found', HttpStatus.NOT_FOUND);
    }

    async banUser(dto:BanUserDto)
    {
        const user = await this.usersRepository.findByPk(dto.userId);
        if(!user)
        {
            throw new BadRequestException({message:'user not found'});
        }
        user.banned=true;
        user.banReason = dto.banReason;
        await user.save();
        return user;
    }
}
