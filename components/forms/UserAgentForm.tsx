"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { agents } from "@/data/agents";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
	FormDescription,
} from "@/components/ui/form";
import {
	Popover,
	PopoverTrigger,
	PopoverContent,
} from "@/components/ui/popover";

const FormSchema = z.object({
	firstName: z.string().nonempty("Please enter your name."),
	lastName: z.string().nonempty("Please enter your surname."),
	agent: z.string().nonempty("Please select an agent."),
});

type FormValues = z.infer<typeof FormSchema>;

export function UserAgentForm() {
	const form = useForm<FormValues>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			firstName: "",
			lastName: "",
			agent: "",
		},
	});

	const onSubmit = (data: FormValues) => {
		toast({
			title: "Submission Successful",
			description: (
				<pre className="mt-2 bg-slate-950 p-4 rounded-md">
					<code className="text-white">{JSON.stringify(data, null, 2)}</code>
				</pre>
			),
		});
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
							<FormLabel>Surname</FormLabel>
							<FormControl>
								<Input placeholder="Enter your surname" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="agent"
					render={({ field }) => (
						<FormItem className="flex flex-col">
							<FormLabel>Agent</FormLabel>
							<Popover>
								<PopoverTrigger asChild>
									<FormControl>
										<Button
											variant="outline"
											role="combobox"
											className={cn(
												"w-[200px] justify-between",
												!field.value && "text-muted-foreground",
											)}
										>
											{field.value || "Select an agent"}
											<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
										</Button>
									</FormControl>
								</PopoverTrigger>
								<PopoverContent className="w-[200px] p-0">
									<Command>
										<CommandInput placeholder="Search agents..." />
										<CommandList>
											<CommandEmpty>No agents found.</CommandEmpty>
											<CommandGroup>
												{agents.map((agent) => (
													<CommandItem
														key={agent}
														value={agent}
														onSelect={(value) => form.setValue("agent", value)}
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

				<Button type="submit">Submit</Button>
			</form>
		</Form>
	);
}
