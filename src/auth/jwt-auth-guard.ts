import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

@Injectable()
export class JwtAuthGuard implements CanActivate{
    constructor(private jwtService:JwtService){}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        try{
            const req = context.switchToHttp().getRequest();
            const authHeader = req.headers.authorization;
            const [bearer, token] = authHeader.split(' ');
            if(bearer!='Bearer'||!token)
            {
                throw new UnauthorizedException({message:'user unautorised'});    
            }
            const user = this.jwtService.verify(token);
            req.user = user;
            return true;
        }catch(ex){
            console.log(ex);
            throw new UnauthorizedException({message:'user unautorised'});
        }
    }
}