import {
  DataSourcePayloadSchema,
  DataSources,
  DataSourceSchema,
} from "../Types";
import API from "./API";
import ShortUniqueId from "short-unique-id";

// RecordAPI class. Just provide the moduleAPIName when creating an instance of the class
export default class RecordAPI<
  PayloadT extends DataSourcePayloadSchema,
  SavedT extends DataSourceSchema
> {
  url: string;

  constructor(dataSource: DataSources) {
    this.url = dataSource;
  }

  // Get all records in a specified module
  GetAll() {
    // Mock async call with setTimeout
    return new Promise<SavedT[]>((resolve) => {
      const dataString = localStorage.getItem(this.url);
      let savedData: SavedT[];

      if (!dataString) savedData = [];
      else savedData = JSON.parse(dataString);

      setTimeout(() => {
        resolve(savedData);
      }, 2000);
    });

    // return API.BearerRequest({
    //   method: "GET",
    //   url: this.url,
    //   tags: tags,
    // });
  }

  // Get a record by ID
  GetById({
    id,
    throwError = true,
    fields,
  }: {
    id: string;
    throwError?: boolean;
    fields?: string[];
  }) {
    return API.BearerRequest({
      method: "GET",
      url: `${this.url}/${id}${
        fields?.length ? `?fields=${JSON.stringify(fields)}` : ""
      }`,
      throwError: throwError,
    });
  }

  // Get a record by Value
  GetByValue({
    fieldAPIName,
    value,
    throwError = true,
  }: {
    fieldAPIName: string;
    value: string;
    throwError?: boolean;
  }) {
    return API.BearerRequest({
      method: "GET",
      url: `${this.url}/fields/${fieldAPIName}/${value}`,
      throwError: throwError,
    });
  }

  // Search for records in a specified module
  Search({ query }: { query: any }) {
    return API.BearerRequest({
      method: "PUT",
      url: `${this.url}/search`,
      data: query,
    });
  }

  // Search for records in a specified module using ids
  SearchByIds(payload: string[]) {
    return API.BearerRequest({
      method: "PUT",
      url: `${this.url}/searchByIds`,
      data: payload,
    });
  }

  // Create a record in a specified module
  Create(data: PayloadT) {
    // Mock async call with setTimeout
    return new Promise<SavedT>((resolve) => {
      const idGenerator = new ShortUniqueId();
      const id = idGenerator.randomUUID();

      // @ts-expect-error
      const finalData: SavedT = { ...data, id };

      const dataString = localStorage.getItem(this.url);

      let savedData: SavedT[];

      if (!dataString) savedData = [];
      else savedData = JSON.parse(dataString);

      savedData.push(finalData);

      console.log("Saved data");

      localStorage.setItem(this.url, JSON.stringify(savedData));

      setTimeout(() => {
        resolve(savedData[savedData.length - 1]);
      }, 1000);
    });

    // return API.BearerRequest({
    //   method: "POST",
    //   url: url,
    //   data: data,
    // });
  }

  // Update a record by id
  Update(id: string, data: SavedT) {
    // Mock async call with setTimeout
    return new Promise((resolve) => {
      const dataString = localStorage.getItem(this.url);
      let savedData: SavedT[];

      if (!dataString) throw new Error("Item not found");
      else savedData = JSON.parse(dataString);

      const index = savedData.findIndex((item) => item.id === id);

      if (index === -1) throw new Error("Item not found");

      savedData[index] = { ...savedData[index], ...data };

      localStorage.setItem(this.url, JSON.stringify(savedData));

      setTimeout(() => {
        resolve(savedData[index]);
      }, 2000);
    });

    // let url = this.url + "/" + id;

    // return API.BearerRequest({
    //   method: "PUT",
    //   url: url,
    //   data: { payload: data },
    // });
  }

  // Delete a record by id
  DeleteByID(id: string) {
    // Mock async call with setTimeout
    return new Promise((resolve) => {
      const dataString = localStorage.getItem(this.url);
      let savedData: SavedT[];

      if (!dataString) throw new Error("Item not found");
      else savedData = JSON.parse(dataString);

      const index = savedData.findIndex((item) => item.id === id);

      if (index === -1) throw new Error("Item not found");

      savedData.splice(index, 1);

      localStorage.setItem(this.url, JSON.stringify(savedData));

      setTimeout(() => {
        resolve(savedData[index]);
      }, 2000);
    });

    // return API.BearerRequest({
    //   method: "DELETE",
    //   url: this.url + "/" + id,
    // });
  }
}
