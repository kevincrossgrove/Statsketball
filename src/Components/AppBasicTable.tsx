import { ReactNode } from "react";
import AppLoading from "./AppLoading";

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
        <AppLoading />
      ) : Array.isArray(items) && items.length > 0 ? (
        items?.map((item, i) => {
          return (
            <div
              key={i}
              className={`d-flex align-items-center justify-content-between rounded-sm btn-oauth cursor-pointer w-100 ${
                getItemStyle ? getItemStyle(item) : ""
              } ${onClick ? "bg-ultralight--hover" : ""}`}
              style={{ padding: "10px 17px", margin: "2px 0" }}
              onClick={onClick ? () => onClick(item) : undefined}
            >
              {getItemIcon && getItemIcon(item)}
              <div className="text-truncate" style={{ flex: 1 }}>
                <h4 className="mb-0 text-truncate">{getItemTitle(item)}</h4>
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
        <div className="px-3 py-4 font-weight-500 bg-ultralight rounded">
          {emptyMessage || "No items have been added."}
        </div>
      )}
    </div>
  );

  return Table;
}

export default AppBasicTable;
