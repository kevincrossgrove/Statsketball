// For use in API routes only. This protects the token on the server
export default class API {
  static async BearerRequest({
    method,
    url,
    data,
    token,
    throwError,
    headers,
    stringify = true,
  }: {
    method: RequestInit["method"];
    url: string;
    data?: {} | null;
    token?: string | null;
    throwError?: boolean;
    tags?: string[];
    revalidate?: number;
    headers?: Record<string, string>;
    stringify?: boolean;
  }) {
    const Token = "";
    const HostAPI = "";

    // Allows for an auth token to be passed in.
    const finalToken = token || Token;

    return fetch(HostAPI + url, {
      method: method,
      headers: headers
        ? headers
        : {
            Authorization: "Bearer " + finalToken,
            "Content-Type": "application/json",
          },
      ...(data && {
        body: stringify ? JSON.stringify(data) : (data as FormData),
      }),
    }).then((res) => {
      if (!res.ok && throwError) {
        throw new Error(res.statusText);
      }

      return res.json();
    });
  }
}
