"use client";

import { useFolders } from "@/context/FolderContext";
import { Folder } from "@/types/folder";

export function FolderActionSheet({
  folder,
  onClose,
}: {
  folder: Folder;
  onClose: () => void;
}) {
  const { renameFolderById, deleteFolderById } = useFolders();

  return (
    <div className="fixed inset-0 bg-black/40 z-50">
      <div className="absolute bottom-0 w-full bg-white rounded-t-xl p-4 space-y-3">
        <p className="font-semibold">{folder.name}</p>

        <button
          onClick={() => {
            const name = prompt("Yangi nom:");
            if (name) renameFolderById(folder.id, name);
            onClose();
          }}
          className="w-full py-3 border rounded"
        >
          ✏️ Nomini o‘zgartirish
        </button>

        {!folder.isDefault && (
          <button
            onClick={() => {
              if (confirm("Folder o‘chiriladi")) {
                deleteFolderById(folder.id);
              }
              onClose();
            }}
            className="w-full py-3 text-red-600 border rounded"
          >
            🗑 Folderni o‘chirish
          </button>
        )}

        <button
          onClick={onClose}
          className="w-full py-3 text-gray-500"
        >
          Bekor qilish
        </button>
      </div>
    </div>
  );
}
