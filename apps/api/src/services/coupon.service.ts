import prisma from '../config/database';
import {
  generateCouponCode,
  calculateExpirationDate,
} from '../utils/generateCode';
import { CouponState } from '@prisma/client';

interface CreateCouponInput {
  restaurantId: string;
  restaurantSlug: string;
  leadId: string;
  reward: string;
  expirationDays?: number;
}

export async function createCoupon(input: CreateCouponInput) {
  const {
    restaurantId,
    restaurantSlug,
    leadId,
    reward,
    expirationDays = 30,
  } = input;

  // Generate unique code
  let code = generateCouponCode(restaurantSlug);
  let attempts = 0;
  const maxAttempts = 10;

  // Ensure code is unique
  while (attempts < maxAttempts) {
    const existing = await prisma.coupon.findUnique({
      where: { code },
    });

    if (!existing) {
      break;
    }

    code = generateCouponCode(restaurantSlug);
    attempts++;
  }

  if (attempts >= maxAttempts) {
    throw new Error('Failed to generate unique coupon code');
  }

  // Create coupon
  const coupon = await prisma.coupon.create({
    data: {
      code,
      restaurantId,
      leadId,
      reward,
      state: CouponState.ACTIVE,
      expiresAt: calculateExpirationDate(expirationDays),
      issuedAt: new Date(),
    },
  });

  return coupon;
}

export async function getCouponByCode(code: string) {
  return await prisma.coupon.findUnique({
    where: { code },
    include: {
      lead: {
        select: {
          name: true,
          email: true,
        },
      },
      restaurant: {
        select: {
          name: true,
          slug: true,
        },
      },
    },
  });
}
