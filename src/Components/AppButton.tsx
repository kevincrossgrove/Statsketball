import { twMerge } from "tailwind-merge";
import AppSpinner from "./AppSpinner";

interface Props {
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  type?: "submit" | "reset" | "button";
  color: "primary" | "secondary" | "transparent" | "danger" | "white";
  outline?: boolean;
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  loadingText?: string;
  disabled?: boolean;
}

const baseCSS =
  "flex items-center justify-center px-3 rounded border-2 font-medium transition-all";

const variants: Record<string, React.ComponentProps<"div">["className"]> = {
  primary:
    "bg-primary border-primary text-background hover:bg-primary-dark hover:border-primary-dark",
  secondary:
    "bg-secondary text-white border border-secondary hover:bg-secondary-dark hover:border-secondary-dark",
  "primary-outline":
    "text-primary border-primary hover:bg-primary hover:text-background",
  "secondary-outline":
    "text-secondary border-secondary hover:text-background hover:bg-secondary",
  transparent: "bg-transparent ",
  danger:
    "bg-danger border-danger text-white hover:bg-danger-dark hover:border-danger-dark",
  "danger-outline":
    "text-danger border-danger hover:text-background hover:bg-danger",
  white:
    "bg-white text-primary border-white hover:bg-lightest active:bg-lighter",
};

const sizeCSS: Record<string, string> = {
  sm: "",
  md: "py-1",
  lg: "",
};

export default function AppButton({
  children,
  className,
  onClick,
  type,
  color,
  outline,
  size = "md",
  loading = false,
  loadingText = "",
  disabled,
}: Props) {
  const finalVariant = outline ? `${color}-outline` : color;

  const buttonClassName = twMerge(
    baseCSS,
    variants[finalVariant],
    sizeCSS[size],
    loading ? "cursor-wait" : undefined,
    className,
    disabled ? "cursor-not-allowed" : undefined
  );

  return (
    <button
      className={buttonClassName}
      type={type}
      disabled={loading}
      onClick={onClick}
    >
      {loading && loadingText && (
        <>
          <AppSpinner />
          <span className="ml-2">{loadingText}</span>
        </>
      )}
      {loading && !loadingText && <AppSpinner />}
      {!loading && children}
    </button>
  );
}
