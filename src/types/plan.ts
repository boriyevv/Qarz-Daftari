export type PlanType = "free" | "plus" | "pro";

export type Plan = {
  type: PlanType;

  maxDebts: number;      // nechta qarz yozish mumkin
  smsEnabled: boolean;  // sms yoqilganmi
};
