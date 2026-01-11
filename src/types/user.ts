export type UserRole = "owner" | "staff";

export type User = {
  id: string;
  fullName: string;
  phone: string;

  shopId: string;   // Qaysi do‘konga tegishli
  role: UserRole;

  createdAt: string;
};
