"use client";

import { useFolders } from "@/context/FolderContext";
import { EditModeFolders } from "@/components/EditModeFolders";

export function MobileFolderTabs() {
  const {
    folders,
    activeFolderId,
    setActiveFolderId,
    addFolder,
    editMode,        // ✅ Context'dan olamiz
    setEditMode,     // ✅ Context'dan olamiz
  } = useFolders();

  // ❌ BU QATORNI O'CHIRING:
  // const [editMode, setEditMode] = useState(false);

  return (
    <div className="md:hidden bg-white border-b">
      {/* Header */}
      <div className="flex justify-between items-center px-4 py-2">
        <span className="font-semibold">Folders</span>

        <button
          onClick={() => setEditMode(!editMode)}
          className="text-sm text-blue-600"
        >
          {editMode ? "Done" : "Edit"}
        </button>
      </div>

      {/* NORMAL MODE – scrollable tabs */}
      {!editMode && (
        <div className="w-full overflow-x-auto">
          <div className="flex gap-2 px-4 py-2 w-max min-w-full">
            {folders.map((folder) => (
              <button
                key={folder.id}
                onClick={() => setActiveFolderId(folder.id)}
                className={`px-3 py-1 rounded-full whitespace-nowrap
                  ${
                    activeFolderId === folder.id
                      ? "bg-black text-white"
                      : "bg-gray-100"
                  }`}
              >
                {folder.name}
              </button>
            ))}

            <button
              onClick={() => {
                const name = prompt("Yangi folder nomi");
                if (name) addFolder(name);
              }}
              className="px-3 py-1 rounded-full border"
            >
              +
            </button>
          </div>
        </div>
      )}

      {/* EDIT MODE – vertical drag + menu */}
      {editMode && <EditModeFolders />}
    </div>
  );
}