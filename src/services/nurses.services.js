import API from "../api";
export const getNurses = () => API.get("/nurses");


export const createNurse = (data) => API.post("/nurses", data);

export const updateNurse = (id, data) =>
  API.put(`/nurses/${id}`, data);

export const deleteNurse = (id) =>
  API.delete(`/nurses/${id}`);