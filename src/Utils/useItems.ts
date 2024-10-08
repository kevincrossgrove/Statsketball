import { useQuery } from "@tanstack/react-query";
import { DataSources, DataSourceSchema } from "../types/Types";
import RecordAPI from "../utils/RecordAPI";

interface Props {
  dataSource: DataSources;
  onError?: (error: string) => void;
}

const empty: [] = [];

export default function useItems<T extends DataSourceSchema>({
  dataSource,
  onError,
}: Props) {
  const items = useQuery<T[]>({
    queryKey: [dataSource],
    queryFn: () => {
      const ItemAPI = new RecordAPI<T, T>(dataSource);

      return ItemAPI.GetAll().catch((error) => {
        console.error(error);
        if (onError) onError(error);
        return [];
      });
    },
  });

  return {
    items: items.data || empty,
    loading: items.isLoading,
  };
}
