import { useShop } from "@/context/ShopContext";
import { getShopStatus, ShopStatus } from "@/lib/shopStatus";

export function useShopStatus(): ShopStatus {
  const { shop } = useShop();

  if (!shop) return "BLOCKED";

  return getShopStatus(shop);
}
