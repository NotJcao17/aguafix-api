import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from './entities/report.entity';
import { CreateReportDto } from './dtos/create-report.dto';

@Injectable()
export class ReportsService {
    constructor(
        @InjectRepository(Report)
        private reportRepository: Repository<Report>
    ) {}

    async getAllReports(): Promise<Report[]> {
        const reports = await this.reportRepository.find();
        return reports;
    }

    async createReport(dto: CreateReportDto): Promise<Report> {
        const newReport = this.reportRepository.create({
            address: dto.address,
            description: dto.description,
            severity: dto.severity,
            reporterPhone: dto.reporterPhone
        });
        const report = await this.reportRepository.save(newReport);
        return report;
    }
}