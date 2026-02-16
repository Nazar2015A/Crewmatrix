import type { ItemType } from "@/types/item";
import { cn } from "@/utils/tailwind";
import { formatNumber } from "@/utils/formatNumber";
import { CloseIcon, DollarIcon } from "@/assets/icons";
import { Button } from "../ui";

type ItemRowProps = {
  item: ItemType;
  onRemove: (id: string) => void;
};

export const ItemRow = ({ item, onRemove }: ItemRowProps) => {
  return (
    <div
      className={cn(
        "grid gap-3 px-4 py-3 md:gap-4",
        "grid-cols-1 md:grid-cols-[1fr_auto_auto_auto]",
        "items-center bg-card",
      )}
      data-testid="item-row"
    >
      <div className="flex flex-col gap-1 md:block">
        <span className="text-xs font-medium text-muted-foreground md:hidden">
          Item
        </span>
        <div className="min-w-0 rounded-md border border-input bg-background px-3 py-2 text-sm">
          {item.item}
        </div>
      </div>
      <div className="flex flex-col gap-1 md:block md:min-w-[80px]">
        <span className="text-xs font-medium text-muted-foreground md:hidden">
          Unit
        </span>
        <div className="min-w-0 rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground md:min-w-[80px]">
          {item.unit}
        </div>
      </div>
      <div className="flex flex-col gap-1 md:block md:min-w-[100px]">
        <span className="text-xs font-medium text-muted-foreground md:hidden">
          Labor Unit Rate
        </span>
        <div className="flex min-w-0 items-center rounded-md border border-input bg-background px-3 py-2 text-sm md:min-w-[100px]">
          <DollarIcon />
          <span className="ml-0.5">{formatNumber(item.laborUnitRate)}</span>
        </div>
      </div>
      <div className="flex w-full justify-end md:w-9">
        <Button
          type="button"
          variant="destructive"
          size="sm"
          onClick={() => onRemove(item.id)}
          className="w-full md:hidden"
        >
          Delete
        </Button>

        <Button
          type="button"
          variant="transparent"
          size="icon"
          onClick={() => onRemove(item.id)}
          className="hidden h-8 w-8 shrink-0 md:flex"
        >
          <CloseIcon className="w-3 h-3" />
        </Button>
      </div>
    </div>
  );
};
