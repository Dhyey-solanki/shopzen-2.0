import api from "./api";

export const fetchAdminProducts = async () => {
  const { data } = await api.get("/admin/products");
  return data;
};

export const fetchAdminProductById = async (id) => {
  const { data } = await api.get(`/admin/products/${id}`);
  return data;
};

export const createAdminProduct = async (payload) => {
  const { data } = await api.post("/admin/products", payload);
  return data;
};

export const updateAdminProduct = async (id, payload) => {
  const { data } = await api.patch(`/admin/products/${id}`, payload);
  return data;
};

export const deleteAdminProduct = async (id) => {
  const { data } = await api.delete(`/admin/products/${id}`);
  return data;
};

export const fetchAdminOrders = async () => {
  const { data } = await api.get("/admin/orders");
  return data;
};

export const fetchAdminOrderById = async (id) => {
  const { data } = await api.get(`/admin/orders/${id}`);
  return data;
};

export const updateAdminOrder = async (id, payload) => {
  const { data } = await api.patch(`/admin/orders/${id}`, payload);
  return data;
};
