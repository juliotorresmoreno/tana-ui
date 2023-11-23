import { Dispatch, SetStateAction, useState } from "react";

type Result = [
  string,
  React.ChangeEventHandler<HTMLInputElement>,
  Error | null,
  Dispatch<SetStateAction<Error | null>>,
  () => void
];

export function useInput(initialValue = ""): Result {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState<Error | null>(null);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setValue(event.target.value);
  };

  return [value, handleChange, error, setError, () => setValue(initialValue)];
}
