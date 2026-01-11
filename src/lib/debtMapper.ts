import { DebtDB } from "@/types/debt";
import { Debt } from "@/types/debt";

export function mapDebtFromDB(row: DebtDB): Debt {
  return {
    id: row.id,
    shopId: row.shop_id,

    fullName: row.full_name,
    phone: row.phone,
    amount: row.amount,

    createdAt: row.created_at,
    dueDate: row.due_date,

    sendSmsOnCreate: false,
    sendSmsOnDueDate: false,
    includeNoteInSms: false,

    note: row.note,

    status: "active",
    folderId: "default",

    ownerNotifiedOnCreate: false,
    ownerNotifiedOnDueDate: false,
  };
}
