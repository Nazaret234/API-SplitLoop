import { PrismaClient } from "@prisma/client";

class Database {
  private static instance: Database;
  private _prisma: PrismaClient;

  private constructor() {
    this._prisma = new PrismaClient();
  }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  public get prisma(): PrismaClient {
    return this._prisma;
  }

  public async disconnect(): Promise<void> {
    await this._prisma.$disconnect();
  }

  public async connect(): Promise<void> {
    await this._prisma.$connect();
  }
}

// export const prisma = Database.getInstance().prisma;

export default Database;
