import logger from '../utils/logger';

interface SendCouponEmailInput {
  to: string;
  name: string;
  couponCode: string;
  reward: string;
  expiresAt: Date;
  restaurantName: string;
}

/**
 * Email service - Currently a stub
 * TODO: Implement real email sending with emBlue in Phase 6
 */
export async function sendCouponEmail(input: SendCouponEmailInput) {
  const { to, name, couponCode, reward, expiresAt, restaurantName } = input;

  // For now, just log the email
  logger.info({
    action: 'send_coupon_email',
    to,
    name,
    couponCode,
    reward,
    expiresAt,
    restaurantName,
  });

  logger.info(`📧 [EMAIL STUB] Would send email to: ${to}`);
  logger.info(`   Subject: ¡Tu cupón de ${restaurantName} está listo!`);
  logger.info(`   Code: ${couponCode}`);
  logger.info(`   Reward: ${reward}`);
  logger.info(`   Expires: ${expiresAt.toLocaleDateString()}`);

  // Simulate email sent successfully
  return {
    success: true,
    messageId: `stub-${Date.now()}`,
  };
}

export async function sendReminderEmail(
  to: string,
  couponCode: string,
  expiresAt: Date
) {
  logger.info({
    action: 'send_reminder_email',
    to,
    couponCode,
    expiresAt,
  });

  logger.info(`📧 [EMAIL STUB] Would send reminder to: ${to}`);

  return {
    success: true,
    messageId: `stub-reminder-${Date.now()}`,
  };
}

interface SendLandingLeadNotificationInput {
  name: string;
  email: string;
  phone?: string;
  message?: string;
}

export async function sendLandingLeadNotification(
  input: SendLandingLeadNotificationInput
) {
  const { name, email, phone, message } = input;
  const recipient = 'sebastian.a.gomez@outlook.com.ar';

  logger.info({
    action: 'send_landing_lead_notification',
    recipient,
    leadData: { name, email, phone, message },
  });

  logger.info(`📧 [EMAIL STUB] Notificación de lead a: ${recipient}`);
  logger.info(`   Lead: ${name} <${email}>`);
  if (phone) logger.info(`   Teléfono: ${phone}`);
  if (message) logger.info(`   Mensaje: ${message}`);

  // TODO: Implement with nodemailer or your email provider
  return {
    success: true,
    messageId: `stub-landing-${Date.now()}`,
  };
}
