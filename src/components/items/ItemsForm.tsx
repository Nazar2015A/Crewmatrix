import { useState, useCallback } from "react";
import { useItemsStore } from "@/store/useItemsStore";
import { itemFormSchema, MIN_LABOR_UNIT_RATE } from "@/schemas/itemSchema";
import type { ItemFormValues } from "@/types/item";

import { ItemsList } from "./ItemsList";
import { cn } from "@/utils/tailwind";
import { UNIT_OPTIONS } from "@/constants/options";
import { DollarIcon } from "@/assets/icons";
import {
  Button,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui";

const initialFormValues: ItemFormValues = {
  item: "",
  unit: "",
  laborUnitRate: 0,
};

const isAddDisabled = (values: ItemFormValues) => {
  if (!values.item.trim()) return true;
  if (!values.unit) return true;
  if (values.laborUnitRate < MIN_LABOR_UNIT_RATE) return true;
  return false;
};

export const ItemsForm = () => {
  const [formValues, setFormValues] =
    useState<ItemFormValues>(initialFormValues);
  const { addItem } = useItemsStore();

  const handleAddItem = useCallback(() => {
    if (!formValues.unit) return;
    const result = itemFormSchema.safeParse({
      item: formValues.item,
      unit: formValues.unit,
      laborUnitRate: formValues.laborUnitRate,
    });
    if (!result.success) return;
    addItem(result.data);
    setFormValues(initialFormValues);
  }, [formValues, addItem]);

  const addDisabled = isAddDisabled(formValues);

  return (
    <div className="w-full max-w-2xl space-y-0">
      <div className="rounded-lg border border-input bg-card p-4 shadow-sm">
        <h2 className="mb-4 text-base font-semibold text-foreground">
          Primary Items
        </h2>
        <div
          className={cn(
            "grid gap-4",
            "grid-cols-1 md:grid-cols-[1fr_auto_auto_auto]",
            "items-end",
          )}
        >
          <div className="space-y-2">
            <Label htmlFor="item-input">Select Item</Label>
            <Input
              id="item-input"
              type="text"
              placeholder="Select"
              value={formValues.item}
              onChange={(e) =>
                setFormValues((prev) => ({ ...prev, item: e.target.value }))
              }
              aria-required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="unit-select">Unit</Label>
            <Select
              value={formValues.unit}
              onValueChange={(value) =>
                setFormValues((prev) => ({
                  ...prev,
                  unit: value as ItemFormValues["unit"],
                }))
              }
            >
              <SelectTrigger id="unit-select" className="w-full md:w-[140px]">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {UNIT_OPTIONS.map((unit) => (
                  <SelectItem key={unit} value={unit}>
                    {unit}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="labor-rate-input">Enter Labor Unit Rate</Label>
            <div className="relative flex w-full items-center">
              <DollarIcon className="pointer-events-none absolute left-3 text-muted-foreground" />
              <Input
                id="labor-rate-input"
                type="number"
                min={MIN_LABOR_UNIT_RATE}
                step="0.01"
                placeholder="0"
                value={
                  formValues.laborUnitRate === 0 ? "" : formValues.laborUnitRate
                }
                onChange={(e) => {
                  const raw = e.target.value;
                  const num = raw === "" ? 0 : Number.parseFloat(raw);
                  setFormValues((prev) => ({
                    ...prev,
                    laborUnitRate: Number.isNaN(num) ? 0 : num,
                  }));
                }}
                className="pl-8"
                aria-required
              />
            </div>
          </div>
          <div className="flex justify-end md:justify-start">
            <Button
              type="button"
              onClick={handleAddItem}
              disabled={addDisabled}
              className="w-full md:w-auto"
            >
              Add Item
            </Button>
          </div>
        </div>
      </div>
      <ItemsList />
    </div>
  );
};
