import API from "../api";

export const getDepartments = async (page = 1, limit = 10) => {
   try {
    const response = await API.get(`/departments?page=${page}&limit=${limit}`);
    return response;
  } catch (error) {
    console.error("Error fetching departments:", error);
    throw error;
  }
};

export const createDepartment = async (data) => {
  try {
    const res = await API.post("/departments", data);
    return res;
  } catch (error) {
    console.error("Error creating department:", error);
    throw error;
  }
};

export const updateDepartment = async (id, data) => {
  try {
    const res = await API.put(`/departments/${id}`, data);
    return res;
  } catch (error) {
    console.error("Error updating department:", error);
    throw error;
  }
};

export const deleteDepartment = async (id) => {
  try {
    const res = await API.delete(`/departments/${id}`);
    return res;
  } catch (error) {
    console.error("Error deleting department:", error);
    throw error;
  }
};