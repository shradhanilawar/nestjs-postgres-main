import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Pool } from 'pg';

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private pool: Pool;

  constructor() {
    this.pool = new Pool({
      user: 'postgres',
      host: 'localhost',
      database: 'paiteq',
      password: '1234',
      port: 5432,
    });
  }

  async onModuleInit() {
    console.log('Database Connected');
  }

  async onModuleDestroy() {
    await this.pool.end();
  }

  async query(query: string, params?: any[]) {
    const client = await this.pool.connect();
    try {
      const result = await client.query(query, params);
      return result.rows;
    } finally {
      client.release();
    }
  }
}
