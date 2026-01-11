export type DebtDB = {
  id: string;
  shop_id: string;
  folder_id: string;

  full_name: string;
  phone: string;
  amount: number;

  due_date: string;
  note: string | null;

  created_at: string;
};
