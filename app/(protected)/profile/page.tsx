import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import UserCard from "./user-card";

export default async function DashboardPage() {
	return (
		<div className="w-full">
			<div className="flex mx-auto max-w-sm gap-4 flex-col">
				<UserCard />
			</div>
		</div>
	);
}
