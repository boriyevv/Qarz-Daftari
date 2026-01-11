// src/types/shop.ts
export type ShopPlan = "free" | "plus" | "pro";

export type Shop = {
  id: string;

  name: string;

  ownerId: string; // MUHIM: user id

  plan: ShopPlan;

  isBlocked: boolean;

  debtLimit: number; // free: masalan 30

  createdAt: string;
};
