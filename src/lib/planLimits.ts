import { ShopPlan } from "@/types/shop";

export const PLAN_LIMITS: Record<ShopPlan, number | null> = {
  free: 50,
  plus: 300,
  pro: null, // unlimited
};
