import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service.js";
import { AuthDto } from "src/dto/auth.dto.js";
import * as bcrypt from 'bcrypt';
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import { hash } from "crypto";

@Injectable()
export class AuthService{
    constructor(private prisma:PrismaService){}
    
   async signup(dto: AuthDto){
        const saltRounds = 10;
        const password = dto.password;
        const hash = await bcrypt.hash(password, saltRounds);
        try {
            const user = await this.prisma.user.create({
                data:{
                    email: dto.email,
                    hash
                }
            })
            return user
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code==="P2002") {
                throw new ForbiddenException("Credentials taken")
            }
            }
            throw error;
        }
        
        
   }    
   async signin(dto: AuthDto){
        const user = await this.prisma.user.findUnique({
            where:{
                email: dto.email
            }
        })
        if(!user){
            throw new ForbiddenException(
                "Crendentials incorrect"
            )
        }
        const isMatch= await bcrypt.compare(dto.password,user.hash)
    }
}