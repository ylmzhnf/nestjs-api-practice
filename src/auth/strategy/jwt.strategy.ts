import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PrismaService } from "../../prisma/prisma.service.js";
import { Injectable } from "@nestjs/common";

@Injectable()
export class JwtStrategty extends PassportStrategy(Strategy, "jwt"){
    constructor(
        private prisma:PrismaService){
            super({
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                secretOrKey: process.env.JWT_SECRET!,
            });
        }
   async validate(playLoad: {sub: number, email: string}){
        const user =await this.prisma.user.findUnique({
            where:{
                id: playLoad.sub,
            },
        });
        if(!user){
            return null;
        }
        const {hash, ...result}= user;
        return result;
   } 
}