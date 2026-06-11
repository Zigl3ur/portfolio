import { useState, useEffect } from "react";

type FetchOptions = Omit<RequestInit, "method">;

export function useFetch<T>(url: string, options?: FetchOptions) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [status, setStatus] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(url, options);
        setStatus(res.status);
        if (!res.ok) setError(new Error(`HTTP error! status: ${res.status}`));
        const data = (await res.json()) as T;
        setData(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Unknown error"));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, options]);

  return { data, loading, error, status };
}

export const useMutation = <T>(url: string, options?: FetchOptions) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [status, setStatus] = useState<number | null>(null);

  const mutate = async (body: any) => {
    setLoading(true);
    try {
      const res = await fetch(url, {
        ...options,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...options?.headers
        },
        body: JSON.stringify(body)
      });
      setStatus(res.status);
      if (!res.ok) setError(new Error(`HTTP error! status: ${res.status}`));
      const data = (await res.json()) as T;
      setData(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unknown error"));
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, status, mutate };
};
