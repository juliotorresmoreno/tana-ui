"use client";

import * as React from "react";

import Joi from "joi";
import { cn } from "@/lib/utils";
import { Button, Label } from "flowbite-react";
import { Input } from "../Input";
import { useInput } from "@/hooks/useInput";
import { Icons } from "../Icons";
import { signIn } from "@/services/auth";
import { EmailError, PasswordError } from "@/common/errors";
import { SessionContext } from "@/contexts/session";
import { useRouter } from "next/navigation";

const emailError = new EmailError();
const passwordError = new PasswordError();

export const signInSchema = Joi.object({
  email: Joi.string().required().error(emailError),
  password: Joi.string().required().error(passwordError),
});

const RenderError = (error: Error | null) =>
  error ? (
    <div
      className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
      role="alert"
    >
      {error.message}
    </div>
  ) : null;

interface UserLoginFormProps extends React.HTMLAttributes<HTMLDivElement> { }

export function UserLoginForm({ className, ...props }: UserLoginFormProps) {
  const [isLoading, setIsLoading] = React.useState(false)
  const sessionContext = React.useContext(SessionContext);
  const emailInput = useInput("");
  const passwordInput = useInput("");

  const router = useRouter();

  const errors = React.useMemo(
    () => ({
      [emailError.name]: emailInput.setError,
      [passwordError.name]: passwordInput.setError,
    }),
    []
  );

  React.useEffect(() => {
    if (sessionContext.session) {
      router.push("/");
    }
  });

  const clearErrors = () => {
    emailInput.setError(null);
    passwordInput.setError(null);
  };

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();

    clearErrors();

    const data = {
      email: emailInput.value,
      password: passwordInput.value,
    };

    const result = signInSchema.validate(data);

    if (result.error) errors[result.error.name](result.error);

    setIsLoading(true)
    await signIn(data).then(session => {
      sessionContext.setSession(session);

      window.requestAnimationFrame(() => {
        router.push("/");
      });
    }).catch((err: any) => {
      const cause = (err.cause || {} as any)
      if (cause.message) {
        passwordInput.setError(new Error(cause.message));
        return
      }

      if (cause.email) return emailInput.setError(new Error(cause.email));
      if (cause.password) return passwordInput.setError(new Error(cause.password));
    }).finally(() => {
      setIsLoading(false)
    });
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
            Sign In with Email
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
