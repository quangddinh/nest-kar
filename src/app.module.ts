import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ReportsModule } from './reports/reports.module';
import { User } from './user/user.entity';
import { Report } from './reports/report.entity';
@Module({
  // connection sqlite
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'sqlite',
          database: config.get<string>('DB_NAME'),
          synchronize: true,
          entities: [User, Report],
        };
      },
    }),
    // TypeOrmModule.forRoot({
    //   type: 'sqlite',
    //   database: 'db.sqlite',
    //   entities: [User, Reports],
    //   synchronize: true,
    //   // automatic update entity to sql table
    //   // normally write migration file -> to change the structure of database
    // }),
    UserModule,
    ReportsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
// repository ko thể tạo bằng cli -> mỗi repo mỗi dự án khác nhau
export class AppModule {}
