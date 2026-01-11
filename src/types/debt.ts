export type DebtStatus = "active" | "paid" | "overdue";

export type Debt = {
  id: string;
  shopId: string;

  fullName: string;
  phone: string;
  amount: number;

  createdAt: string;
  dueDate: string;

  sendSmsOnCreate: boolean;
  sendSmsOnDueDate: boolean;

  note?: string;
  includeNoteInSms: boolean;

  status: DebtStatus;
  folderId: string;

  ownerNotifiedOnCreate: boolean;
  ownerNotifiedOnDueDate: boolean;
};


export type DebtDB = {
  id: string;
  shop_id: string;

  full_name: string;
  phone: string;
  amount: number;

  due_date: string;
  note?: string;

  created_at: string;
};
