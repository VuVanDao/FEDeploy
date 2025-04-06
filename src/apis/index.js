import axios from "axios";
import { api_root } from "~/utils/constants";
//board
export const fetchBoardDetailAPi = async (boardId) => {
  const request = await axios.get(`${api_root}/v1/boards/${boardId}`);
  return request.data;
};

export const updateBoardDetailAPi = async (boardId, updateData) => {
  const request = await axios.put(
    `${api_root}/v1/boards/${boardId}`,
    updateData
  );
  return request.data;
};
export const moveCardToDifferentColumnApi = async (updateData) => {
  const request = await axios.put(
    `${api_root}/v1/boards/supports/moving_cards`,
    updateData
  );
  return request.data;
};

//column
export const createNewColumnAPI = async (newColumnData) => {
  const request = await axios.post(`${api_root}/v1/columns`, newColumnData);
  return request.data;
};
export const updateColumnDetailAPi = async (columnId, updateData) => {
  const request = await axios.put(
    `${api_root}/v1/columns/${columnId}`,
    updateData
  );
  return request.data;
};
export const deleteColumnDetailsApi = async (columnId) => {
  const request = await axios.delete(`${api_root}/v1/columns/${columnId}`);
  return request.data;
};

//card
export const createNewCardAPI = async (newCardData) => {
  const request = await axios.post(`${api_root}/v1/cards`, newCardData);
  return request.data;
};
