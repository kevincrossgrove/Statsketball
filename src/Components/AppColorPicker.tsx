import { useRef, useState } from "react";

type Props = {
  initialColor?: string;
  onChange?: (color: string) => void;
};

export default function AppColorPicker({ initialColor, onChange }: Props) {
  const [color, setColor] = useState<string | undefined>(initialColor);
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <div className="relative cursor-pointer">
      <div
        onClick={() => inputRef.current?.click()}
        className="h-7 w-7 border-gray-400 border-2 rounded cursor-pointer"
        style={{
          background: color
            ? color
            : "repeating-conic-gradient(#ffffff 0% 25%, #858585 0% 50%) 50% / 15px 15px",
        }}
      />
      <input
        type="color"
        ref={inputRef}
        value={color || ""}
        onChange={handleChange}
        className="opacity-0 absolute -top-1 cursor-pointer"
      />
    </div>
  );

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newColor = e.target.value;
    setColor(newColor);
    if (onChange) {
      onChange(newColor);
    }
  }

  function handleClear() {
    setColor(undefined);
    if (onChange) {
      onChange("");
    }
  }
}
