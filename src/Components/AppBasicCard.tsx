import { twMerge } from "tailwind-merge";

interface Props {
  title: string;
  onClick?: () => void;
  className?: string;
}

export default function AppBasicCard({ title, onClick, className }: Props) {
  return (
    <div
      className={twMerge(
        "border rounded border-white text-white text-xl font-semibold p-4 my-2 hover:bg-slate-600 hover:border-green-400",
        onClick && "cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      {title}
    </div>
  );
}
