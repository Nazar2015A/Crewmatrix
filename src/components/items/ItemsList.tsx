import { useItemsStore } from "@/store/useItemsStore";
import { ItemRow } from "./ItemRow";

export const ItemsList = () => {
  const { items, removeItem } = useItemsStore();

  return (
    <div className="mt-4 overflow-hidden rounded-lg border border-input">
      <div className="hidden grid-cols-[1fr_auto_auto_auto] gap-4 bg-muted/60 px-4 py-3 text-sm font-medium text-foreground md:grid">
        <span>Item</span>
        <span className="min-w-[80px]">Unit</span>
        <span className="min-w-[100px]">Labor Unit Rate</span>
        <span className="w-9" aria-hidden />
      </div>
      {items.length === 0 ? (
        <p className="py-8 px-2 text-center text-sm text-muted-foreground">
          No items yet. Add an item above.
        </p>
      ) : (
        <ul className="flex flex-col">
          {items.map((item) => (
            <li key={item.id} className="border-t border-input">
              <ItemRow item={item} onRemove={removeItem} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
