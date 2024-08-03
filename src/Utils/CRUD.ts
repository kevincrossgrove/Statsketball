import RecordAPI from "../API/RecordAPI";
import { DataSources, DataSourcesSchemaMap } from "../Types";

function ValidateItem<T>(dataSource: DataSources, data: T) {
  const schema = DataSourcesSchemaMap[dataSource];

  if (!schema) {
    throw new Error(`DataSource ${dataSource} not found`);
  }

  const validatedItem = schema.parse(data);

  return validatedItem;
}

async function CreateItem<T>(dataSource: DataSources, data: T) {
  const validatedItem = ValidateItem(dataSource, data);

  const ItemAPI = new RecordAPI(dataSource);

  const result = await ItemAPI.Create(validatedItem);
}
