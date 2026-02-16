import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ItemType } from "@/types/item";
import { generateRandomId } from "@/utils/generateRandomId";
import { ITEMS_STORE } from "@/constants/localStorage";

type ItemsState = {
  items: ItemType[];
  addItem: (item: Omit<ItemType, "id">) => void;
  removeItem: (id: string) => void;
};

export const useItemsStore = create<ItemsState>()(
  persist(
    (set) => ({
      items: [],

      addItem: (item) =>
        set((state) => ({
          items: [
            ...state.items,
            {
              ...item,
              id: generateRandomId(),
            },
          ],
        })),
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        })),
    }),
    {
      name: ITEMS_STORE,
    },
  ),
);
