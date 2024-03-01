import { InputHTMLAttributes, LegacyRef } from "react";

interface HTMLInputProps extends InputHTMLAttributes<HTMLInputElement> {}

const classNames =
  "block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-green-700 focus:ring-green-700 focus:shadow-none p-2.5 text-sm rounded-none";

type InputProps = HTMLInputProps;

export function Input({ className, ...props }: InputProps) {
  return <input {...props} className={[classNames, className].join(" ")} />;
}
