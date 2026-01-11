"use client";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useFolders } from "@/context/FolderContext";
import { EditModeFolderRow } from "./EditModeFolderRow";

export function EditModeFolders() {
  const { folders, reorderFolders } = useFolders();

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 150, tolerance: 5 },
    })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = folders.findIndex((f) => f.id === active.id);
    const newIndex = folders.findIndex((f) => f.id === over.id);

    const updated = [...folders];
    const [moved] = updated.splice(oldIndex, 1);
    updated.splice(newIndex, 0, moved);

    reorderFolders(updated);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={folders.map((f) => f.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-2 px-4 py-2">
          {folders.map((folder) => (
            <EditModeFolderRow key={folder.id} folder={folder} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
