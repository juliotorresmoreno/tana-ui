"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Button, Label } from "flowbite-react";
import { Input } from "../Input";
import { useInput } from "@/hooks/useInput";
import { Icons } from "../Icons";

const RenderError = (error: Error | null) =>
  error ? (
    <div
      className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
      role="alert"
    >
      {error.message}
    </div>
  ) : null;

interface UserLoginFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserLoginForm({ className, ...props }: UserLoginFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const emailInput = useInput("");
  const passwordInput = useInput("");

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              value={emailInput.value}
              onChange={emailInput.handleChange}
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          {RenderError(emailInput.error)}

          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="password">
              Password
            </Label>
            <Input
              value={passwordInput.value}
              onChange={passwordInput.handleChange}
              id="password"
              placeholder="Enter your password"
              type="password"
              autoComplete="new-password"
              disabled={isLoading}
            />
          </div>
          {RenderError(passwordInput.error)}

          <Button type="submit" disabled={isLoading}>
            {isLoading && <Icons.spinner />}
            Sign Up with Email
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
      </div>
    </div>
  );
}
