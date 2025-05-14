import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function ProtectedLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const { userId, sessionClaims } = await auth();

	// If user is not authenticated, redirect to signin
	if (!userId) {
		return redirect("/signin");
	}

	// If authenticated but hasn't completed onboarding, redirect to onboarding
	if (!sessionClaims?.metadata?.onboardingComplete) {
		return redirect("/onboarding");
	}

	return <>{children}</>;
}
