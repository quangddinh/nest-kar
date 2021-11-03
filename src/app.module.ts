import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ReportsModule } from './reports/reports.module';
import { User } from './user/user.entity';
import { Reports } from './reports/reports.entity';
@Module({
  // connection sqlite
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [User, Reports],
      synchronize: true,
    }),
    UserModule,
    ReportsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
// repository ko thể tạo bằng cli -> mỗi repo mỗi dự án khác nhau
export class AppModule {}
