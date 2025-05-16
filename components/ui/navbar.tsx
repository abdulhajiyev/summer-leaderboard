"use client";

import * as React from "react";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Menu, X, UserRoundCog } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { NavUser } from "../nav-user";
import { ShinyButton } from "@/components/magicui/shiny-button";


import type { Session } from "better-auth";

interface NavbarProps {
	session: Session | null;
}

export function Navbar({session}: NavbarProps) {
	const [isOpen, setIsOpen] = React.useState(false);
	const pathname = usePathname();
	const user = {
		name: session?.user.name || "",
		email: session?.user.email || "",
		avatar: session?.user.image || "",
	}

	return (
		<nav className="sticky top-0 z-40 flex items-center justify-center w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="container flex h-16 items-center">
				<div className="mr-4 flex">
					<Link href="/" className="flex items-center space-x-2">
						<span className="hidden font-bold sm:inline-block">
							Summer Leaderboard
						</span>
					</Link>
				</div>

				{/* Desktop Navigation */}
				<div className="hidden flex-1 items-center justify-between md:flex">
					<div className="flex items-center space-x-4">
						<Link
							href="/"
							className={cn(
								"text-sm font-medium transition-colors hover:text-primary",
								pathname === "/" && "text-primary",
							)}
						>
							Home
						</Link>
						<Link
							href="/leaderboard"
							className={cn(
								"text-sm font-medium transition-colors hover:text-primary",
								pathname.startsWith("/leaderboard") && "text-primary",
							)}
						>
							Leaderboard
						</Link>
						<Link
							href="/about"
							className={cn(
								"text-sm font-medium transition-colors hover:text-primary",
								pathname === "/about" && "text-primary",
							)}
						>
							About
						</Link>
						{session && (
							<Link
								href="/dashboard"
								className={cn(
									"text-sm font-medium transition-colors hover:text-primary",
									pathname.startsWith("/dashboard") && "text-primary",
								)}
							>
								Dashboard
							</Link>
						)}
						{/* <SignedIn>
							<Link
								href="/dashboard"
								className={cn(
									"text-sm font-medium transition-colors hover:text-primary",
									pathname.startsWith("/dashboard") && "text-primary",
								)}
							>
								Dashboard
							</Link>
						</SignedIn> */}
					</div>
					<div className="flex items-center space-x-2 px-4">
						{/* if session is null show sign up and sign in buttons */}
						{session ? (
							<NavUser user={user}/>
						) : (
							<Link href="/sign-in">
								<ShinyButton>Daxil ol</ShinyButton>
							</Link>
						)}
					</div>

					{/* Signin */}
					{/* <div className="relative flex gap-3">
              <SignedIn>
                <Link
                  href="/dashboard"
                  className="px-4 py-2 rounded-full bg-[#131316] text-white text-sm font-semibold"
                >
                  Dashboard
                </Link>
              <UserButton />

              </SignedIn>
              <SignedOut>
                <SignInButton>
                  <button className="px-4 py-2 rounded-full bg-[#131316] text-white text-sm font-semibold">
                    Sign in
                  </button>
                </SignInButton>
              </SignedOut>
            </div> */}
				</div>

				{/* Mobile Navigation */}
				<div className="flex flex-1 items-center justify-end md:hidden">
					<Button
						variant="ghost"
						size="sm"
						className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
						onClick={() => setIsOpen(!isOpen)}
					>
						<Menu className={cn("h-6 w-6", isOpen ? "hidden" : "block")} />
						<X className={cn("h-6 w-6", isOpen ? "block" : "hidden")} />
						<span className="sr-only">Toggle Menu</span>
					</Button>

					{isOpen && (
						<div className="absolute inset-x-0 top-16 z-50 mt-px bg-background shadow-lg md:hidden">
							<div className="container flex flex-col space-y-4 py-4">
								<Link
									href="/"
									onClick={() => setIsOpen(false)}
									className={cn(
										"text-sm font-medium transition-colors hover:text-primary",
										pathname === "/" && "text-primary",
									)}
								>
									Home
								</Link>
								<Link
									href="/leaderboard"
									onClick={() => setIsOpen(false)}
									className={cn(
										"text-sm font-medium transition-colors hover:text-primary",
										pathname.startsWith("/leaderboard") && "text-primary",
									)}
								>
									Leaderboard
								</Link>
								<Link
									href="/about"
									onClick={() => setIsOpen(false)}
									className={cn(
										"text-sm font-medium transition-colors hover:text-primary",
										pathname === "/about" && "text-primary",
									)}
								>
									About
								</Link>
								<SignedIn>
									<Link
										href="/dashboard"
										onClick={() => setIsOpen(false)}
										className={cn(
											"text-sm font-medium transition-colors hover:text-primary",
											pathname.startsWith("/dashboard") && "text-primary",
										)}
									>
										Dashboard
									</Link>
								</SignedIn>
								<div className="flex flex-col space-y-2 pt-2">
									<SignedOut>
										<Link href="/sign-in" onClick={() => setIsOpen(false)}>
											<Button variant="outline" size="sm" className="w-full">
												Sign In
											</Button>
										</Link>
										<Link href="/sign-up" onClick={() => setIsOpen(false)}>
											<Button size="sm" className="w-full">
												Sign Up
											</Button>
										</Link>
									</SignedOut>
									<SignedIn>
										<div className="flex items-center">
											<span className="ml-2 text-sm font-medium pr-2">
												Account
											</span>
											<UserButton />
										</div>
									</SignedIn>
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
		</nav>
	);
}
