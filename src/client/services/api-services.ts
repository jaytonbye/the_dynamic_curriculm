// This file is for doing fetches everywhere in this project.

export const TOKEN_KEY = "token";

export async function apiService<T = any>(
  uri: string,
  method: string = "GET",
  data?: {}
) {
  const TOKEN = sessionStorage.getItem(TOKEN_KEY);

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  const fetchOptions: IFetchOptions = {
    method,
    headers,
    body: JSON.stringify(data),
  };

  if (TOKEN) {
    headers["Authorization"] = `Bearer ${TOKEN}`;
  }

  if (method === "GET") {
    delete headers["Content-type"];
    delete fetchOptions.body;
  }

  try {
    const res = await fetch(uri, fetchOptions);

    // custom error handling is useful when you're learning
    if (res.status === 400) {
      throw new Error("check fetch options for any errors");
    }

    if (res.status === 401) {
      throw new Error(
        "no token, expired token, or server could not validate token"
      );
    }

    if (res.status === 404) {
      throw new Error("the server endpoint path was not found");
    }

    if (res.status === 500) {
      throw new Error("server blew up, check the terminal logs");
    }

    // only attempt to parse the response json
    // if the fetch gets a good status code e.g. 200/201
    if (res.ok) {
      return <T>await res.json();
    }
  } catch (error) {
    console.error("[error in apiService]", error.message);

    //what does throw error do here? Didn't we already throw the error?
    //why does my program terminate here? I want it to continue on the login page.
  }
}

interface IFetchOptions {
  method: string;
  headers?: HeadersInit;
  body?: string;
}
