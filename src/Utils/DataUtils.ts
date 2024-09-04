import { DataSources, DataSourcesPayloadSchemaMap } from "../types/Types";

export function ValidateItem<T>(dataSource: DataSources, data: T) {
  const schema = DataSourcesPayloadSchemaMap[dataSource];

  if (!schema) {
    throw new Error(`DataSource ${dataSource} not found`);
  }

  const validatedItem = schema.parse(data);

  return validatedItem;
}

// Example: Kevin Crossgrove => K. Crossgrove
// If there isn't a first and last name, just return the full name
export function GetShortName(name: string) {
  if (!name || typeof name !== "string") return name;

  const names = name.split(" ");

  if (names.length === 1) return name;

  try {
    const shortName = `${names[0][0]}. ${names[1]}`;

    return shortName;
  } catch {
    return name;
  }
}
