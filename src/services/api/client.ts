import { JURIMETRY_API_BASE_URL } from "../../config";
import { fetchAuthSession } from "aws-amplify/auth";

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = "ApiError";
  }
}

type AuthProvider = () => Promise<HeadersInit>;

export class ApiClient {
  private baseUrl: string;
  private defaultHeaders: HeadersInit;
  private authProvider?: AuthProvider;

  constructor(
    baseUrl: string,
    options?: {
      defaultHeaders?: HeadersInit;
      authProvider?: AuthProvider;
    }
  ) {
    this.baseUrl = baseUrl;
    this.defaultHeaders = options?.defaultHeaders ?? { "Content-Type": "application/json" };
    this.authProvider = options?.authProvider;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const authHeaders = this.authProvider ? await this.authProvider() : {};

    const headers = {
      ...this.defaultHeaders,
      ...authHeaders,
      ...options.headers,
    };

    const config: RequestInit = {
      ...options,
      headers,
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        const errorText = await response.text();
        throw new ApiError(response.status, `API Error ${response.status}: ${errorText}`);
      }

      return (await response.json()) as T;
    } catch (error) {
      console.error("API Request Failed:", error);
      throw error;
    }
  }

  get<T>(endpoint: string, options?: RequestInit) {
    return this.request<T>(endpoint, { ...options, method: "GET" });
  }

  post<T>(endpoint: string, body: unknown, options?: RequestInit) {
    return this.request<T>(endpoint, {
      ...options,
      method: "POST",
      body: JSON.stringify(body),
    });
  }

  put<T>(endpoint: string, body: unknown, options?: RequestInit) {
    return this.request<T>(endpoint, {
      ...options,
      method: "PUT",
      body: JSON.stringify(body),
    });
  }

  delete<T>(endpoint: string, options?: RequestInit) {
    return this.request<T>(endpoint, { ...options, method: "DELETE" });
  }
}

export const jurimetryApi = new ApiClient(JURIMETRY_API_BASE_URL, {
  authProvider: async () => {
    const session = await fetchAuthSession();
    const token = session.tokens?.idToken?.toString();

    if (!token) {
      throw new Error("Missing idToken");
    }

    return {
      Authorization: `Bearer ${token}`,
    };
  },
});
