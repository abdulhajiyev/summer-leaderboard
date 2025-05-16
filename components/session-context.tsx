"use client";

import { createContext, useContext, type ReactNode } from "react";
import { useSession } from "@/lib/auth-client";
import type { Session } from "better-auth/types";

// Define the session context type
type SessionContextType = {
	session: {
		session: Session;
		user: {
			id: string;
			name: string;
			email: string;
			emailVerified: boolean;
			image?: string | null;
			createdAt: Date;
			updatedAt: Date;
			role?: string;
			banned?: boolean;
			banReason?: string;
			banExpires?: Date;
		};
	} | null;
	isLoading: boolean;
	isAuthenticated: boolean;
};

// Create the context
const SessionContext = createContext<SessionContextType | undefined>(undefined);

// Create the provider component
export function SessionProvider({ children }: { children: ReactNode }) {
	const { data: session, isPending: isLoading } = useSession();

	const value = {
		session,
		isLoading,
		isAuthenticated: !!session?.user,
	};

	return (
		<SessionContext.Provider value={value}>{children}</SessionContext.Provider>
	);
}

// Create a custom hook to use the session context
export function useSessionContext() {
	const context = useContext(SessionContext);
	if (context === undefined) {
		throw new Error("useSessionContext must be used within a SessionProvider");
	}
	return context;
}
