import { twMerge } from "tailwind-merge";

const Colors = {
  white: "text-white",
  primary: "text-primary",
  secondary: "text-secondary",
  gray: "text-gray",
  danger: "text-danger",
};

const Sizes = {
  sm: "h-5 w-5",
  md: "h-7 w-7",
  lg: "h-9 w-9",
};

export default function AppSpinner({
  color = "white",
  size = "sm",
}: {
  color?: "white" | "primary" | "secondary" | "gray" | "danger";
  size?: "sm" | "md" | "lg";
}) {
  const css = twMerge(
    "animate-spin h-5 w-5",
    Colors[color || "white"],
    Sizes[size || "sm"]
  );

  return (
    <svg
      className={css}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className=" opacity-30"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );
}
