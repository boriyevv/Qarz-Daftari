import { Folder } from "@/types/folder";

export const folders: Folder[] = [
  {
    id: "default",
    name: "Qarzdorlar",
    type: "default",
    description: "Barcha umumiy qarzlar",
    createdAt: new Date().toISOString(),
    isActive: true,
    isSystem: true,
  },
  {
    id: "1",
    name: "Ustalar",
    type: "custom",
    createdAt: new Date().toISOString(),
    isActive: true,
    isSystem: false,
  },
];
