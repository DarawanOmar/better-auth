import { createAuthClient } from "better-auth/react";
import { emailOTPClient } from "better-auth/client/plugins";
export const { signIn, signOut, useSession, forgetPassword, resetPassword } =
  createAuthClient({
    baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL!,
    plugins: [emailOTPClient()],
  });
