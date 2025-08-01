"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function login(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  // Dummy credentials for testing
  const validCredentials = [
    { email: "admin@myalgofax.com", password: "admin123" },
    { email: "john@example.com", password: "password" },
    { email: "demo@demo.com", password: "demo" },
    { email: "test@test.com", password: "test123" },
  ]

  try {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Check if credentials match any dummy account
    const isValidUser = validCredentials.some((cred) => cred.email === email && cred.password === password)

    if (!isValidUser) {
      redirect("/login?error=invalid_credentials")
    }

    console.log("Login successful:", { email })

    // Simulate successful login - redirect to broker connection
    revalidatePath("/", "layout")
    redirect("/broker-setup")
  } catch (error) {
    redirect("/login?error=login_failed")
  }
}

export async function signup(formData: FormData) {
  const firstName = formData.get("firstName") as string
  const lastName = formData.get("lastName") as string
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const confirmPassword = formData.get("confirmPassword") as string

  // Basic validation
  if (password !== confirmPassword) {
    redirect("/register?error=passwords_dont_match")
  }

  try {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    console.log("Signup attempt:", { firstName, lastName, email, password })

    // Simulate successful signup
    revalidatePath("/", "layout")
    redirect("/login?success=account_created")
  } catch (error) {
    redirect("/register?error=signup_failed")
  }
}
