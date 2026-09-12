import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto';
import { BodyResponse } from 'src/common/dtos/body-response.dto';
import { ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController {

    constructor(
        private reportsService: ReportsService
    ) {}

    @Get()
    async getAllReports() {
        const response: BodyResponse = {
            status: 200,
            error: false,
            errorMessage: undefined,
            data: undefined
        }
        try {
            const reports = await this.reportsService.getAllReports();
            response.data = reports;
            return response;
        }
        catch (e) {
            response.status = 500;
            response.error = true;
            response.errorMessage = "Ocurrio un error al obtener los reportes";
            return response;
        }
    }

    @Post()
    async createReport(
        @Body() createReportDto: CreateReportDto
    ) {
        const response: BodyResponse = {
            status: 200,
            error: false,
            errorMessage: undefined,
            data: undefined
        }
        try {
            const report = await this.reportsService.createReport(createReportDto);
            response.data = report;
            return response;
        }
        catch (e) {
            response.status = 500;
            response.error = true;
            response.errorMessage = "Ocurrio un error al crear el reporte";
            return response;
        }
    }
}