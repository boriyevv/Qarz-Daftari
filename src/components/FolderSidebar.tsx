"use client";

import { useRef, useState } from "react";
import {
  DndContext,
  closestCenter,
  TouchSensor,
  PointerSensor,
  useSensor,
  useSensors
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { useFolders } from "@/context/FolderContext";
import { SortableFolder } from "@/components/SortableFolder";

export function FolderSidebar() {
  const { folders, reorderFolders, addFolder } = useFolders();
  const [newName, setNewName] = useState("");
  const isDraggingRef = useRef(false);

  const handleDragEnd = async (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = folders.findIndex(f => f.id === active.id);
    const newIndex = folders.findIndex(f => f.id === over.id);

    if (oldIndex === -1 || newIndex === -1) return;

    const newOrder = arrayMove(folders, oldIndex, newIndex);
    await reorderFolders(newOrder);
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, // desktop
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 150,     // 150ms bosib turish
        tolerance: 5,  // barmoq biroz qimirlasin
      },
    })
  );

  return (
    <aside className="hidden md:block w-64 border-r p-4 flex flex-col">
      <p className="text-xs font-semibold text-gray-500 mb-2">
        FOLDERLAR
      </p>

      <div className="flex-1 overflow-y-auto">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={() => (isDraggingRef.current = true)}
          onDragEnd={(e) => {
            isDraggingRef.current = false;
            handleDragEnd(e);
          }}
        >
          <SortableContext
            items={folders.map(f => f.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-1">
              {folders.map(folder => (
                <SortableFolder
                  key={folder.id}
                  folder={folder}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </div>

      {/* ADD */}
      <div className="pt-3 border-t space-y-2">
        <input
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          className="border p-2 rounded w-full text-sm"
          placeholder="Yangi folder"
        />
        <button
          onClick={async () => {
            if (!newName.trim()) return;
            await addFolder(newName.trim());
            setNewName("");
          }}
          className="border rounded w-full py-2 text-sm hover:bg-gray-50"
        >
          + Folder qo‘shish
        </button>
      </div>
    </aside>
  );
}
