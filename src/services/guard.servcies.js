import API from "../api";
export const getGuards = () => API.get("/guards");


export const createGuard = (data) => API.post("/guards", data);

export const updateGuard = (id, data) =>
  API.put(`/guards/${id}`, data);

export const deleteGuard = (id) =>
  API.delete(`/guards/${id}`);