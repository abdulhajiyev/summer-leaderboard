"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { AlertCircle, ArrowLeft, CheckCircle2, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
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

const forgetPasswordSchema = z.object({
	email: z.string().email({ message: "Please enter a valid email." }),
});

export default function Component() {
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [error, setError] = useState("");

	const form = useForm<z.infer<typeof forgetPasswordSchema>>({
		resolver: zodResolver(forgetPasswordSchema),
		defaultValues: { email: "" },
	});

	const onSubmit = async (values: { email: string }) => {
		setError("");
		try {
			await authClient.forgetPassword({
				email: values.email,
				redirectTo: "/reset-password",
			});
			toast.success("Reset link sent! Check your email.");
			setIsSubmitted(true);
		} catch {
			const msg = "An error occurred. Please try again.";
			toast.error(msg);
			setError(msg);
		}
	};

	if (isSubmitted) {
		return (
			<main className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)]">
				<Card className="w-[350px]">
					<CardHeader>
						<CardTitle>Check your email</CardTitle>
						<CardDescription>
							We've sent a password reset link to your email.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<Alert variant="default">
							<CheckCircle2 className="h-4 w-4" />
							<AlertDescription>
								If you don't see the email, check your spam folder.
							</AlertDescription>
						</Alert>
					</CardContent>
					<CardFooter>
						<Button
							variant="outline"
							className="w-full cursor-pointer"
							onClick={() => {
								setIsSubmitted(false);
								form.reset();
							}}
						>
							<ArrowLeft className="mr-2 h-4 w-4" /> Back to reset password
						</Button>
					</CardFooter>
				</Card>
			</main>
		);
	}

	return (
		<main className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)]">
			<div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
			<Card className="w-[350px]">
				<CardHeader>
					<CardTitle>Forgot password</CardTitle>
					<CardDescription>
						Enter your email to reset your password
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input
												{...field}
												id="email"
												placeholder="Enter your email"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							{error && (
								<Alert variant="destructive">
									<AlertCircle className="h-4 w-4" />
									<AlertDescription>{error}</AlertDescription>
								</Alert>
							)}

							<Button
								className="w-full cursor-pointer"
								type="submit"
								disabled={form.formState.isSubmitting}
							>
								{form.formState.isSubmitting ? (
									<Loader2 className="mr-2 h-4 w-4 animate-spin" />
								) : (
									"Send reset link"
								)}
							</Button>
						</form>
					</Form>
				</CardContent>
				<CardFooter className="flex justify-center">
					<Link href="/sign-in">
						<Button variant="link" className="px-0 cursor-pointer">
							Back to sign in
						</Button>
					</Link>
				</CardFooter>
			</Card>
		</main>
	);
}
