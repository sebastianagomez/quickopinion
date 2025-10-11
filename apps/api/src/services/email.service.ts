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
