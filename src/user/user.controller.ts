import { Body, Controller, Get, Patch, Request, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service.js";
import { JwtGuard } from "../auth/guard/jwt.guard.js";
import type { User } from "generated/prisma/models/User.js";
import { GetUser } from "../auth/decorator/get-user.decorator.js";
import { EditUserDto } from "./dto/edit-user.js";

@UseGuards(JwtGuard)
@Controller("users")
export class UserController {
    constructor(private userService: UserService) { }
    @Get("me")
    getMe(@GetUser() user: User) {
        return user;
    }
    @Patch()
    editUser(
        @GetUser("id") userId: number,
        @Body() dto: EditUserDto,
    ) {
        return this.userService.editUser(userId, dto);
    }

}