import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import { Report } from './entities/report.entity';
import { EmailModule } from 'src/email/email.module';
import { StorageModule } from 'src/storage/storage.module';

@Module({
  imports: [
    EmailModule,
    StorageModule,
    TypeOrmModule.forFeature([
      Report
    ])
  ],
  controllers: [ReportsController],
  providers: [ReportsService]
})
export class ReportsModule {}