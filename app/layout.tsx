import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { ThemeProvider } from "@/components/theme-provider";
import { SessionProvider } from "@/components/session-context";
import clsx from "clsx";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

const workSans = Work_Sans({
	subsets: ["latin", "latin-ext", "vietnamese"],
	display: "swap",
	variable: "--font-work-sans",
});

export const metadata: Metadata = {
	title: "Summer Leaderboard",
	description: "Summer Tour Leaderboard Application",
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const session = await auth.api.getSession({ headers: await headers() });
	const isUnverified = !!session && !session.user.emailVerified;

	return (
		<html
			lang="en"
			suppressHydrationWarning
			className={clsx("h-full antialiased transition-all", workSans.variable)}
		>
			<body>
				<ThemeProvider
					attribute="class"
					defaultTheme="light"
					enableSystem
					disableTransitionOnChange
				>
					<TooltipProvider>
						<SessionProvider>
							{isUnverified && (
								<div className="left-0 w-full bg-red-600 text-white text-sm text-center py-2 z-50">
									Your email is unverified. Please check your inbox for the
									verification code.
								</div>
							)}
							<Navbar session={session ?? null} />
							<main className="flex flex-col justify-center min-h-[calc(100vh-10rem-2px)]">
								{children}
							</main>
							<Toaster position="top-center" richColors />
							<Footer />
						</SessionProvider>
					</TooltipProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
