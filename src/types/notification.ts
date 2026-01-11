export type NotificationType =
  | "debt_created"
  | "debt_due_today"
  | "debt_overdue"
  | "sms_sent"
  | "sms_failed";

export type Notification = {
  id: string;
  type: NotificationType;
  title: string;
  description?: string;
  createdAt: string;
  read: boolean;
};