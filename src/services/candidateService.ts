import type { Candidate } from "../types/candidate";
import { apiClient } from "./apiClient";

export const getCandidates = async (): Promise<Candidate[]> => {
  const response = await apiClient.get<Candidate[]>("/candidates");
  return response.data;
};

export const getCandidateById = async (
  id: string
): Promise<Candidate> => {
  const response = await apiClient.get<Candidate>(
    `/candidates/${id}`
  );
  return response.data;
};