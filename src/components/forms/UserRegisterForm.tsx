"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button, Label } from "flowbite-react";
import { Input } from "@/components/Input";
import { useInput } from "@/hooks/useInput";
import { Icons } from "@/components/Icons";
import Joi from "joi";
import {
  EmailError,
  FetchError,
  LastNameError,
  NameError,
  PasswordConfirmationError,
  PasswordError,
} from "@/common/errors";
import { signUp } from "@/services/auth";
import { SessionContext } from "@/contexts/session";
import { useRouter } from "next/navigation";

const nameError = new NameError();
const lastNameError = new LastNameError();
const emailError = new EmailError();
const passwordError = new PasswordError();
const passwordConfirmationErrorInstance = new PasswordConfirmationError();

const signUpSchema = Joi.object({
  name: Joi.string().required().error(nameError),
  last_name: Joi.string().required().error(lastNameError),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .error(emailError),
  password: Joi.string()
    .required()
    .pattern(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[\-@$!%*#?&])[A-Za-z\d\-@$!%*#?&]{8,}$/
    )
    .error(passwordError),
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

interface UserRegisterFormProps extends React.HTMLAttributes<HTMLDivElement> { }

export function UserRegisterForm({
  className,
  ...props
}: UserRegisterFormProps) {
  const [isLoading, setIsLoading] = React.useState(false)
  const sessionContext = React.useContext(SessionContext);
  const nameInput = useInput("");
  const lastNameInput = useInput("");
  const emailInput = useInput("");
  const passwordInput = useInput("");
  const passwordConfirmInput = useInput("");

  const router = useRouter();

  const errors = React.useMemo(
    () => ({
      [nameError.name]: nameInput.setError,
      [lastNameError.name]: lastNameInput.setError,
      [emailError.name]: emailInput.setError,
      [passwordError.name]: passwordConfirmInput.setError,
    }),
    []
  );

  React.useEffect(() => {
    if (sessionContext.session) {
      router.push("/");
    }
  });

  const clearErrors = () => {
    nameInput.setError(null);
    lastNameInput.setError(null);
    emailInput.setError(null);
    passwordInput.setError(null);
    passwordConfirmInput.setError(null);
  };

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();

    clearErrors();

    if (passwordInput.value !== passwordConfirmInput.value) {
      passwordConfirmInput.setError(passwordConfirmationErrorInstance);
    }

    const data = {
      name: nameInput.value,
      last_name: lastNameInput.value,
      email: emailInput.value,
      password: passwordInput.value,
    };

    //const result = signUpSchema.validate(data);
    //if (result.error) errors[result.error.name](result.error);

    setIsLoading(true)
    signUp(data)
      .then(sessionContext.setSession)
      .then(() => router.push("/"))
      .catch((err: FetchError) => {
        const cause = (err.cause || {} as any)
        if (cause.message) {
          passwordInput.setError(new Error(cause.message));
          return
        }

        if (cause.name) return nameInput.setError(new Error(cause.name));
        if (cause.last_name) return lastNameInput.setError(new Error(cause.last_name));
        if (cause.email) return emailInput.setError(new Error(cause.email));
        if (cause.password) return passwordInput.setError(new Error(cause.password));
      })
      .finally(() => setIsLoading(false));
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="name">
              Name
            </Label>
            <Input
              value={nameInput.value}
              onChange={nameInput.handleChange}
              id="name"
              placeholder="Your Name"
              type="text"
              autoCapitalize="words"
              autoComplete="name"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          {RenderError(nameInput.error)}

          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="last_name">
              Last Name
            </Label>
            <Input
              value={lastNameInput.value}
              onChange={lastNameInput.handleChange}
              id="last_name"
              placeholder="Your Last Name"
              type="text"
              autoCapitalize="words"
              autoComplete="family-name"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          {RenderError(lastNameInput.error)}

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

          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="confirm_password">
              Confirm Password
            </Label>
            <Input
              value={passwordConfirmInput.value}
              onChange={passwordConfirmInput.handleChange}
              id="confirm_password"
              placeholder="Confirm your password"
              type="password"
              autoComplete="new-password"
              disabled={isLoading}
            />
          </div>
          {RenderError(passwordConfirmInput.error)}

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
