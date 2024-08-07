import {
  DataSourcePayloadSchema,
  DataSources,
  DataSourceSchema,
} from "@/Types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import RecordAPI from "./RecordAPI";
import { ValidateItem } from "./DataUtils";

interface MutationProps<T, S> {
  payload: T;
  onSuccess?: (item: S) => void;
  onError?: (error: string) => void;
}

export default function useCreateItem<
  T extends DataSourcePayloadSchema,
  S extends DataSourceSchema
>(dataSource: DataSources) {
  const client = useQueryClient();

  const createItem = useMutation({
    mutationFn: ({ payload }: MutationProps<T, S>) => {
      const ItemAPI = new RecordAPI<T, S>(dataSource);

      console.log(dataSource);

      ValidateItem(dataSource, payload);

      return ItemAPI.Create(payload);
    },
    onSuccess: (data, { onSuccess }) => {
      client.setQueryData<S[]>([dataSource], (prev) => {
        if (!prev) return [data];

        return [...prev, data];
      });
      console.log("Successfully created item");
      onSuccess && onSuccess(data);
    },
    onError: (error, { onError }) => {
      // @ts-ignore
      console.log(error.issues);
      onError && onError(error?.message || "Error creating item");
    },
  });

  return { create: createItem.mutate, creating: createItem.isPending };
}
