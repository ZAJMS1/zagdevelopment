import nodemailer from "nodemailer";

function getEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export function getTransporter() {
  const host = getEnv("MAIL_SERVER");
  const port = Number(getEnv("MAIL_PORT"));
  const useTls = (process.env.MAIL_USE_TLS ?? "true").toLowerCase() === "true";

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    requireTLS: useTls && port !== 465,
    auth: {
      user: getEnv("MAIL_USERNAME"),
      pass: getEnv("MAIL_PASSWORD"),
    },
  });
}

export const mailConfig = {
  from: process.env.MAIL_DEFAULT_SENDER ?? process.env.MAIL_USERNAME ?? "",
  to: process.env.CONTACT_TO ?? process.env.MAIL_DEFAULT_SENDER ?? process.env.MAIL_USERNAME ?? "",
};

export function renderContactEmail(payload: {
  name: string;
  email: string;
  business?: string;
  phone?: string;
  budget?: string;
  message: string;
}) {
  const rows: Array<[string, string]> = [
    ["Name", payload.name],
    ["Email", payload.email],
  ];
  if (payload.business) rows.push(["Business", payload.business]);
  if (payload.phone) rows.push(["Phone", payload.phone]);
  if (payload.budget) rows.push(["Budget", payload.budget]);

  const rowHtml = rows
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:8px 12px;background:#f1f3f6;font-size:12px;color:#5b6472;text-transform:uppercase;letter-spacing:0.08em;border-radius:6px 0 0 6px;white-space:nowrap;">${label}</td>
          <td style="padding:8px 12px;background:#ffffff;font-size:14px;color:#11161e;border-radius:0 6px 6px 0;">${escapeHtml(value)}</td>
        </tr>
        <tr><td colspan="2" style="height:6px;line-height:6px;font-size:6px;">&nbsp;</td></tr>
      `,
    )
    .join("");

  const html = `<!doctype html>
<html>
  <body style="margin:0;padding:24px;background:#eef1f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Inter,sans-serif;">
    <table align="center" width="100%" style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #e2e6ec;border-radius:14px;overflow:hidden;">
      <tr>
        <td style="padding:24px 28px;background:linear-gradient(135deg,#18304d 0%,#1e3a5f 100%);">
          <div style="color:#c7ccd1;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;">ZAG Development</div>
          <div style="color:#ffffff;font-size:20px;font-weight:600;margin-top:4px;">New website inquiry</div>
        </td>
      </tr>
      <tr>
        <td style="padding:24px 28px;">
          <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:separate;border-spacing:0;">
            ${rowHtml}
          </table>
          <div style="margin-top:8px;padding:16px;background:#f7f8fa;border:1px solid #e2e6ec;border-radius:10px;">
            <div style="font-size:12px;color:#5b6472;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:8px;">Message</div>
            <div style="font-size:14px;color:#11161e;line-height:1.6;white-space:pre-wrap;">${escapeHtml(payload.message)}</div>
          </div>
        </td>
      </tr>
      <tr>
        <td style="padding:14px 28px 22px;border-top:1px solid #eef1f5;color:#6c7480;font-size:12px;">
          Sent from the contact form on zagdevelopment.com
        </td>
      </tr>
    </table>
  </body>
</html>`;

  const lines = [
    `New inquiry from ${payload.name} <${payload.email}>`,
    payload.business ? `Business: ${payload.business}` : null,
    payload.phone ? `Phone: ${payload.phone}` : null,
    payload.budget ? `Budget: ${payload.budget}` : null,
    "",
    payload.message,
  ].filter(Boolean);

  return { html, text: lines.join("\n") };
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function renderDepositEmail(payload: {
  name?: string;
  email?: string;
  phone?: string;
  amount: string;
  sessionId: string;
}) {
  const rows: Array<[string, string]> = [["Amount", payload.amount]];
  if (payload.name) rows.push(["Name", payload.name]);
  if (payload.email) rows.push(["Email", payload.email]);
  if (payload.phone) rows.push(["Phone", payload.phone]);
  rows.push(["Checkout session", payload.sessionId]);

  const rowHtml = rows
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:8px 12px;background:#f1f3f6;font-size:12px;color:#5b6472;text-transform:uppercase;letter-spacing:0.08em;border-radius:6px 0 0 6px;white-space:nowrap;">${label}</td>
          <td style="padding:8px 12px;background:#ffffff;font-size:14px;color:#11161e;border-radius:0 6px 6px 0;">${escapeHtml(value)}</td>
        </tr>
        <tr><td colspan="2" style="height:6px;line-height:6px;font-size:6px;">&nbsp;</td></tr>
      `,
    )
    .join("");

  const html = `<!doctype html>
<html>
  <body style="margin:0;padding:24px;background:#eef1f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Inter,sans-serif;">
    <table align="center" width="100%" style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #e2e6ec;border-radius:14px;overflow:hidden;">
      <tr>
        <td style="padding:24px 28px;background:linear-gradient(135deg,#18304d 0%,#1e3a5f 100%);">
          <div style="color:#c7ccd1;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;">ZAG Development</div>
          <div style="color:#ffffff;font-size:20px;font-weight:600;margin-top:4px;">Deposit received</div>
        </td>
      </tr>
      <tr>
        <td style="padding:24px 28px;">
          <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:separate;border-spacing:0;">
            ${rowHtml}
          </table>
        </td>
      </tr>
      <tr>
        <td style="padding:14px 28px 22px;border-top:1px solid #eef1f5;color:#6c7480;font-size:12px;">
          Paid through Stripe Checkout on zagdevelopment.com. Reach out to schedule the kickoff call.
        </td>
      </tr>
    </table>
  </body>
</html>`;

  const text = rows.map(([label, value]) => `${label}: ${value}`).join("\n");

  return { html, text };
}
