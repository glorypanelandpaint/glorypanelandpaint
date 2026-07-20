import { api } from "./client";

export type VisitResponse = {
  success: boolean;
};

/** Report a browser visit. */
export function reportVisit() {
  return api.get<VisitResponse>("/visit");
}
