import { Router } from 'express';
import * as landingController from '../controllers/landing.controller';
import validateRequest from '../middleware/validateRequest';
import { landingLeadSchema } from '../validators/landing.validators';

const router = Router();

// POST /api/landing/lead - Submit landing lead
router.post(
  '/lead',
  validateRequest(landingLeadSchema),
  landingController.submitLandingLead
);

export default router;
