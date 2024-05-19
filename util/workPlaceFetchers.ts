import { WorkPlace } from "@/types/types";

export async function fetchWorkPlaces() {
  const response = await fetch(`/api/workPlace`, {
    method: "GET",
  });
  console.log(response);

  const result = await response.json();
  return result;
}
export async function fetchAddWorkPlace(workPlace: WorkPlace) {
  const response = await fetch(`/api/workPlace`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(workPlace),
  });
  const res = await response.json();
  return res;
}
export async function fetchRemoveWorkPlaces(ids: string[]) {
  const response = await fetch(`/api/workPlace/delete`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ids }),
  });
  const result = await response.json();
  if (result.success) {
    return result;
  }
  throw new Error("Failed to delete work places");
}
export async function fetchEditWorkPlace(workPlace: WorkPlace) {
  const response = await fetch(`/api/workPlace`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(workPlace),
  });
  const res = await response.json();
  return res;
}
