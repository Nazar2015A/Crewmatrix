import { UNIT_OPTIONS } from "@/constants/options";
import { z } from "zod";

export const MIN_LABOR_UNIT_RATE = 0.01;

export const itemFormSchema = z.object({
  item: z.string().min(1, "Item is required"),
  unit: z.enum(UNIT_OPTIONS, {
    required_error: "Unit is required",
    invalid_type_error: "Unit must be EACH or SQ-M",
  }),
  laborUnitRate: z
    .number({ invalid_type_error: "Labor Unit Rate must be a number" })
    .min(
      MIN_LABOR_UNIT_RATE,
      `Labor Unit Rate must be at least ${MIN_LABOR_UNIT_RATE}`,
    ),
});

export type ItemFormSchema = z.infer<typeof itemFormSchema>;
