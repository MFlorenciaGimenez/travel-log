import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeOrmConfig from './config/typeOrm';
import { DataSourceOptions } from 'typeorm';
import { UserModule } from './user/user.module';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { CityModule } from './city/city.module';
import { TripsModule } from './trips/trips.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeOrmConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService): DataSourceOptions => {
        return configService.get<DataSourceOptions>('typeorm')!;
      },
    }),
    UserModule,
    AdminModule,
    AuthModule,
    CityModule,
    TripsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
