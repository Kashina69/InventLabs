import nodemailer from 'nodemailer';
import logger from '../config/logger.config.js';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: +(process.env.SMTP_PORT || 587),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendLowStockAlert(
  to: string,
  productName: string,
  stock: number,
  threshold: number
) {
  const subject = `⚠️ Low Stock Alert: ${productName}`;
  const text = `${productName} stock is low: ${stock} (threshold: ${threshold}). Please restock.`;

  try {
    await transporter.sendMail({ from: process.env.SMTP_FROM, to, subject, text });
    logger.info(`Low-stock email sent to ${to} for ${productName}`);
  } catch (err) {
    logger.error(`Failed to send low-stock alert: ${err}`);
  }
}
