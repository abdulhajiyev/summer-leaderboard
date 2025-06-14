"use client";

import * as React from "react";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Menu, X, UserRoundCog } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export function Navbar() {
	const [isOpen, setIsOpen] = React.useState(false);
	const pathname = usePathname();

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
						<SignedIn>
							<Link
								href="/dashboard"
								className={cn(
									"text-sm font-medium transition-colors hover:text-primary",
									pathname.startsWith("/dashboard") && "text-primary",
								)}
							>
								Dashboard
							</Link>
						</SignedIn>
					</div>
					<div className="flex items-center space-x-2">
						<SignedOut>
							<Link href="/signin">
								<Button variant="outline" size="sm">
									Sign In
								</Button>
							</Link>
							<Link href="/signup">
								<Button size="sm">Sign Up</Button>
							</Link>
						</SignedOut>
						<SignedIn>
							<UserButton>
								<UserButton.MenuItems>
									<UserButton.Action
										label="Open profile settings"
										labelIcon={<UserRoundCog size={16}/>}
										onClick={() => alert("init chat")}
									/>
									<UserButton.Action label="signOut" />
								</UserButton.MenuItems>
							</UserButton>
						</SignedIn>
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
										<Link href="/signin" onClick={() => setIsOpen(false)}>
											<Button variant="outline" size="sm" className="w-full">
												Sign In
											</Button>
										</Link>
										<Link href="/signup" onClick={() => setIsOpen(false)}>
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
