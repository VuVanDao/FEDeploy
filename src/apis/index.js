import { toast } from "react-toastify";
import authorizeAxiosInstance from "~/utils/authorizeAxios";
import { api_root } from "~/utils/constants";
//board
// export const fetchBoardDetailAPi = async (boardId) => {
//   const response = await axios.get(`${api_root}/v1/boards/${boardId}`);
//   return response.data;
// };

export const updateBoardDetailAPi = async (boardId, updateData) => {
  const response = await authorizeAxiosInstance.put(
    `${api_root}/v1/boards/${boardId}`,
    updateData
  );
  return response.data;
};
export const moveCardToDifferentColumnApi = async (updateData) => {
  const response = await authorizeAxiosInstance.put(
    `${api_root}/v1/boards/supports/moving_cards`,
    updateData
  );
  return response.data;
};

//column
export const createNewColumnAPI = async (newColumnData) => {
  const response = await authorizeAxiosInstance.post(
    `${api_root}/v1/columns`,
    newColumnData
  );
  return response.data;
};
export const updateColumnDetailAPi = async (columnId, updateData) => {
  const response = await authorizeAxiosInstance.put(
    `${api_root}/v1/columns/${columnId}`,
    updateData
  );
  return response.data;
};
export const deleteColumnDetailsApi = async (columnId) => {
  const response = await authorizeAxiosInstance.delete(
    `${api_root}/v1/columns/${columnId}`
  );
  return response.data;
};

//card
export const createNewCardAPI = async (newCardData) => {
  const response = await authorizeAxiosInstance.post(
    `${api_root}/v1/cards`,
    newCardData
  );
  return response.data;
};

//user
export const registerUserAPI = async (data) => {
  const response = await authorizeAxiosInstance.post(
    `${api_root}/v1/users/register`,
    data
  );
  toast.success(
    "Account created successfully, plz check your email and verify your account",
    { theme: "colored" }
  );
  return response.data;
};
export const verifyUserAPI = async (data) => {
  const response = await authorizeAxiosInstance.put(
    `${api_root}/v1/users/verify`,
    data
  );
  toast.success(
    "Your account verified successfully, enjoy our service 😁😁😁",
    { theme: "colored" }
  );
  return response.data;
};
export const refreshTokenAPI = async () => {
  const response = await authorizeAxiosInstance.post(
    `${api_root}/v1/users/refresh_token`
  );
  return response.data;
};
