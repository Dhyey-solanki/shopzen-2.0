import api from "./api";

export const fetchMyOrders = async () => {
  const { data } = await api.get("/orders/mine");
  return data;
};

export const fetchMyOrderById = async (id) => {
  const { data } = await api.get(`/orders/mine/${id}`);
  return data;
};
