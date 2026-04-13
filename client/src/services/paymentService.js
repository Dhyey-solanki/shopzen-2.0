import api from "./api";

export const completeCheckout = async (payload) => {
  const { data } = await api.post("/payments/checkout", payload);
  return data;
};
