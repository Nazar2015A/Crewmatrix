import type { UNIT_OPTIONS } from "@/constants/options";

export type Unit = (typeof UNIT_OPTIONS)[number];

export type ItemType = {
  id: string;
  item: string;
  unit: Unit;
  laborUnitRate: number;
};

export type ItemFormValues = {
  item: string;
  laborUnitRate: number;
  unit: Unit | "";
};
