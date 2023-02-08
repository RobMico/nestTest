import { Sequelize } from 'sequelize-typescript';
//import { Cat } from '../cats/cat.entity';
import {User} from './users/user.model';


export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: process.env.POSTGRES_HOST,
        port: Number(process.env.POSTGRES_PORT),
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        models:[User]
      });
      //sequelize.addModels([User]);
      await sequelize.sync();

      return sequelize;
    },
  },
];