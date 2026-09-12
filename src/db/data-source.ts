import { envs } from "src/config/envs";
import { Report } from "src/reports/entities/report.entity";
import { DataSource, DataSourceOptions } from "typeorm";

export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: envs.DB_HOST,
    port: envs.DB_PORT,
    database: envs.DB_NAME,
    username: envs.DB_USER,
    password: envs.DB_PASSWORD,
    entities: [Report],
    synchronize: false,
    migrations: ['dist/db/migrations/[0-9]*-*.js']
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;