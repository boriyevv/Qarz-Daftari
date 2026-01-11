import { Plan } from "@/types/plan";

export const PLANS: Record<string, Plan> = {
  free: {
    type: "free",
    maxDebts: 30,
    smsEnabled: false,
  },
  plus: {
    type: "plus",
    maxDebts: 300,
    smsEnabled: true,
  },
  pro: {
    type: "pro",
    maxDebts: Infinity,
    smsEnabled: true,
  },
};
