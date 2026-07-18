import api from "./api";

export const changePassword = async (data) => {
  const response = await api.put(
    "/user/change-password",
    data
  );

  return response.data;
};

export const deleteAccount = async () => {
  const response = await api.delete(
    "/user/delete-account"
  );

  return response.data;
};