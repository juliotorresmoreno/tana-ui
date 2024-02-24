import { Err } from "joi";

export class NameError extends Error {
  constructor() {
    super("Please provide a valid name.");
    this.name = "NameError";
  }
}

export class LastNameError extends Error {
  constructor() {
    super("Please provide a valid last name.");
    this.name = "LastNameError";
  }
}

export class EmailError extends Error {
  constructor() {
    super("Please provide a valid email address.");
    this.name = "EmailError";
  }
}

export class PasswordError extends Error {
  constructor() {
    super(
      "Please provide a valid password. It must be at least 8 characters long and include at least one letter, one digit, and one special character."
    );
    this.name = "PasswordError";
  }
}

export class PasswordConfirmationError extends Error {
  constructor() {
    super("Password confirmation is required. Please confirm your password.");
    this.name = "PasswordConfirmationError";
  }
}

export class FetchError extends Error {
  constructor(opts: ErrorOptions = {}) {
    super("FetchError", opts);
    this.name = "FetchError";
  }
}
