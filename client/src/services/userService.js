import api from "./api";

export const fetchMyProfile = async () => {
  const { data } = await api.get("/users/profile");
  return data;
};

export const updateMyProfile = async (payload) => {
  const { data } = await api.patch("/users/profile", payload);
  return data;
};

export const updateMySettings = async (payload) => {
  const { data } = await api.patch("/users/settings", payload);
  return data;
};
