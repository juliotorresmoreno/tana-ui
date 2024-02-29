import { InputHTMLAttributes, PropsWithChildren } from "react";

interface HTMLInputProps extends InputHTMLAttributes<HTMLSelectElement> {}

const classNames =
  "block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-green-700 focus:ring-green-700 focus:shadow-none p-2.5 text-sm rounded-none";

type InputProps = HTMLInputProps & PropsWithChildren;

export function Select({ className, children, ...props }: InputProps) {
  return (
    <select
      {...props}
      //className="focus:border-green-500"
      className={[classNames, className].join(" ")}
    >
      {children}
    </select>
  );
}
