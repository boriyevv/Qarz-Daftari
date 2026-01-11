import { Debt } from "@/types/debt";

export const debts: Debt[] = [
  {
    id: "d1",
    shopId: 'Ozod Market',
    fullName: "Ali Karimov",
    phone: "998901234567",
    amount: 500000,

    createdAt: new Date().toISOString(),
    dueDate: "2025-03-20",

    sendSmsOnCreate: true,
    sendSmsOnDueDate: true,

    note: "1 qop sement",
    includeNoteInSms: true,

    status: "active",
    folderId: "1",

    ownerNotifiedOnCreate: true,
    ownerNotifiedOnDueDate: false,
  },
];
