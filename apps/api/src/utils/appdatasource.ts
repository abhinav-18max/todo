import { DataSource } from 'typeorm';
import entities from './typeorm';
import * as process from 'node:process';

export const Appdatasource = new DataSource({
  type: 'postgres',
  host: process.env.HOST,
  port: parseInt(process.env.PORT),
  password: process.env.PASSWORD,
  username: process.env.USERNAME,
  database: process.env.DATABASE,
  synchronize: true,
  logging: false,
  entities: entities,
});
