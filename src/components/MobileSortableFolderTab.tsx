"use client";

import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Folder } from "@/types/folder";
import { useFolders } from "@/context/FolderContext";
import { FolderActionSheet } from "@/components/FolderActionSheet";

export function MobileSortableFolderTab({ folder }: { folder: Folder }) {
  const { activeFolderId, setActiveFolderId } = useFolders();
  const [showMenu, setShowMenu] = useState(false);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
  } = useSortable({ id: folder.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        className={`mobile-dnd flex items-center gap-2 px-3 py-1 rounded-full whitespace-nowrap mobile-dnd
          ${
            activeFolderId === folder.id
              ? "bg-black text-white"
              : "bg-gray-100"
          }`}
      >
        {/* DRAG HANDLE */}
        <div
          {...attributes}
          {...listeners}
          className="cursor-grab text-gray-400 select-none px-1"
        >
          ☰
        </div>

        {/* OPEN FOLDER */}
        <div
          role="button"
          onClick={() => setActiveFolderId(folder.id)}
          className="flex-1 text-sm"
        >
          {folder.name}
        </div>

        {/* MENU */}
        <div
          role="button"
          onClick={() => setShowMenu(true)}
          className="px-2 text-gray-500"
        >
          ⋮
        </div>
      </div>

      {showMenu && (
        <FolderActionSheet
          folder={folder}
          onClose={() => setShowMenu(false)}
        />
      )}
    </>
  );
}
