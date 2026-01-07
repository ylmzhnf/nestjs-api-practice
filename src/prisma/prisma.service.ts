import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import {PrismaClient} from "../../generated/prisma/client.js"
import { PrismaPg } from '@prisma/adapter-pg'



@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy{
    constructor() {
        // Provide an adapter for Prisma 7 'client' engine (Postgres in schema)
        super({ adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL ?? '' }) } as any);
    }
    async onModuleInit() {
        await this.$connect()
    }
    async onModuleDestroy() {
        await this.$disconnect()
    }
}
