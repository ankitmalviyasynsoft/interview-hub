"use client";

import React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { ControlledInput } from "@/_components/ui/ControlledInput";
import paths from "@/navigate/paths";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordSchema, ResetPasswordSchema } from "./reset-password.schema";

export const ResetPasswordComponent = () => {
    const router = useRouter();
    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<ResetPasswordSchema>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
    });

    const onSubmit = async (data: ResetPasswordSchema) => {
        console.log("Reset Password Request:", data);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        // Handle success
        alert("Password has been reset successfully!");
        router.push(paths.signIn());
    };

    return (
        <div className="w-full max-w-md mx-auto p-6">
            <div className="bg-background rounded-2xl shadow-xl border border-border p-8">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-foreground tracking-tight mb-2">
                        Reset Password
                    </h1>
                    <p className="text-muted-foreground">
                        Create a new strong password for your account
                    </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <ControlledInput
                        name="password"
                        control={control}
                        label="New Password"
                        type="password"
                        placeholder="••••••••"
                        error={errors.password?.message}
                    />

                    <ControlledInput
                        name="confirmPassword"
                        control={control}
                        label="Confirm New Password"
                        type="password"
                        placeholder="••••••••"
                        error={errors.confirmPassword?.message}
                    />

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3.5 px-6 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-lg shadow-primary/20 transition-all duration-200 transform hover:-translate-y-0.5 mt-4 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                        {isSubmitting ? "Resetting..." : "Reset Password"}
                    </button>
                </form>

                <div className="mt-8 pt-6 border-t border-border text-center">
                    <p className="text-muted-foreground text-sm">
                        <Link
                            href={paths.signIn()}
                            className="text-primary font-medium hover:underline"
                        >
                            Back to Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};
