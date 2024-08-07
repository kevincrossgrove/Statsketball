import { DataSources, DataSourceSchema } from "@/Types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import RecordAPI from "./RecordAPI";
import { useState } from "react";

interface MutationProps {
  id: string;
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export default function useDeleteItem<T extends DataSourceSchema>({
  dataSource,
}: {
  dataSource: DataSources;
}) {
  const client = useQueryClient();
  const [deletingID, setDeletingID] = useState<string>("");

  const deleteItem = useMutation({
    mutationFn: ({ id }: MutationProps) => {
      const ItemAPI = new RecordAPI<T, T>(dataSource);

      setDeletingID(id);

      return ItemAPI.DeleteByID(id);
    },
    onSuccess: (_, { id, onSuccess }) => {
      const data = client.getQueryData([dataSource]);

      console.log("existing data", data);

      client.setQueryData<T[]>([dataSource], (prev) => {
        if (!prev || !Array.isArray(prev)) return [];

        return prev.filter((prev) => prev.id !== id);
      });

      console.log("Successfully deleted item with id");
      onSuccess && onSuccess();
    },
    onError: (error, { onError }) => {
      onError && onError(error?.message || "Error deleting item");
    },
    onSettled: () => {
      setDeletingID("");
    },
  });

  return { delete: deleteItem.mutate, deletingID: deletingID };
}
