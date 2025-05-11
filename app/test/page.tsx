"use client";

import * as React from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { completeOnboarding } from "../onboarding/_actions";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { UserAgentForm } from "@/components/forms/UserAgentForm";

export default function OnboardingComponent() {
	const [error, setError] = React.useState("");
	const { user } = useUser();
	const router = useRouter();

	const handleSubmit = async (formData: FormData) => {
		const res = await completeOnboarding(formData);
		if (res?.message) {
			// Reloads the user's data from the Clerk API
			await user?.reload();
			router.push("/");
		}
		if (res?.error) {
			setError(res?.error);
		}
	};

	return (
		<UserAgentForm
      onSubmit={handleSubmit}
      error={error}
      title="Onboarding"
      description="Please complete your profile to get started with Summer Leaderboard"
      buttonText="Complete Onboarding"
      buttonIcon={<AlertCircle className="mr-2 h-4 w-4" />}
      key={user?.id}
    />
	);
}
