import { twMerge } from "tailwind-merge";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { DatePicker } from "./ui/datepicker";

type BaseProps = {
  placeholder: string;
  required: boolean;
  className?: string;
};

type NumberProps = {
  type: "Number";
  value?: number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

type TextProps = {
  type: "Text";
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

type LongTextProps = {
  type: "LongText";
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

type DateProps = {
  type: "Date";
  value?: Date;
  onChange?: (date: Date | undefined) => void;
};

type Props = BaseProps & (NumberProps | TextProps | LongTextProps | DateProps);

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
    onChange;

    return (
      <Textarea
        placeholder={placeholder}
        required={required}
        className={twMerge(baseCSS, className)}
        value={value}
        onChange={onChange}
      />
    );
  }

  if (type === "Date") {
    return <DatePicker value={value} onChange={onChange} />;
  }

  if (type === "Text" || type === "Number") {
    return (
      <Input
        type={type === "Text" ? "text" : "number"}
        placeholder={placeholder}
        required={required}
        className={twMerge(baseCSS, className)}
        value={value}
        onChange={onChange}
      />
    );
  }

  return null;
}
