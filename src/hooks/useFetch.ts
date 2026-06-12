import { useState, useEffect } from "react";
import { apiUrl } from "../lib/api";

type FetchOptions = Omit<RequestInit, "method">;

type useFetchParams = {
  baseUrl: string;
  options?: FetchOptions;
};

export function useFetch<T>(
  url: string,
  params: useFetchParams = { baseUrl: apiUrl() }
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [status, setStatus] = useState<number | null>(null);
  const [headers, setHeaders] = useState<Headers | null>(null);

  const fetchData = async () => {
    const endpoint = params.baseUrl + url;

    try {
      const res = await fetch(endpoint, params.options);
      setStatus(res.status);
      setHeaders(res.headers);
      if (!res.ok) setError(new Error(`HTTP error! status: ${res.status}`));
      const data = (await res.json()) as T;
      setData(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unknown error"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url, params.options]);

  return { data, loading, error, status, headers, refetch: fetchData };
}

export const useMutation = <T>(
  url: string,
  params: useFetchParams = { baseUrl: apiUrl() }
) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [status, setStatus] = useState<number | null>(null);
  const [headers, setHeaders] = useState<Headers | null>(null);

  const endpoint = params.baseUrl + url;

  const mutate = async (body: any) => {
    setLoading(true);
    try {
      const res = await fetch(endpoint, {
        ...params.options,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...params.options?.headers
        },
        body: JSON.stringify(body)
      });
      setStatus(res.status);
      setHeaders(res.headers);
      if (!res.ok) setError(new Error(`HTTP error! status: ${res.status}`));
      const data = (await res.json()) as T;
      setData(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unknown error"));
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, status, headers, mutate };
};
