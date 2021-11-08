import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import { Reports } from './reports.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reports])],
  // after connect to parent module -> connect to Root module in App Module
  controllers: [ReportsController],
  providers: [ReportsService],
})
export class ReportsModule {}
