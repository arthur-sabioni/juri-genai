import { jurimetryApi } from './client';
import { fetchAuthSession } from "aws-amplify/auth";

export type StartJobResponse = {
  jobId?: string;
  status?: string;
  [key: string]: unknown;
};

export const jurimetryService = {
  startJob: async (url: string) => {
    const session = await fetchAuthSession();
    const token = session.tokens?.idToken?.toString();

    if (!token) {
      throw new Error("Missing idToken");
    }

    return jurimetryApi.post<StartJobResponse>('/start-job', { url }, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
