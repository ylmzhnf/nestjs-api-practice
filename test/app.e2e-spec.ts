import { ValidationPipe } from "@nestjs/common";
import { AppModule } from "../src/app.module.js";
import { PrismaService } from "src/prisma/prisma.service.js"
import { Test } from "@nestjs/testing"
import { AuthDto } from "src/dto/auth.dto.js";
import { FastifyAdapter, NestFastifyApplication } from "@nestjs/platform-fastify";
import { EditUserDto } from "src/user/dto/edit-user.js";


describe("App e2e", () => {
    let app: NestFastifyApplication;
    let prisma: PrismaService;
    let accessToken: string;

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();
        app = moduleRef.createNestApplication<NestFastifyApplication>(
            new FastifyAdapter()
        );
        app.useGlobalPipes(
            new ValidationPipe({
                whitelist: true,
            })
        );
        await app.init();
        prisma = app.get(PrismaService);
        await prisma.cleanDb();

    })


    describe("Auth", () => {
        const dto: AuthDto = {
            email: "test@email.com",
            password: "secret"
        }
        it("should signup", async () => {
            return app.inject({
                method: "POST",
                url: "/auth/signup",
                payload: dto,
            })
                .then((res) => {
                    expect(res.statusCode).toBe(201);
                    const body = JSON.parse(res.body);
                    accessToken = body.access_token;
                    expect(body).toHaveProperty("access_token");
                })

        })
        it("should signin", async () => {
            return app.inject({
                method: "POST",
                url: "/auth/signin",
                payload: dto,
            })
                .then((res) => {
                    expect(res.statusCode).toBe(200);
                    const body = JSON.parse(res.body);
                    expect(body).toHaveProperty("access_token");
                })
        })
    })

    describe("User", () => {
        it("should get current user", async () => {
            return app.inject({
                method: "GET",
                url: "/users/me",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            })
                .then((res) => {
                    expect(res.statusCode).toBe(200);
                    const body = JSON.parse(res.body);
                    expect(body).toHaveProperty("id");
                    expect(body).toHaveProperty("email");
                })
        })
    })
    afterAll(async () => {
        await app.close();
    })
})