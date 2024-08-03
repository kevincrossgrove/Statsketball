import { twMerge } from "tailwind-merge";

interface Props {
  zodType: string;
  fieldName?: string;
  placeholder: string;
  required: boolean;
}

const baseCSS = "block w-full rounded-md border-2 border-gray-300 p-2 text-sm";

export default function AppInput({
  zodType,
  fieldName,
  placeholder,
  required,
}: Props) {
  if (zodType === "ZodString" && fieldName === "Description") {
    return (
      <textarea
        placeholder={placeholder}
        required={required}
        className={twMerge(baseCSS)}
      />
    );
  }

  if (zodType === "ZodString" && fieldName === "Date") {
    return (
      <input
        type="date"
        placeholder={placeholder}
        required={required}
        className={twMerge(baseCSS)}
      />
    );
  }

  if (zodType === "ZodString") {
    return (
      <input
        type="text"
        placeholder={placeholder}
        required={required}
        className={twMerge(baseCSS)}
      />
    );
  }

  console.log("No code written for", zodType);

  return null;
}
