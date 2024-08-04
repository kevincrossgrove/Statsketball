import { twMerge } from "tailwind-merge";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { DatePicker } from "./ui/datepicker";

interface Props {
  type: "Text" | "LongText" | "Date";
  placeholder: string;
  required: boolean;
  className?: string;
}

const baseCSS = "mb-3";

export default function AppInput({
  type,
  placeholder,
  required,
  className,
}: Props) {
  if (type === "LongText") {
    return (
      <Textarea
        placeholder={placeholder}
        required={required}
        className={twMerge(baseCSS, className)}
      />
    );
  }

  if (type === "Date") {
    return <DatePicker />;
  }

  if (type === "Text") {
    return (
      <Input
        type="text"
        placeholder={placeholder}
        required={required}
        className={twMerge(baseCSS, className)}
      />
    );
  }

  return null;
}
