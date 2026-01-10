import { PrismaService } from "src/prisma/prisma.service.js";


export class UserService{
    
    constructor(
        private prisma: PrismaService,
    ){}
   
}