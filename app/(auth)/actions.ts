"use server";

import { validatedAction } from "@/lib/action-helpers";
import { auth } from "@/lib/auth";
import { LoginSchema, SignUpSchema } from "@/lib/types";
import { redirect } from "next/navigation";
import { APIError } from "better-auth/api";
import type { ActionState } from "@/lib/action-helpers";

export const signUpEmail = validatedAction(SignUpSchema, async (data) => {
	const { email, password, name } = data;

	await auth.api.signUpEmail({
		body: {
			email,
			password,
			name,
		},
	});

	redirect("/dashboard");
});

export const loginEmail = validatedAction<typeof LoginSchema, ActionState>(
	LoginSchema,
	async (data) => {
		const { email, password } = data;
		try {
			await auth.api.signInEmail({ body: { email, password } });
			redirect("/dashboard");
		} catch {
			// Return error and preserve input values
			return { error: "Invalid email or password", email, password };
		}
	},
);
