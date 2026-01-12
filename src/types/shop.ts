export type ShopPlan = "free" | "plus" | "pro";

export type Shop = {
  id: string;
  name: string;
  plan: ShopPlan;

  trial_until: string | null;
  paid_until: string | null;
  grace_until: string | null;
  force_active: boolean;
};
