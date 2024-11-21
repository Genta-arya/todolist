import AxiosConfig from "../AxiosConfig";

export const getData = async () => {
  try {
    const response = await AxiosConfig.get("/all");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteData = async (id) => {
  try {
    const response = await AxiosConfig.delete(`/delete/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateStatus = async (id) => {
  try {
    const response = await AxiosConfig.put(`/status/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createData = async (data) => {
  try {
    const response = await AxiosConfig.post("/create", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
