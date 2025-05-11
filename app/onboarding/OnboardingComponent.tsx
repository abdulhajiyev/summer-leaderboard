// app/onboarding/OnboardingComponent.tsx
"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useState } from "react";

import { agents } from "@/data/agents";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Popover,
	PopoverTrigger,
	PopoverContent,
} from "@/components/ui/popover";
import {
	Command,
	CommandInput,
	CommandEmpty,
	CommandList,
	CommandGroup,
	CommandItem,
} from "@/components/ui/command";
import { Check, ChevronsUpDown } from "lucide-react";

import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormDescription,
	FormMessage,
} from "@/components/ui/form";

import { completeOnboarding } from "./_actions";

const FormSchema = z.object({
	firstName: z.string().nonempty("Please enter your first name."),
	lastName: z.string().nonempty("Please enter your last name."),
	companyName: z.string().nonempty("Please enter your company name."),
	agent: z.string().nonempty("Please select an agent."),
});
type FormValues = z.infer<typeof FormSchema>;

export default function OnboardingComponent() {
	const { user } = useUser();
	const router = useRouter();
	const [file, setFile] = useState<File | null>(null);
	const form = useForm<FormValues>({
		resolver: zodResolver(FormSchema),
		defaultValues: { firstName: "", lastName: "", companyName: "", agent: "" },
	});

	const onSubmit = async (values: FormValues) => {
		// build a FormData so the server action can parse it
		const fd = new FormData();
		for (const [k, v] of Object.entries(values)) {
			if (v) {
				fd.set(k, v);
			}
		}

		// include profile image if selected
		if (file) {
			fd.set("image", file);
		}

		const res = await completeOnboarding(fd);
		if (res.error) {
			toast.error(res.error);
		} else {
			await user?.reload();
			router.push("/");
		}
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-6 max-w-md mx-auto"
			>
				<FormField
					control={form.control}
					name="firstName"
					render={({ field }) => (
						<FormItem>
							<FormLabel>First Name</FormLabel>
							<FormControl>
								<Input placeholder="Enter your first name" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="lastName"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Last Name</FormLabel>
							<FormControl>
								<Input placeholder="Enter your last name" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="companyName"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Company Name</FormLabel>
							<FormControl>
								<Input placeholder="Enter your company name" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="agent"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Agent</FormLabel>
							<Popover>
								<PopoverTrigger asChild>
									<FormControl>
										<Button
											variant="outline"
											className={cn(
												"w-full justify-between",
												!field.value && "text-muted-foreground",
											)}
										>
											{field.value || "Select an agent"}
											<ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
										</Button>
									</FormControl>
								</PopoverTrigger>
								<PopoverContent className="w-full p-0">
									<Command>
										<CommandInput placeholder="Search agents..." />
										<CommandList>
											<CommandEmpty>No agents found.</CommandEmpty>
											<CommandGroup>
												{agents.map((agent) => (
													<CommandItem
														key={agent}
														value={agent}
														onSelect={(val) => form.setValue("agent", val)}
													>
														{agent}
														<Check
															className={cn(
																"ml-auto",
																field.value === agent
																	? "opacity-100"
																	: "opacity-0",
															)}
														/>
													</CommandItem>
												))}
											</CommandGroup>
										</CommandList>
									</Command>
								</PopoverContent>
							</Popover>
							<FormDescription>Choose your preferred agent.</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* profile image upload */}
				<FormItem>
					<FormLabel>Profile Image</FormLabel>
					<FormControl>
						<input
							type="file"
							accept="image/*"
							onChange={(e) => setFile(e.target.files?.[0] || null)}
						/>
					</FormControl>
					<FormDescription>Please upload a profile image.</FormDescription>
				</FormItem>

				<Button type="submit" className="w-full">
					Complete Setup
				</Button>
			</form>
		</Form>
	);
}
