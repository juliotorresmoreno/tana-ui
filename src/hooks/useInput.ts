import { useState } from "react";

export function useInput(initialValue = "") {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState<Error | null>(null);

  const handleChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (event) => {
    setValue(event.target.value);
  };

  return {
    value,
    handleChange,
    setValue,
    error,
    setError,
    clear: () => setValue(initialValue),
  };
}
