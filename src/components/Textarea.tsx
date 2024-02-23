import { TextareaHTMLAttributes } from "react";

interface HTMLTextAreaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

const classNames =
  "block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-green-700 focus:ring-green-700 focus:shadow-none p-2.5 text-sm rounded-none";

type InputProps = HTMLTextAreaProps;

export function TextArea({ className, ...props }: InputProps) {
  return (
    <textarea
      {...props}
      className={[classNames, className].join(" ")}
    ></textarea>
  );
}
