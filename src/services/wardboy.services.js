import API from "../api";
export const getWardboys = () => API.get("/wardboys");


export const createWardboy = (data) => API.post("/wardboys", data);

export const updateWardboy = (id, data) =>
  API.put(`/wardboys/${id}`, data);

export const deleteWardboy = (id) =>
  API.delete(`/wardboys/${id}`);