"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { createClient } from "@/lib/supabaseClient";
import { Folder } from "@/types/folder";
import { useShop } from "@/context/ShopContext";

type FolderContextType = {
  folders: Folder[];
  activeFolderId: string | null;
  setActiveFolderId: (id: string) => void;

  editMode: boolean;
  setEditMode: (v: boolean) => void;

  addFolder: (name: string) => Promise<void>;
  renameFolderById: (id: string, name: string) => Promise<void>;
  deleteFolderById: (id: string) => Promise<void>;
  reorderFolders: (newOrder: Folder[]) => Promise<void>;
};

const FolderContext = createContext<FolderContextType | null>(null);

export function FolderProvider({ children }: { children: React.ReactNode }) {
  const { shop, loading: shopLoading } = useShop();

  const [folders, setFolders] = useState<Folder[]>([]);
  const [activeFolderId, setActiveFolderId] = useState<string | null>(null);
  const [editMode, setEditMode] = useState(false);

  // Load folders when shop is ready
  useEffect(() => {
    if (shopLoading) return;

    if (!shop) {
      setFolders([]);
      setActiveFolderId(null);
      return;
    }

    const supabase = createClient();

    supabase
      .from("folders")
      .select("*")
      .eq("shop_id", shop.id)
      .order("order")
      .then(({ data, error }) => {
        if (error) {
          alert("Folder load error: " + error.message);
          console.error("Folder load error:", error);
          return;
        }

        if (!data) return;

        setFolders(data);

        const defaultFolder = data.find((f) => f.isDefault);
        setActiveFolderId(defaultFolder?.id ?? data[0]?.id ?? null);
      });
  }, [shop, shopLoading]);

  const addFolder = async (name: string) => {
    if (!shop) return;

    const supabase = createClient();
    const order = folders.length;

    const { data, error } = await supabase
      .from("folders")
      .insert({
        shop_id: shop.id,
        name,
        order,
        is_default: false,
      })
      .select()
      .single();

    if (error) throw error;

    setFolders((f) => [...f, data]);
  };

  const renameFolderById = async (id: string, name: string) => {
    const supabase = createClient();
    await supabase.from("folders").update({ name }).eq("id", id);
    setFolders((f) => f.map((x) => (x.id === id ? { ...x, name } : x)));
  };

  const deleteFolderById = async (id: string) => {
    const folder = folders.find((f) => f.id === id);
    if (!folder || folder.isDefault) return;

    const supabase = createClient();
    await supabase.from("folders").delete().eq("id", id);
    setFolders((f) => f.filter((x) => x.id !== id));

    if (activeFolderId === id) {
      const def = folders.find((f) => f.isDefault);
      setActiveFolderId(def?.id ?? null);
    }
  };

  const reorderFolders = async (newOrder: Folder[]) => {
    setFolders(newOrder);

    const updates = newOrder.map((f, i) => ({
      id: f.id,
      order: i,
    }));

    const supabase = createClient();
    await supabase.from("folders").upsert(updates);
  };

  return (
    <FolderContext.Provider
      value={{
        folders,
        activeFolderId,
        setActiveFolderId,
        editMode,
        setEditMode,
        addFolder,
        renameFolderById,
        deleteFolderById,
        reorderFolders,
      }}
    >
      {children}
    </FolderContext.Provider>
  );
}

export function useFolders() {
  const ctx = useContext(FolderContext);
  if (!ctx) throw new Error("useFolders must be inside FolderProvider");
  return ctx;
}