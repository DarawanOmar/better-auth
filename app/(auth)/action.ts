"use server";

import { auth } from "@/auth";
import { EmailTemplate } from "@/components/resend-template";
import { redirect } from "next/navigation";
import { Resend } from "resend";

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
export async function signInGithub() {
  try {
    await auth.api.signInSocial({ body: { provider: "github" } });
  } catch (error) {
    console.error("Error during sign-in:", error);
    throw new Error("Sign-in failed");
  }
  redirect("/");
}

export async function signInGoogle() {
  try {
    await auth.api.signInSocial({ body: { provider: "google" } });
  } catch (error) {
    console.error("Error during sign-in:", error);
    throw new Error("Sign-in failed");
  }
  redirect("/");
}

export async function forgotPassword(formData: FormData) {
  const email = formData.get("email") as string;

  try {
    await auth.api.forgetPassword({
      body: {
        email,
      },
    });
  } catch (error) {
    console.error("Error during forgot password:", error);
    throw new Error("Forgot password failed");
  }
}

export async function sendEmail(formData: FormData) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const email = formData.get("email") as string;

  try {
    const { data, error } = await resend.emails.send({
      from: "Better Auth <onboarding@resend.dev>",
      to: email,
      subject: "Reset Your Password",
      react: EmailTemplate({ firstName: "Mr Darawan" }),
    });
    if (data) {
      console.log("Email sent successfully:", data);
    } else if (error) {
      console.error("Error sending email:", error);
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error sending email:", error.message);
    }
    console.error("Error sending email:", error);
  }
}
