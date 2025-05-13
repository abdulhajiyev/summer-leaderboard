import type { Metadata } from "next";
import { Geist, Geist_Mono, Work_Sans } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { ThemeProvider } from "@/components/theme-provider";
import clsx from "clsx";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

const workSans = Work_Sans({
	subsets: ["latin", "latin-ext", "vietnamese"],
	display: "swap",
	variable: "--font-work-sans",
});

export const metadata: Metadata = {
	title: "Summer Leaderboard",
	description: "Summer Tour Leaderboard Application",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ClerkProvider>
			<html
				lang="en"
				suppressHydrationWarning
				className={clsx("h-full antialiased transition-all", workSans.variable)}
			>
				<body
				// className={`${geistSans.variable} ${geistMono.variable}  antialiased flex flex-col`}
				>
					<ThemeProvider
						attribute="class"
						defaultTheme="light"
						enableSystem
						disableTransitionOnChange
					>
						<Navbar />
						<main className="flex flex-col min-h-[calc(100vh-10rem-2px)]">
							{children}
						</main>
						<Footer />
					</ThemeProvider>
				</body>
			</html>
		</ClerkProvider>
	);
}
