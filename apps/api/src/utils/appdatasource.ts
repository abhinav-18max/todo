import { DataSource } from 'typeorm';
import entities from './typeorm';

export const Appdatasource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  password: 'admin@123',
  username: 'admin',
  database: 'todo',
  synchronize: true,
  logging: false,
  entities: entities,
});
