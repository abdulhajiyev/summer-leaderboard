import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export default async function ProtectedLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	// fetch session from request headers
	const session = await auth.api.getSession({ headers: await headers() });
	// Redirect unauthenticated users to sign-in
	if (!session) {
		return redirect("/sign-in");
	}
	// TODO: handle onboarding metadata if needed
	return <>{children}</>;
}
