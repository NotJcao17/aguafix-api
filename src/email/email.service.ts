import { Injectable } from '@nestjs/common';
import { createTransport } from 'nodemailer';
import type { Transporter } from 'nodemailer';
import { envs } from 'src/config/envs';

@Injectable()
export class EmailService {
  private readonly transporter: Transporter;

  constructor() {
    this.transporter = createTransport({
      service: envs.MAILER_SERVICE,
      auth: {
        user: envs.MAILER_USER,
        pass: envs.MAILER_TOKEN,
      },
    });
  }

  async sendEmail(to: string, subject: string, template: string) {
    await this.transporter.sendMail({
      from: envs.MAILER_USER,
      to: to,
      subject: subject,
      html: template,
    });
  }
}