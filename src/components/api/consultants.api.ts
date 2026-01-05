import { getAuthToken } from "../../utils/auth";

const BACKEND = process.env.REACT_APP_BACKEND ?? "http://localhost:8000";

export type ConsultantPosition = "left" | "right";

export type UpdateConsultantInput = {
  name?: string;
  title?: string;
  photo?: File | null;
};

export const updateConsultant = async (position: ConsultantPosition, input: UpdateConsultantInput) => {
  const token = getAuthToken();
  if (!token) throw new Error("No auth token");

  const formData = new FormData();

  const trimmedName = input.name?.trim();
  const trimmedTitle = input.title?.trim();

  if (trimmedName) formData.append("name", trimmedName);
  if (trimmedTitle) formData.append("title", trimmedTitle);
  if (input.photo) formData.append("photo", input.photo);

  const res = await fetch(`${BACKEND}/consultants/${position}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `Request failed: ${res.status}`);
  }
};
