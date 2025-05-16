import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db/db"; // your drizzle instance
import { user, session, account, verification } from "@/db/schema/auth-schema";
import { nextCookies } from "better-auth/next-js";
import { admin } from "better-auth/plugins";
import { EmailTemplate } from "@daveyplate/better-auth-ui/server";
import { Resend } from "resend";
import { reactResetPasswordEmail } from "./email/reset-password";

const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: "pg", // or "mysql", "sqlite",
		schema: {
			user,
			session,
			account,
			verification,
		},
	}),
	emailAndPassword: {
		enabled: true,
		async sendResetPassword({ user, url }) {
			await resend.emails.send({
				from: "Acme <onboarding@resend.dev>",
				to: user.email,
				subject: "Reset your password",
				react: reactResetPasswordEmail({
					username: user.email,
					resetLink: url,
				}),
			});
		},
	},
	emailVerification: {
		sendVerificationEmail: async ({ user, url, token }, request) => {
			const name = user.name || user.email.split("@")[0];

			await resend.emails.send({
				from: "Acme <onboarding@resend.dev>",
				to: user.email,
				subject: "Verify your email address",
				react: EmailTemplate({
					action: "Verify",
					content: `Salam, ${name}! Your verification code is ${token}`,
					heading: "Verify your email address",
					siteName: "Acme",
					baseUrl: "http://localhost:3000",
					url,
				}),
			});
		},
		autoSignInAfterVerification: true,
		sendOnSignUp: true,
	},
	plugins: [nextCookies(), admin()],
});
