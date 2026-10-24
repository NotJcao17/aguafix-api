import { BadRequestException, Body, Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateReportDto } from './dtos/create-report.dto';
import { BodyResponse } from 'src/common/dtos/body-response.dto';
import { ReportsService } from './reports.service';
import { EmailService } from 'src/email/email.service';
import { generateReportTemplate } from './templates/report.template';
import { envs } from 'src/config/envs';
import { StorageService } from 'src/storage/storage.service';

@Controller('reports')
export class ReportsController {

    constructor(
        private reportsService: ReportsService,
        private emailService: EmailService,
        private storageService: StorageService
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
    @UseInterceptors(FileInterceptor('photo'))
    async createReport(
        @Body() createReportDto: CreateReportDto,
        @UploadedFile() photo: Express.Multer.File
    ) {
        if (!photo) {
            throw new BadRequestException("La foto de la fuga es obligatoria (campo 'photo')");
        }
        if (!photo.mimetype.startsWith('image/')) {
            throw new BadRequestException("El archivo 'photo' debe ser una imagen");
        }

        const response: BodyResponse = {
            status: 200,
            error: false,
            errorMessage: undefined,
            data: undefined
        }
        try {
            const photoUrl = await this.storageService.uploadFile(photo, 'reports/');
            const report = await this.reportsService.createReport(createReportDto, photoUrl);

            const template = generateReportTemplate(createReportDto, photoUrl);
            await this.emailService.sendEmail(
                envs.CREW_EMAIL,
                `Nueva fuga reportada en ${createReportDto.address}`,
                template
            );

            response.data = report;
            return response;
        }
        catch (e) {
            console.error(e);
            response.status = 500;
            response.error = true;
            response.errorMessage = "Ocurrio un error al crear el reporte";
            return response;
        }
    }
}