import { Shop } from "@/types/shop";

export type ShopStatus = "ACTIVE" | "GRACE" | "BLOCKED";

export function getShopStatus(shop: Shop): ShopStatus {
  const today = new Date().toISOString().slice(0, 10);

  if (shop.force_active) return "ACTIVE";

  if (shop.trial_until&& today <= shop.trial_until) return "ACTIVE";

  if (shop.paid_until && today <= shop.paid_until) return "ACTIVE";

  if (shop.grace_until && today <= shop.grace_until) return "GRACE";

  return "BLOCKED";
}
