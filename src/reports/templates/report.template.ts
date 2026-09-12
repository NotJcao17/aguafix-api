import { CreateReportDto } from '../dtos/create-report.dto';

const SEVERITY_INFO: Record<string, { label: string; color: string; background: string }> = {
  low: { label: 'Baja', color: '#1b6b3a', background: '#e4f5ea' },
  medium: { label: 'Media', color: '#9a6100', background: '#fdf1dc' },
  high: { label: 'Alta', color: '#a41d1d', background: '#fbe6e6' },
};

const row = (label: string, value: string) => `
              <tr>
                <td style="padding:14px 0;border-bottom:1px solid #dfe9f2;font-family:Helvetica,Arial,sans-serif;font-size:13px;line-height:18px;color:#5d7893;text-transform:uppercase;letter-spacing:.6px;">${label}</td>
                <td align="right" style="padding:14px 0;border-bottom:1px solid #dfe9f2;font-family:Helvetica,Arial,sans-serif;font-size:16px;line-height:22px;color:#123a5c;font-weight:bold;">${value}</td>
              </tr>`;

export const generateReportTemplate = (dto: CreateReportDto): string => {
  const { address, description, severity, reporterPhone } = dto;
  const severityInfo = SEVERITY_INFO[severity] ?? {
    label: severity,
    color: '#5d7893',
    background: '#eef3f8',
  };

  return `<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Nuevo reporte de fuga de agua</title>
  </head>
  <body style="margin:0;padding:0;background-color:#eef3f8;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#eef3f8;padding:32px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 16px rgba(18,58,92,.08);">

            <!-- Header -->
            <tr>
              <td style="background-color:#0d6ba8;padding:32px;">
                <p style="margin:0 0 10px 0;font-family:Helvetica,Arial,sans-serif;font-size:12px;line-height:16px;letter-spacing:1.4px;text-transform:uppercase;color:#a9d8f2;">AguaFix &middot; Aviso de fuga</p>
                <h1 style="margin:0;font-family:Helvetica,Arial,sans-serif;font-size:26px;line-height:32px;color:#ffffff;font-weight:bold;">Nuevo reporte ciudadano</h1>
                <p style="margin:10px 0 0 0;font-family:Helvetica,Arial,sans-serif;font-size:15px;line-height:22px;color:#d4ebf8;">Se registro una fuga de agua en la via publica. Revisar y asignar cuadrilla.</p>
              </td>
            </tr>

            <!-- Severidad -->
            <tr>
              <td style="padding:28px 32px 0 32px;">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td style="background-color:${severityInfo.background};border-radius:999px;padding:8px 20px;font-family:Helvetica,Arial,sans-serif;font-size:13px;line-height:18px;font-weight:bold;letter-spacing:.8px;text-transform:uppercase;color:${severityInfo.color};">Severidad: ${severityInfo.label}</td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Datos -->
            <tr>
              <td style="padding:20px 32px 8px 32px;">
                <h2 style="margin:0 0 8px 0;font-family:Helvetica,Arial,sans-serif;font-size:14px;line-height:20px;letter-spacing:1px;text-transform:uppercase;color:#0d6ba8;">Datos del reporte</h2>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
${row('Direccion', address)}
${row('Severidad', severityInfo.label)}
${row('Telefono', reporterPhone)}
                </table>
              </td>
            </tr>

            <!-- Descripcion -->
            <tr>
              <td style="padding:24px 32px 8px 32px;">
                <h2 style="margin:0 0 12px 0;font-family:Helvetica,Arial,sans-serif;font-size:14px;line-height:20px;letter-spacing:1px;text-transform:uppercase;color:#0d6ba8;">Que se observa</h2>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f2f7fb;border-radius:12px;">
                  <tr>
                    <td style="padding:20px;font-family:Helvetica,Arial,sans-serif;font-size:15px;line-height:23px;color:#123a5c;">${description}</td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Contacto -->
            <tr>
              <td style="padding:24px 32px 8px 32px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f2f7fb;border-radius:12px;">
                  <tr>
                    <td align="center" style="padding:24px;">
                      <p style="margin:0 0 6px 0;font-family:Helvetica,Arial,sans-serif;font-size:13px;line-height:18px;letter-spacing:.6px;text-transform:uppercase;color:#5d7893;">Contacto del ciudadano</p>
                      <p style="margin:0 0 18px 0;font-family:Helvetica,Arial,sans-serif;font-size:24px;line-height:30px;color:#123a5c;font-weight:bold;">${reporterPhone}</p>
                      <a href="tel:${reporterPhone}" style="display:inline-block;background-color:#0d6ba8;color:#ffffff;font-family:Helvetica,Arial,sans-serif;font-size:15px;line-height:20px;font-weight:bold;text-decoration:none;padding:14px 32px;border-radius:999px;">Llamar ahora</a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="padding:24px 32px 32px 32px;">
                <p style="margin:0;font-family:Helvetica,Arial,sans-serif;font-size:12px;line-height:18px;color:#8199af;text-align:center;">Correo automatico de AguaFix API. No responder a este mensaje.</p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
};