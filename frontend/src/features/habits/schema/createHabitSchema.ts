import {z} from "zod";

export const createHabitSchema = z.object({
    name: z.string().min(1),

    description: z.string().optional(),

    habit_type: z.enum(["boolean", "number", "timer", "rating"]),

    target_value: z.number().optional(),

    color: z.string().optional(),
});

export type CreateHabitFormValues = z.infer<typeof createHabitSchema>;
