import { PrismaService } from "src/prisma/prisma.service.js";
import { EditUserDto } from "./dto/edit-user.js";


export class UserService{
    
    constructor(
        private prisma: PrismaService,
    ){}
    async editUser(
        userId: number,
        dto: EditUserDto
    ){
        const user= await this.prisma.user.update({
            where:{
                id: userId
            },
            data:{
                ...dto
            }
        })

        return user;
    }
}