// Its api is very similar to the input-OTP component
// Supply a Schema, current Value, and a onChange function props
// I have exported a schema type just to help

import { Check, ChevronsUpDown, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

export interface Option {
  value: string;
  label: string;
}

// make a interface called ComboboxSchema that extends Option[]
export type ComboboxSchema = Option[];

interface Props {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
  placeholder: string;
  required?: boolean;
  label?: string;
  onCreate?: () => void;
}

export function SelectPicker({
  options = [{ value: "", label: "" }],
  value,
  onChange,
  className,
  placeholder,
  required,
  label,
  onCreate,
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex w-full gap-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={twMerge("w-full justify-between mb-3", className)}
          >
            {value
              ? options.find((option) => option.value === value)?.label
              : placeholder}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search option..." />
            <CommandEmpty>No {label || "option"} found.</CommandEmpty>
            <CommandList>
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={(currentValue) => {
                      onChange(currentValue === value ? "" : currentValue);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === option.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {option.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {onCreate && (
        <Button
          variant="green"
          onClick={onCreate}
          className="px-2"
          type="button"
        >
          <Plus className="text-white" />
        </Button>
      )}
    </div>
  );
}
