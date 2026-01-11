import { Plan } from "@/types/plan";

export const plans: Plan[] = [
  {

    type: "free",
    maxDebts: 20,
    smsEnabled: false,
  },
  {

    type: "plus",
    maxDebts: 300,
    smsEnabled: true,
  },
  {

    type: "pro",
    maxDebts: 999999,
    smsEnabled: true,
  },
];
