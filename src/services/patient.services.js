import API from "../api";

export const getPatients = async () => {
  try {
    const response = await API.get("/patients");
    return response;
  } catch (error) {
    console.error("Error fetching patients:", error);
    throw error;
  }
};

export const createPatient = async (data) => {
  try {
    const response = await API.post("/patients", data);
    return response;
  } catch (error) {
    console.error("Error creating patient:", error);
    throw error;
  }
};

export const updatePatient = async (id, data) => {
  try {
    const response = await API.put(`/patients/${id}`, data);
    return response;
  } catch (error) {
    console.error("Error updating patient:", error);
    throw error;
  }
};

export const deletePatient = async (id) => {
  try {
    const response = await API.delete(`/patients/${id}`);
    return response;
  } catch (error) {
    console.error("Error deleting patient:", error);
    throw error;
  }
};
