import { z } from "zod";
import { API_BASE_URL } from "#resources/constants";

export const apiClient = {
  get<T extends z.ZodType>(
    endpoint: string,
    responseSchema: T,
    options?: RequestInit
  ) {
    return request(endpoint, responseSchema, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
      method: "GET",
    });
  },

  post<T extends z.ZodType>(
    endpoint: string,
    responseSchema: T,
    options: RequestInit
  ) {
    return request(endpoint, responseSchema, {
      ...options,
      method: "POST",
    });
  },

  delete<T extends z.ZodType>(endpoint: string, responseSchema: T) {
    return request(endpoint, responseSchema, {
      method: "DELETE",
    });
  },

  patch<T extends z.ZodType>(
    endpoint: string,
    responseSchema: T,
    options: RequestInit
  ) {
    return request(endpoint, responseSchema, {
      ...options,
      method: "PATCH",
    });
  },
};

async function request<T extends z.ZodType>(
  endpoint: string,
  responseSchema: T,
  options: RequestInit
): Promise<z.infer<T>> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, options);

  if (!response.ok) {
    const message = await response.json();
    throw new Error(message);
  }

  const parsed = responseSchema.safeParse(await response.json());
  if (!parsed.success) {
    console.log(parsed.error.message);
    console.trace("trace");
    throw new Error(parsed.error.message);
  }

  return parsed.data;
}
