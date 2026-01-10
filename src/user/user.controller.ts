import { Controller, Get, Request, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service.js";
import { JwtGuard } from "../auth/guard/jwt.guard.js";

@UseGuards(JwtGuard)
@Controller("users")
export class UserController{
    constructor( private userService: UserService){}
    @Get("me")
    getMe(@Request() req: Request){
        return {
            msg: "This is protected route",
            
        }
    }
    
}