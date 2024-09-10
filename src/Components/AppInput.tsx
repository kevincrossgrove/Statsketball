import { twMerge } from "tailwind-merge";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { DatePicker } from "./ui/datepicker";

type BaseProps = {
  placeholder: string;
  required: boolean;
  className?: string;
  id?: string;
};

type NumberProps = {
  type: "Number";
  value?: number;
  onChange?: (val: number | undefined) => void;
};

type TextProps = {
  type: "Text";
  value?: string;
  onChange?: (val: string) => void;
};

type LongTextProps = {
  type: "LongText";
  value?: string;
  onChange?: (val: string) => void;
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
  id,
}: Props) {
  if (type === "LongText") {
    onChange;

    return (
      <Textarea
        id={id}
        placeholder={placeholder}
        required={required}
        className={twMerge(baseCSS, className)}
        value={value}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
      />
    );
  }

  if (type === "Date") {
    return <DatePicker id={id} value={value} onChange={onChange} />;
  }

  if (type === "Text") {
    return (
      <Input
        id={id}
        type={type === "Text" ? "text" : "number"}
        placeholder={placeholder}
        required={required}
        className={twMerge(baseCSS, className)}
        value={value}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
      />
    );
  }

  if (type === "Number") {
    return (
      <Input
        type={"number"}
        placeholder={placeholder}
        required={required}
        className={twMerge(baseCSS, className)}
        value={value}
        onChange={
          onChange ? (e) => onChange(parseInt(e.target.value)) : undefined
        }
      />
    );
  }

  return null;
}
