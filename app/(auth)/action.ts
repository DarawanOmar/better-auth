"use server";

import { auth } from "@/auth";
import { redirect } from "next/navigation";

export async function signIn(formData: FormData) {
  const rawData = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { email, password } = rawData;

  try {
    await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    });
  } catch (error) {
    console.error("Error during sign-in:", error);
    throw new Error("Sign-in failed");
  }
  redirect("/");
}
export async function signUp(formData: FormData) {
  const rawData = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    lastname: formData.get("lastname") as string,
    firstname: formData.get("firstname") as string,
  };

  const { email, password, lastname, firstname } = rawData;

  try {
    await auth.api.signUpEmail({
      body: {
        email,
        password,
        name: `${firstname} ${lastname}`,
      },
    });
  } catch (error) {
    console.error("Error during sign-up:", error);
    throw new Error("Sign-up failed");
  }
  redirect("/");
}
