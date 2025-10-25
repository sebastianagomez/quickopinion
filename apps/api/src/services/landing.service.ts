import prisma from '../config/database';
import type { LandingLeadInput } from '../validators/landing.validators';

export async function createLandingLead(data: LandingLeadInput) {
  return await prisma.landingLead.create({
    data: {
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      message: data.message || null,
      origin: 'landing',
    },
  });
}
