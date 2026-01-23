import API from "../api";

export const getWardboys = async (page = 1, limit = 10) => {
  try {
    const res = await API.get(`/wardBoys?page=${page}&limit=${limit}`);
    return res;
  } catch (error) {
    console.error("Error fetching wardboys:", error);
    throw error;
  }
};

export const createWardboy = async (data) => {
  try {
    const res = await API.post("/wardboys", data);
    return res;
  } catch (error) {
    console.error("Error creating wardboy:", error);
    throw error;
  }
};

export const updateWardboy = async (id, data) => {
  try {
    const res = await API.put(`/wardboys/${id}`, data);
    return res;
  } catch (error) {
    console.error("Error updating wardboy:", error);
    throw error;
  }
};

export const deleteWardboy = async (id) => {
  try {
    const res = await API.delete(`/wardboys/${id}`);
    return res;
  } catch (error) {
    console.error("Error deleting wardboy:", error);
    throw error;
  }
};
