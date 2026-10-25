import { useState, useEffect, useCallback } from "react";
import { apiUrl } from "../lib/api";

type FetchOptions = Omit<RequestInit, "method"> & { refetchInterval: number };

type useFetchParams = {
  baseUrl?: string;
  options?: FetchOptions;
};

export function useFetch<T>(
  url: string,
  { baseUrl = apiUrl(), options }: useFetchParams = {}
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [status, setStatus] = useState<number | null>(null);
  const [headers, setHeaders] = useState<Headers | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch(baseUrl + url, options);
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
  }, [baseUrl, url]);

  useEffect(() => {
    fetchData();
    if (!options?.refetchInterval) return;
    const id = setInterval(fetchData, options.refetchInterval);
    return () => clearInterval(id);
  }, [fetchData, options?.refetchInterval]);

  return { data, loading, error, status, headers, refetch: fetchData };
}

export const useMutation = <T>(
  url: string,
  { baseUrl = apiUrl(), options }: useFetchParams = {}
) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [status, setStatus] = useState<number | null>(null);
  const [headers, setHeaders] = useState<Headers | null>(null);

  const mutate = async (body: any) => {
    setLoading(true);
    try {
      const res = await fetch(baseUrl + url, {
        ...options,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...options?.headers
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
