import { useState } from "react";

export function useInput(initialValue = "") {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState<Error | null>(null);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setValue(event.target.value);
  };

  return {
    value,
    handleChange,
    error,
    setError,
    clear: () => setValue(initialValue),
  };
}
