"use client";

import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Folder } from "@/types/folder";
import { useFolders } from "@/context/FolderContext";

type Props = {
  folder: Folder;
};

export function SortableFolder({ folder }: Props) {
  const {
    activeFolderId,
    setActiveFolderId,
    renameFolderById,
    deleteFolderById,
  } = useFolders();

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: folder.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(folder.name);

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center gap-2 px-3 py-2 rounded text-sm
        ${
          activeFolderId === folder.id
            ? "bg-black text-white"
            : "hover:bg-gray-100"
        }`}
    >
      {/* DRAG */}
      <span
        {...attributes}
        {...listeners}
        className="cursor-grab text-gray-400 select-none"
      >
        ☰
      </span>

      {/* NAME */}
      {editing ? (
        <input
          value={name}
          autoFocus
          onChange={(e) => setName(e.target.value)}
          onBlur={async () => {
            if (name.trim() && name !== folder.name) {
              await renameFolderById(folder.id, name.trim());
            }
            setEditing(false);
          }}
          onKeyDown={async (e) => {
            if (e.key === "Enter") {
              if (name.trim() && name !== folder.name) {
                await renameFolderById(folder.id, name.trim());
              }
              setEditing(false);
            }
          }}
          className="flex-1 bg-transparent border-b outline-none"
        />
      ) : (
        <button
          onClick={() => setActiveFolderId(folder.id)}
          onDoubleClick={() => setEditing(true)}
          className="flex-1 text-left"
        >
          {folder.name}
        </button>
      )}

      {/* DELETE */}
      {!folder.isDefault && (
        <button
          onClick={async () => {
            if (!confirm("Folder o‘chiriladi. Davom etamizmi?")) return;
            await deleteFolderById(folder.id);
          }}
          className="text-red-500 hover:text-red-700"
        >
          ✕
        </button>
      )}
    </div>
  );
}
