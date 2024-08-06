import { twMerge } from "tailwind-merge";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { DatePicker } from "./ui/datepicker";

type BaseProps = {
  placeholder: string;
  required: boolean;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

type NumberProps = {
  type: "Number";
  value?: number;
};

type TextProps = {
  type: "Text" | "LongText" | "Date";
  value?: string;
};

type Props = BaseProps & (NumberProps | TextProps);

const baseCSS = "mb-3";

export default function AppInput({
  type,
  placeholder,
  required,
  className,
  value,
  onChange,
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

  if (type === "Text" || type === "Number") {
    return (
      <Input
        type={type === "Text" ? "text" : "number"}
        placeholder={placeholder}
        required={required}
        className={twMerge(baseCSS, className)}
      />
    );
  }

  return null;
}
