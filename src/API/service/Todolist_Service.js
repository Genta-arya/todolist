import AxiosConfig from "../AxiosConfig";

// export const getData = async () => {
//   try {
//     const response = await AxiosConfig.get("/all");
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

export const getData = async () => {
  try {
    const response = await AxiosConfig.get("/tasks");
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const deleteData = async (id) => {
  try {
    const response = await AxiosConfig.delete(`/tasks/${id}/delete`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateStatus = async (id) => {
  try {
    const response = await AxiosConfig.put(`/tasks/${id}/status`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// export const createData = async (data) => {
//   try {
//     const response = await AxiosConfig.post("/create", data);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };


export const createData = async (data) => {
  try {
    const response = await AxiosConfig.post("/tasks", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
