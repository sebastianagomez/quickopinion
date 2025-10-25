import { Request, Response, NextFunction } from 'express';
import { createLandingLead } from '../services/landing.service';
import { sendLandingLeadNotification } from '../services/email.service';
import { AppError } from '../middleware/errorHandler';
import logger from '../utils/logger';
import type { LandingLeadInput } from '../validators/landing.validators';

export async function submitLandingLead(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data: LandingLeadInput = req.body;

    logger.info({
      action: 'landing_lead_submit',
      email: data.email,
    });

    // Save to database
    const lead = await createLandingLead(data);

    // Send notification email
    try {
      await sendLandingLeadNotification({
        name: data.name,
        email: data.email,
        phone: data.phone,
        message: data.message,
      });
    } catch (emailError) {
      logger.error('Failed to send landing lead notification', emailError);
      // Don't fail the request if email fails
    }

    logger.info({
      action: 'landing_lead_created',
      leadId: lead.id,
    });

    res.status(200).json({
      ok: true,
      message: '¡Gracias! Te contactaremos pronto.',
    });
  } catch (error) {
    logger.error('Error creating landing lead', error);
    next(new AppError(500, 'Error al procesar tu solicitud'));
  }
}
