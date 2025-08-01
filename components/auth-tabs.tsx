"use client";

import { useState, useEffect, useActionState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, EyeOff, Github, Mail } from "lucide-react";
import { login, signup } from "@/app/auth/actions";
import { useSearchParams, useRouter } from "next/navigation";
import { useFormState, useFormStatus } from "react-dom";
import { AuthFormState } from "@/types/api";

interface AuthTabsProps {
  defaultTab?: "login" | "signup";
}

export function AuthTabs({ defaultTab = "login" }: AuthTabsProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentTab, setCurrentTab] = useState(defaultTab);
  const [loginState, loginAction] = useActionState<AuthFormState, FormData>(
    login,
    {status: 'idle'}
  );
  const [signupState, signupAction] = useActionState<AuthFormState, FormData>(
    signup,
    { status: 'idle' }
  );


  const searchParams = useSearchParams();
  const router = useRouter();
  const error = searchParams.get("error");
  const success = searchParams.get("success");

 // Handle authentication results
  useEffect(() => {
    
    if (loginState.status === 'success') {
      // Store token securely
      if (loginState.token) {
        sessionStorage.setItem("loginTime", Date.now().toString())
        sessionStorage.setItem("userToken", loginState.token);
        // Set cookies if needed
        document.cookie = `authToken=${loginState.token}; path=/; max-age=${60 * 60 * 24 * 7}; secure; samesite=lax`;
      }
      debugger
      router.push("/user-dashboard");
    } else if (loginState.status === 'error') {
      // Handle errors
      console.error("Login failed:", loginState.error);
    }

    if (signupState.status === 'success') {
      router.push("/login?success=account_created");
    }
  }, [loginState, signupState, router]);
  

  // Clear URL parameters when switching tabs or component mounts
  useEffect(() => {
    
    if (error || success) {
      // Clear the URL parameters without page reload
      const url = new URL(window.location.href);
      url.searchParams.delete("error");
      url.searchParams.delete("success");
      router.replace(url.pathname, { scroll: false });
    }
  }, [currentTab, error, success, router]);

  const handleTabChange = (value: string) => {
    setCurrentTab(value as "login" | "signup");
    // Clear any existing errors when switching tabs
    if (error || success) {
      const url = new URL(window.location.href);
      url.searchParams.delete("error");
      url.searchParams.delete("success");
      router.replace(url.pathname, { scroll: false });
    }
  };

  return (
    <div className="animate-in fade-in-50 duration-300">
      <Tabs
        value={currentTab}
        onValueChange={handleTabChange}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2 h-8 sm:h-10">
          <TabsTrigger
            value="login"
            className="text-xs sm:text-sm transition-all"
          >
            Login
          </TabsTrigger>
          <TabsTrigger
            value="signup"
            className="text-xs sm:text-sm transition-all"
          >
            Sign Up
          </TabsTrigger>
        </TabsList>

        <TabsContent
          value="login"
          className="mt-2 sm:mt-4 animate-in fade-in-50 slide-in-from-right-4 duration-300"
        >
          <Card className="transition-all hover:shadow-md">
            <CardHeader className="space-y-1 pb-3 sm:pb-4">
              <CardTitle className="text-lg sm:text-xl text-center">
                Sign in
              </CardTitle>
              <CardDescription className="text-center text-xs sm:text-sm">
                Enter your email and password
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-1 sm:space-y-1 px-4 sm:px-6">
              {/* Error/Success Messages */}
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                  <p className="text-sm text-red-600 text-center">
                    {error === "invalid_credentials" &&
                      "Invalid email or password. Please try again."}
                    {error === "login_failed" &&
                      "Login failed. Please try again."}
                  </p>
                </div>
              )}

              {success && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-md">
                  <p className="text-sm text-green-600 text-center">
                    {success === "account_created" &&
                      "Account created successfully! Please sign in."}
                  </p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full bg-transparent h-8 sm:h-9 text-xs sm:text-sm transition-all hover:scale-[1.02]"
                >
                  <Github className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline">Github</span>
                  <span className="sm:hidden">Git</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full bg-transparent h-8 sm:h-9 text-xs sm:text-sm transition-all hover:scale-[1.02]"
                >
                  <Mail className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline">Google</span>
                  <span className="sm:hidden">Go</span>
                </Button>
              </div>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>
              <form action={loginAction} className="space-y-1 sm:space-y-1">
                <div className="space-y-1">
                  <Label htmlFor="login-email" className="text-xs sm:text-sm">
                    Email
                  </Label>
                  <Input
                    id="login-email"
                    name="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    className="h-8 sm:h-9 text-sm transition-all focus:scale-[1.01]"
                  />
                </div>
                <div className="space-y-1">
                  <Label
                    htmlFor="login-password"
                    className="text-xs sm:text-sm"
                  >
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="login-password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      required
                      className="h-8 sm:h-9 text-sm pr-8 sm:pr-10 transition-all focus:scale-[1.01]"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-8 sm:h-9 px-2 sm:px-3 hover:bg-transparent transition-all"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-3 w-3 sm:h-4 sm:w-4" />
                      ) : (
                        <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                      )}
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1 sm:space-x-2">
                    <input
                      type="checkbox"
                      id="remember"
                      className="h-3 w-3 rounded border-gray-300"
                    />
                    <Label htmlFor="remember" className="text-xs">
                      Remember me
                    </Label>
                  </div>
                  <Button variant="link" className="px-0 text-xs h-auto">
                    Forgot password?
                  </Button>
                </div>
                <div className="flex space-x-2">
                  <Button
                    type="submit"
                    className="flex-1 h-8 sm:h-9 text-sm transition-all hover:scale-[1.02]"
                  >
                    Login
                  </Button>
                  <Button
                    type="reset"
                    variant="outline"
                    className="flex-1 h-8 sm:h-9 text-sm transition-all hover:scale-[1.02]"
                  >
                    Clear
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent
          value="signup"
          className="mt-2 sm:mt-4 animate-in fade-in-50 slide-in-from-left-4 duration-300"
        >
          <Card className="transition-all hover:shadow-md">
            <CardHeader className="space-y-1 pb-3 sm:pb-4">
              <CardTitle className="text-lg sm:text-xl text-center">
                Create account
              </CardTitle>
              <CardDescription className="text-center text-xs sm:text-sm">
                Enter your information to create account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-1 sm:space-y-1 px-4 sm:px-6">
              {/* Error Messages for Signup */}
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                  <p className="text-sm text-red-600 text-center">
                    {error === "passwords_dont_match" &&
                      "Passwords don't match. Please try again."}
                    {error === "signup_failed" &&
                      "Signup failed. Please try again."}
                  </p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full bg-transparent h-8 sm:h-9 text-xs sm:text-sm transition-all hover:scale-[1.02]"
                >
                  <Github className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline">Github</span>
                  <span className="sm:hidden">Git</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full bg-transparent h-8 sm:h-9 text-xs sm:text-sm transition-all hover:scale-[1.02]"
                >
                  <Mail className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline">Google</span>
                  <span className="sm:hidden">Go</span>
                </Button>
              </div>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>
              <form action={signupAction} className="space-y-1 sm:space-y-1">
                <div className="grid grid-cols-2 gap-2 sm:gap-3">
                  <div className="space-y-1">
                    <Label htmlFor="first-name" className="text-xs sm:text-sm">
                      First name
                    </Label>
                    <Input
                      id="first-name"
                      name="firstName"
                      placeholder="John"
                      required
                      className="h-8 sm:h-9 text-sm transition-all focus:scale-[1.01]"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="last-name" className="text-xs sm:text-sm">
                      Last name
                    </Label>
                    <Input
                      id="last-name"
                      name="lastName"
                      placeholder="Doe"
                      required
                      className="h-8 sm:h-9 text-sm transition-all focus:scale-[1.01]"
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="signup-email" className="text-xs sm:text-sm">
                    Email
                  </Label>
                  <Input
                    id="signup-email"
                    name="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    className="h-8 sm:h-9 text-sm transition-all focus:scale-[1.01]"
                  />
                </div>
                <div className="space-y-1">
                  <Label
                    htmlFor="signup-password"
                    className="text-xs sm:text-sm"
                  >
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="signup-password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password"
                      required
                      className="h-8 sm:h-9 text-sm pr-8 sm:pr-10 transition-all focus:scale-[1.01]"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-8 sm:h-9 px-2 sm:px-3 hover:bg-transparent transition-all"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-3 w-3 sm:h-4 sm:w-4" />
                      ) : (
                        <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                      )}
                    </Button>
                  </div>
                </div>
                <div className="space-y-1">
                  <Label
                    htmlFor="confirm-password"
                    className="text-xs sm:text-sm"
                  >
                    Confirm password
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirm-password"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      required
                      className="h-8 sm:h-9 text-sm pr-8 sm:pr-10 transition-all focus:scale-[1.01]"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-8 sm:h-9 px-2 sm:px-3 hover:bg-transparent transition-all"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-3 w-3 sm:h-4 sm:w-4" />
                      ) : (
                        <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                      )}
                    </Button>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <input
                    type="checkbox"
                    id="terms"
                    className="h-3 w-3 rounded border-gray-300 mt-0.5"
                    required
                  />
                  <Label htmlFor="terms" className="text-xs leading-tight">
                    I agree to the{" "}
                    <Button
                      variant="link"
                      className="px-0 text-xs h-auto p-0 underline"
                    >
                      Terms of Service
                    </Button>{" "}
                    and{" "}
                    <Button
                      variant="link"
                      className="px-0 text-xs h-auto p-0 underline"
                    >
                      Privacy Policy
                    </Button>
                  </Label>
                </div>

                <div className="flex  space-x-2">
                  <Button
                    type="submit"
                    className="flex-1 space-y-1 h-8 sm:h-9 text-sm transition-all hover:scale-[1.02]"
                  >
                    Create account
                  </Button>
                  <Button
                    type="reset"
                    variant="outline"
                    className="flex-1 space-y-1 h-8 sm:h-9 text-sm transition-all hover:scale-[1.02]"
                  >
                    Clear
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
