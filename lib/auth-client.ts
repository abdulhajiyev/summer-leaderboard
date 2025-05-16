import { createAuthClient } from "better-auth/react";
import { adminClient } from "better-auth/client/plugins";
export const authClient = createAuthClient({
	plugins: [adminClient()],
	/** The base URL of the server (optional if you're using the same domain) */
	baseURL: "http://localhost:3000",
});

export const { signUp, signIn, signOut, useSession } = authClient;

authClient.$store.listen("$sessionSignal", async () => {});
