import { Controller, Post, Req } from "@nestjs/common";
import * as express from "express";
import { AuthService } from "./auth.service.js";

@Controller("auth")
export class AuthController{
    constructor(private authService: AuthService){}

    signup(@Req() req: express.Request) {
    console.log(req.body); 
    return this.authService.signup();

}

    @Post("signin")
    signin(){
       return this.authService.signin()
    }
}