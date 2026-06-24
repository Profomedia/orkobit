import {useForm} from "react-hook-form";

import {zodResolver} from "@hookform/resolvers/zod";

import {useCreateHabit} from "../hooks/useCreateHabit";

import {type CreateHabitFormValues, createHabitSchema} from "@/features/habits/schema/createHabitSchema";
import { notify } from "@/utils/notifications/toast";
import {  useNavigate } from "react-router-dom";
import { getApiError } from "@/utils/getApiError";
import Button from "@/components/ui/Button";


const INPUT_STYLES = `
  w-full
  rounded-xl
  border
  border-zinc-800
  bg-zinc-900
  px-4
  py-3
  outline-none
  transition-colors
  focus:border-zinc-600
`;


export default function CreateHabitForm() {
    const mutation = useCreateHabit();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        watch,
        reset,

        formState: {errors},
    } = useForm<CreateHabitFormValues>({
        resolver: zodResolver(createHabitSchema),

        defaultValues: {
            name: "",
            description: "",
            color: "#22c55e",
            habit_type: "boolean",
            target_value: 1,
        },
    });

    const selectedType = watch("habit_type");

    async function onSubmit(values: CreateHabitFormValues) {
        try {
            await notify.promise(mutation.mutateAsync(values), {
                loading: "Creating habit...",
                success: "Habit created",
                error: "Failed to create habit",
            });

            reset();
                navigate(-1)
        } catch (error) {
            notify.error(getApiError(error));

            console.error(error);
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* ---------------------- */}
            {/* Name */}
            {/* ---------------------- */}

            <div className="space-y-1">
                <input
                    {...register("name")}
                    placeholder="Workout"
                    className={INPUT_STYLES}
                />

                {errors.name && (
                    <p className="text-sm text-red-400">
                        {errors.name.message}
                    </p>
                )}
            </div>

            {/* ---------------------- */}
            {/* Description */}
            {/* ---------------------- */}

            <div className="space-y-1">
                <textarea
                    {...register("description")}
                    placeholder="Optional description"
                    rows={4}
                    className={INPUT_STYLES}
                />

                {errors.description && (
                    <p className="text-sm text-red-400">
                        {errors.description.message}
                    </p>
                )}
            </div>

            {/* ---------------------- */}
            {/* Habit Type */}
            {/* ---------------------- */}

            <div className="space-y-1">
                <select {...register("habit_type")} className={INPUT_STYLES}>
                    <option value="boolean">Checkbox</option>

                    <option value="number">Number</option>

                    <option value="timer">Timer</option>

                    <option value="rating">Rating</option>
                </select>

                {errors.habit_type && (
                    <p className="text-sm text-red-400">
                        {errors.habit_type.message}
                    </p>
                )}
            </div>

            {/* ---------------------- */}
            {/* Target Value */}
            {/* ---------------------- */}

            {selectedType !== "boolean" && (
                <div className="space-y-1">
                    <input
                        type="number"
                        step="0.01"
                        {...register("target_value", {
                            valueAsNumber: true,
                        })}
                        placeholder={
                            selectedType === "timer"
                                ? "Target seconds"
                                : selectedType === "rating"
                                  ? "Target rating"
                                  : "Target value"
                        }
                        className={INPUT_STYLES}
                    />

                    {errors.target_value && (
                        <p className="text-sm text-red-400">
                            {errors.target_value.message}
                        </p>
                    )}
                </div>
            )}

            {/* ---------------------- */}
            {/* Submit */}
            {/* ---------------------- */}

            <Button
                type="submit"
                variant="primary"
                fullWidth
                disabled={mutation.isPending}
                isLoading={mutation.isPending}
            >
                {mutation.isPending ? "Creating..." : "Create Habit"}
            </Button>
        </form>
    );
}
