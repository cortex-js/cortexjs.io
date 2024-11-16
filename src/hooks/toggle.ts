import { useState } from "react";

export default function useToggle(defaultValue: boolean) {
  const [value, setValue] = useState(defaultValue);

  const toggleValue = (value) => {
    setValue((currentValue) =>
      typeof value === "boolean" ? value : !currentValue,
    );
  };

  return [value, toggleValue] as const;
}
