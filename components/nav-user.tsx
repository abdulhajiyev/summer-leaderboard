"use client";

import {
	BadgeCheck,
	Bell,
	ChevronsUpDown,
	CreditCard,
	Loader2,
	LogOut,
	Sparkles,
	UserCog,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export function NavUser({
	user,
}: {
	user: {
		name: string;
		email: string;
		avatar: string;
	};
}) {
	const [signingOut, setSigningOut] = useState(false);
	const router = useRouter();

	const handleSignOut = async () => {
		setSigningOut(true);
		await signOut({
			fetchOptions: {
				onSuccess() {
					router.push("/");
					router.refresh();
				},
			},
		});
		setSigningOut(false);
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger className="cursor-pointer hover:scale-125 transition-all duration-150 mx-auto rounded-full">
				<Avatar className="h-8 w-8 rounded-full">
					<AvatarImage src={user.avatar} alt={user.name} />
					<AvatarFallback className="rounded-lg">ST</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				className="w-[--radix-dropdown-menu-trigger-width] min-w-56 max-w-56 rounded-lg"
				side={"bottom"}
				align="end"
				sideOffset={4}
			>
				<DropdownMenuLabel className="p-0 font-normal ">
					<div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
						<Avatar className="h-8 w-8 rounded-full">
							<AvatarImage src={user.avatar} alt={user.name} />
							<AvatarFallback className="rounded-lg">CN</AvatarFallback>
						</Avatar>
						<div className="grid flex-1 text-left text-sm leading-tight">
							<span className="truncate font-semibold">{user.name}</span>
							<span className="truncate text-xs">Summertour (Admin)</span>
						</div>
					</div>
				</DropdownMenuLabel>

				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem
						className="cursor-pointer"
						onClick={() => router.push("/profile")}
					>
						<UserCog />
						Profil ayarları
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuItem
					onClick={handleSignOut}
					disabled={signingOut}
					className="flex items-center gap-2 cursor-pointer"
				>
					{signingOut ? (
						<Loader2 size={16} className="animate-spin" />
					) : (
						<LogOut size={16} />
					)}
					Çıxış et
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
