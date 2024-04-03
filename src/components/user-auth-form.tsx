"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [passwordError, setPasswordError] = React.useState<boolean>(false);

  async function onRegister(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }

  async function onLogin(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    const email = (document.getElementById("email") as HTMLInputElement).value;
    const password = (document.getElementById("password") as HTMLInputElement)
      .value;

    console.log(email, password);

    const response = await fetch("/api/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (data.code === 400) {
      // If authentication fails, set the error message and turn the password input field red
      setPasswordError(true);
    } else {
      // If authentication succeeds, store the token in a cookie
      document.cookie = `token=${data}; path=/`;
      setPasswordError(false);
      router.push("/dashboard");
    }

    setIsLoading(false);
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Tabs defaultValue="signIn" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signIn">Register</TabsTrigger>
          <TabsTrigger value="signUp">Login</TabsTrigger>
        </TabsList>
        <TabsContent value="signIn">
          <p className="text-sm text-muted-foreground my-4">
            Enter your email below to create your account
          </p>
          <form onSubmit={onRegister}>
            <div className="grid gap-2">
              <div className="grid gap-1">
                <Label className="sr-only" htmlFor="email">
                  Email
                </Label>
                <Input
                  id="email"
                  placeholder="name@example.com"
                  type="email"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                  disabled={isLoading}
                />
                <Input
                  id="reg_password"
                  placeholder="Password"
                  type="password"
                  autoCapitalize="none"
                  autoComplete="none"
                  autoCorrect="off"
                  disabled={isLoading}
                />
                <Input
                  id="reg_password_confirm"
                  placeholder="Confirm Password"
                  type="password"
                  autoCapitalize="none"
                  autoComplete="none"
                  autoCorrect="off"
                  disabled={isLoading}
                />
              </div>
              <Button disabled={isLoading}>
                {isLoading && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Sign In with Email
              </Button>
            </div>
          </form>
        </TabsContent>
        <TabsContent value="signUp">
          <form onSubmit={onLogin}>
            <div className="grid gap-2">
              {passwordError && (
                <Label className="text-red-500" htmlFor="password">
                  Incorrect email or password
                </Label>
              )}
              <div className="grid gap-1">
                <Label className="sr-only" htmlFor="email">
                  Email
                </Label>
                <Input
                  id="email"
                  placeholder="name@example.com"
                  type="email"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                  disabled={isLoading}
                />
                <Input
                  id="password"
                  placeholder="Password"
                  type="password"
                  autoCapitalize="none"
                  autoComplete="none"
                  autoCorrect="off"
                  disabled={isLoading}
                />
              </div>
              <Button disabled={isLoading}>
                {isLoading && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Sign Up with Email
              </Button>
            </div>
          </form>
        </TabsContent>
      </Tabs>
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
      <Button variant="outline" type="button" disabled={isLoading}>
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.gitHub className="mr-2 h-4 w-4" />
        )}{" "}
        GitHub (Not Implemented)
      </Button>
    </div>
  );
}
