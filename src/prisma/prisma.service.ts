import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import {PrismaClient} from "../../generated/prisma/client.js"
import { PrismaPg } from '@prisma/adapter-pg'



@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy{
    constructor() {
        // Ensure DATABASE_URL is set at runtime
        const connectionString = process.env.DATABASE_URL;
        if (!connectionString) {
            throw new Error('DATABASE_URL is not set. Please add it to your environment or .env file.');
        }
        // Provide an adapter for Prisma 7 'client' engine (Postgres in schema)
        super({ adapter: new PrismaPg({ connectionString }) } as any);
    }
    async onModuleInit() {
        await this.$connect()
    }
    async onModuleDestroy() {
        await this.$disconnect()
    }
}
