import { TypeOrmModuleOptions} from '@nestjs/typeorm'
export const config: TypeOrmModuleOptions = {
    type: 'postgres',
    host: '127.0.0.1',
    port: 5432,
    database: 'postgres',
    username: 'postgres',
    password: 'dobaa',
    synchronize: true,
    entities: ['dist/**/*.entity{.ts,.js}']
}
