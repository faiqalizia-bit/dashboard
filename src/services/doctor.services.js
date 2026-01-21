import API from "../api";

export const getDoctors = async () => {
  try {
    const response = await API.get("/doctors");
    return response;
  } catch (error) {
    console.error("Error fetching doctors:", error);
    throw error;
  }
};

export const createDoctor = async (data) => {
  try {
    const response = await API.post("/doctors", data);
    return response;
  } catch (error) {
    console.error("Error creating doctor:", error);
    throw error;
  }
};

export const updateDoctor = async (id, data) => {
  try {
    const response = await API.put(`/doctors/${id}`, data);
    return response;
  } catch (error) {
    console.error("Error updating doctor:", error);
    throw error;
  }
};

export const deleteDoctor = async (id) => {
  try {
    const response = await API.delete(`/doctors/${id}`);
    return response;
  } catch (error) {
    console.error("Error deleting doctor:", error);
    throw error;
  }
};
