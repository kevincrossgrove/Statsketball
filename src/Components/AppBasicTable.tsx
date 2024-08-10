import { ReactNode } from "react";
import { Skeleton } from "./ui/skeleton";

interface Props<T> {
  loading: boolean;
  items: T[];
  getItemTitle: (item: T) => ReactNode;
  getItemSubtitle: ((item: T) => ReactNode) | undefined;
  getItemIcon?: (item: T) => ReactNode;
  getItemStyle?: (item: T) => ReactNode;
  onClick?: (item: T) => void;
  CustomRenderer?: (item: T) => ReactNode;
  containerCSS?: string;
  emptyMessage?: string;
}

function AppBasicTable<T>({
  loading,
  items,
  getItemTitle,
  getItemSubtitle,
  getItemIcon,
  getItemStyle,
  onClick,
  CustomRenderer,
  containerCSS,
  emptyMessage,
}: Props<T>) {
  const Table = (
    <div className={containerCSS}>
      {loading ? (
        <div className="mx-4">
          <Skeleton className="w-full h-16 my-1" />
          <Skeleton className="w-full h-16 my-1" />
          <Skeleton className="w-full h-16 my-1" />
          <Skeleton className="w-full h-16 my-1" />
          <Skeleton className="w-full h-16 my-1" />
          <Skeleton className="w-full h-16 my-1" />
          <Skeleton className="w-full h-16 my-1" />
          <Skeleton className="w-full h-16 my-1" />
          <Skeleton className="w-full h-16 my-1" />
        </div>
      ) : Array.isArray(items) && items.length > 0 ? (
        items?.map((item, i) => {
          return (
            <div
              key={i}
              className={`h-16 flex items-center justify-between btn-oauth cursor-pointer w-100 my-1 mx-4 border rounded py-2 pl-6 pr-4 hover:bg-secondary ${
                getItemStyle ? getItemStyle(item) : ""
              } ${onClick ? "bg-ultralight--hover" : ""}`}
              onClick={onClick ? () => onClick(item) : undefined}
            >
              {getItemIcon && getItemIcon(item)}
              <div className="text-truncate" style={{ flex: 1 }}>
                <h4 className="mb-0 text-truncate font-semibold">
                  {getItemTitle(item)}
                </h4>
                {getItemSubtitle && <small>{getItemSubtitle(item)}</small>}
              </div>
              {CustomRenderer
                ? CustomRenderer(item)
                : onClick && (
                    <i
                      className="mdi mdi-chevron-right"
                      style={{ fontSize: 26 }}
                    />
                  )}
            </div>
          );
        })
      ) : (
        <div className="px-4 py-4 font-weight-500 bg-ultralight rounded mx-3 border bg-muted font-semibold">
          {emptyMessage || "No items have been added."}
        </div>
      )}
    </div>
  );

  return Table;
}

export default AppBasicTable;
