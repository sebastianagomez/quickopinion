import prisma from '../config/database';
import { CouponState } from '@prisma/client';

interface CreateLeadInput {
  restaurantId: string;
  name: string;
  email: string;
  phone?: string;
  consent: boolean;
  consentVersion?: string;
  source?: string;
  userIp?: string;
  userAgent?: string;
}

export async function findOrCreateLead(input: CreateLeadInput) {
  // Try to find existing lead
  const existingLead = await prisma.lead.findUnique({
    where: {
      restaurantId_email: {
        restaurantId: input.restaurantId,
        email: input.email,
      },
    },
  });

  if (existingLead) {
    // Update existing lead
    return await prisma.lead.update({
      where: { id: existingLead.id },
      data: {
        name: input.name,
        phone: input.phone || existingLead.phone,
        consent: input.consent,
        consentVersion: input.consentVersion,
        consentTimestamp: new Date(),
        userIp: input.userIp,
        userAgent: input.userAgent,
      },
    });
  }

  // Create new lead
  return await prisma.lead.create({
    data: {
      restaurantId: input.restaurantId,
      name: input.name,
      email: input.email,
      phone: input.phone,
      consent: input.consent,
      consentVersion: input.consentVersion || '1.0',
      consentTimestamp: new Date(),
      source: input.source || 'quiz',
      userIp: input.userIp,
      userAgent: input.userAgent,
    },
  });
}

export async function checkParticipationLimit(
  restaurantId: string,
  email: string,
  hoursLimit: number = 24
): Promise<{ canParticipate: boolean; existingCoupon?: any }> {
  const timeLimit = new Date();
  timeLimit.setHours(timeLimit.getHours() - hoursLimit);

  // Find lead
  const lead = await prisma.lead.findUnique({
    where: {
      restaurantId_email: {
        restaurantId,
        email,
      },
    },
  });

  if (!lead) {
    return { canParticipate: true };
  }

  // Check for active coupon created in last 24h
  const recentCoupon = await prisma.coupon.findFirst({
    where: {
      leadId: lead.id,
      restaurantId,
      state: CouponState.ACTIVE,
      issuedAt: {
        gte: timeLimit,
      },
    },
    orderBy: {
      issuedAt: 'desc',
    },
  });

  if (recentCoupon) {
    return {
      canParticipate: false,
      existingCoupon: recentCoupon,
    };
  }

  return { canParticipate: true };
}
