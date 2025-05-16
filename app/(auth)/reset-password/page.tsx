"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { PasswordInput } from "@/components/ui/password-input";
import { authClient } from "@/lib/auth-client";
import { AlertCircle, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { useState } from "react";

// --- add a schema that enforces matching passwords ---
const resetPasswordSchema = z
	.object({
		newPassword: z.string().min(6, "Password must be at least 6 characters"),
		confirmPassword: z.string(),
	})
	.refine((data) => data.newPassword === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	});

type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;

export default function ResetPassword() {
	const router = useRouter();

	// --- initialise RHF with our Zod schema & defaults ---
	const form = useForm<ResetPasswordValues>({
		resolver: zodResolver(resetPasswordSchema),
		defaultValues: { newPassword: "", confirmPassword: "" },
	});

	// RHF will toggle form.formState.isSubmitting automatically
	const onSubmit = async (values: ResetPasswordValues) => {
		const token = new URLSearchParams(window.location.search).get("token")!;
		const res = await authClient.resetPassword({
			newPassword: values.newPassword,
			token,
		});
		if (res.error) {
			toast.error(res.error.message);
		} else {
			toast.success("Password reset! Please sign in.");
			router.push("/sign-in");
		}
	};

	return (
		<div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)]">
			<Card className="w-[350px]">
				<CardHeader>
					<CardTitle>Reset password</CardTitle>
					<CardDescription>
						Enter new password and confirm it to reset your password
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
							<FormField
								control={form.control}
								name="newPassword"
								render={({ field }) => (
									<FormItem>
										<FormLabel>New password</FormLabel>
										<FormControl>
											<PasswordInput
												{...field}
												placeholder="••••••••"
												autoComplete="new-password"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="confirmPassword"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Confirm password</FormLabel>
										<FormControl>
											<PasswordInput
												{...field}
												placeholder="••••••••"
												autoComplete="new-password"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<Button
								type="submit"
								className="w-full cursor-pointer"
								disabled={form.formState.isSubmitting}
							>
								{form.formState.isSubmitting ? (
									<Loader2 className="mr-2 h-4 w-4 animate-spin" />
								) : (
									"Reset password"
								)}
							</Button>
						</form>
					</Form>
				</CardContent>
			</Card>
		</div>
	);
}
