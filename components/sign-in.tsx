"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { signIn } from "@/lib/auth-client";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";

// Zod schema for sign-in form
const signInSchema = z.object({
	email: z.string().email({ message: "Yanlış e-poçt" }),
	password: z.string().min(1, { message: "Şifrə tələb olunur" }),
	remember: z.boolean(),
});

export default function SignIn() {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const form = useForm<z.infer<typeof signInSchema>>({
		resolver: zodResolver(signInSchema),
		defaultValues: { email: "", password: "", remember: false },
	});

	const onSubmit = async (data: z.infer<typeof signInSchema>) => {
		setLoading(true);
		await signIn.email(
			{ email: data.email, password: data.password },
			{
				onError: (ctx) => {
					if (ctx.error.status === 403) {
						toast.error("Zəhmət olmasa e-poçt ünvanınızı təsdiq edin");
					}
					if (ctx.error.code === "INVALID_EMAIL") {
						toast.error("Yanlış e-poçt");
					}
					if (ctx.error.code === "INVALID_EMAIL_OR_PASSWORD") {
						toast.error("Yanlış e-poçt və ya şifrə");
					}
				},
				onResponse: () => {
					setLoading(false);
				},
				onSuccess: () => {
					router.push("/dashboard");
					router.refresh();
				},
			},
		);
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<Card className="max-w-md rounded-none">
					<CardHeader>
						<CardTitle className="text-lg md:text-xl">Daxil ol</CardTitle>
						<CardDescription className="text-xs md:text-sm">
							Hesabınıza daxil olmaq üçün e-poçtunuzu daxil edin
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="grid gap-4">
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input placeholder="E-poçt daxil edin" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem>
										<div className="flex items-center justify-between">
											<FormLabel>Şifrə</FormLabel>
											<Link href="#" className="text-sm underline">
												Forgot your password?
											</Link>
										</div>
										<FormControl>
											<Input
												type="password"
												placeholder="Şifrə daxil edin"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="remember"
								render={({ field }) => (
									<FormItem className="flex items-center gap-2">
										<FormControl>
											<Checkbox
												checked={field.value}
												onCheckedChange={field.onChange}
											/>
										</FormControl>
										<FormLabel>Yadda saxla</FormLabel>
									</FormItem>
								)}
							/>

							<Button
								type="submit"
								className="w-full cursor-pointer"
								disabled={loading}
							>
								{loading ? (
									<Loader2 size={16} className="animate-spin" />
								) : (
									"Daxil ol"
								)}
							</Button>
						</div>
					</CardContent>
				</Card>
			</form>
		</Form>
	);
}
