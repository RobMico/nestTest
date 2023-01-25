import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { ROLES_KEY } from "./roles.auth.decorator";

@Injectable()
export class RolesGuard implements CanActivate{
    constructor(private jwtService:JwtService, 
                private reflector:Reflector){}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    
        try{
            const requiredRoles = this.reflector.getAllAndOverride(ROLES_KEY, [context.getHandler(),context.getClass()]);
            if(!requiredRoles)
            {
                return true;
            }
            //console.log(requiredRoles.includes);
            const req = context.switchToHttp().getRequest();
            const authHeader = req.headers.authorization;
            const [bearer, token] = authHeader.split(' ');
            if(bearer!='bearer'||!token)
            {
                throw new UnauthorizedException({message:'user unautorised'});    
            }
            const user = this.jwtService.verify(token);
            req.user = user;
            return user.roles.some(role=>requiredRoles.includes(role.value));
        }catch(ex){
            console.log(ex);
            throw new ForbiddenException({message:'forbidden'});
        }
    }
}