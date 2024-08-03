import { DataSources, DataSourcesSchemaMap } from "../Types";

export function ValidateItem<T>(dataSource: DataSources, data: T) {
  const schema = DataSourcesSchemaMap[dataSource];

  if (!schema) {
    throw new Error(`DataSource ${dataSource} not found`);
  }

  const validatedItem = schema.parse(data);

  return validatedItem;
}
