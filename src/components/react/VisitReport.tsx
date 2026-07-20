import { useVisitReport } from "../../hooks/useVisitReport";

/** Invisible island: reports visits via useVisitReport on app init. */
export default function VisitReport() {
  useVisitReport();
  return null;
}
