"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Folder } from "@/types/folder";
import { useState } from "react";
import { FolderActionSheet } from "@/components/FolderActionSheet";

export function EditModeFolderRow({ folder }: { folder: Folder }) {
    const { setNodeRef, attributes, listeners, transform, transition } =
        useSortable({ id: folder.id });

    const [menu, setMenu] = useState(false);

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <>
            <div
                ref={setNodeRef}
                style={style}
                className="flex items-center justify-between bg-white p-3 rounded shadow-sm"
            >
                <div className="flex items-center gap-2">
                    <span
                        {...attributes}
                        {...listeners}
                        className="cursor-grab text-gray-400 px-2 py-1"
                    >
                        ☰
                    </span>
                    <span>{folder.name}</span>
                </div>

                <button
                    onClick={(e) => {
                        e.stopPropagation();   
                        setMenu(true);
                    }}
                    className="px-3 py-2 text-lg"
                >
                    ⋮
                </button>

            </div>

            {menu && (
                <FolderActionSheet
                    folder={folder}
                    onClose={() => setMenu(false)}
                />
            )}
        </>
    );
}
