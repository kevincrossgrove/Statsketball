import { ChevronLeft } from "lucide-react";

interface Props {
  title: string;
  actions?: React.ReactNode;
  backAction?: () => void;
}

export default function AppHeader({ title, actions, backAction }: Props) {
  return (
    <div className="flex justify-between items-center p-4 bg-primary text-white mb-5">
      <div className="flex items-center">
        {backAction && (
          <div
            className="flex items-center justify-center rounded-sm w-8 h-8 cursor-pointer hover:bg-secondary group mr-2"
            onClick={backAction}
          >
            <ChevronLeft className="text-white h-7 w-7 group-hover:text-black" />
          </div>
        )}
        <h1 className="text-2xl font-semibold">{title}</h1>
      </div>
      {actions}
    </div>
  );
}
