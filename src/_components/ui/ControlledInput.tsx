
import React from "react";
import { Controller, Control, FieldValues, Path, RegisterOptions } from "react-hook-form";
import { Input } from "@/_components/ui/input";
import { Label } from "@/_components/ui/label";

interface ControlledInputProps<T extends FieldValues> extends React.InputHTMLAttributes<HTMLInputElement> {
    name: Path<T>;
    control: Control<T>;
    label?: string;
    rules?: RegisterOptions<T>;
    error?: string;
}

export const ControlledInput = <T extends FieldValues>({
    name,
    control,
    label,
    rules,
    error,
    className = "",
    ...props
}: ControlledInputProps<T>) => {
    return (
        <div className="grid w-full items-center gap-1.5">
            {label && (
                <Label htmlFor={name}>
                    {label}
                </Label>
            )}
            <Controller
                name={name}
                control={control}
                rules={rules}
                render={({ field }) => (
                    <Input
                        {...field}
                        {...props}
                        id={name}
                        className={error ? "border-destructive focus-visible:ring-destructive" : ""}
                    />
                )}
            />
            {error && (
                <p className="text-sm font-medium text-destructive">
                    {error}
                </p>
            )}
        </div>
    );
};
