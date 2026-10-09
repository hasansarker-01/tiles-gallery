import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
    baseURL:
        process.env.NEXT_PUBLIC_BETTER_AUTH_URL ||
        "https://tiles-gallery-nine-pi.vercel.app",

    session: {
        refetchInterval: 0,
        refetchOnWindowFocus: true,
    },
});

export const {
    signIn,
    signUp,
    signOut,
    useSession,
} = authClient;