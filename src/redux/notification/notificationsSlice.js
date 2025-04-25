import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authorizedAxiosInstance from "~/utils/authorizeAxios";
import { api_root } from "~/utils/constants";

// Các hành động gọi api (bất đồng bộ) và cập nhật dữ liệu vào Redux, dùng Middleware createAsyncThunk đi kèm với extraReducers;
// https://redux-toolkit.js.org/api/createAsyncThunk
export const fetchInvitationsAPI = createAsyncThunk(
  "notifications/fetchInvitationsAPI",
  async () => {
    const response = await authorizedAxiosInstance.get(
      `${api_root}/v1/invitations`
    );
    // Lưu ý: axios sẽ trả kết quả về qua property của nó là data
    return response.data;
  }
);
export const updateBoardInvitationAPI = createAsyncThunk(
  "notifications/updateBoardInvitationAPI",
  async ({ status, invitationId }) => {
    const response = await authorizedAxiosInstance.put(
      `${api_root}/v1/invitations/board/${invitationId}`,
      { status }
    );
    return response.data;
  }
);

export const notificationsSlice = createSlice({
  name: "notifications",
  initialState: {
    currentNotifications: null,
  },
  //Noi xu li du lieu dong bo
  reducers: {
    clearCurrentNotifications: (state, action) => {
      state.currentNotifications = null;
    },
    updateCurrentNotifications: (state, action) => {
      state.currentNotifications = action.payload;
    },
    //them 1 ban ghi notification vao dau mang
    addNotifications: (state, action) => {
      const incomingInvitation = action.payload;
      state.currentNotifications.unshift(incomingInvitation);
    },
  },
  //extraReducers
  extraReducers: (builder) => {
    builder.addCase(fetchInvitationsAPI.fulfilled, (state, action) => {
      const incomingInvitation = action.payload;
      state.currentNotifications = Array.isArray(incomingInvitation)
        ? incomingInvitation.reverse()
        : [];
    });
    builder.addCase(updateBoardInvitationAPI.fulfilled, (state, action) => {
      const incomingInvitation = action.payload;
      const getInvitation = state.currentNotifications.find(
        (i) => i._id === incomingInvitation._id
      );
      getInvitation.boardInvitation = incomingInvitation.boardInvitation;
    });
  },
});

// Action la noi danh cho cac component ben duoi goi bang dispatch  toi no de cap nhat lai du lieu thong qua reducer, o trong muc reducer
export const {
  clearCurrentNotifications,
  updateCurrentNotifications,
  addNotifications,
} = notificationsSlice.actions;

//selector: danh cho cac component ben duoi goi bang useSelector de lay du lieu tu trong kho reduxStore ra su dung
export const selectCurrentNotification = (state) => {
  return state.notifications.currentNotifications;
};

export const NotificationsReducer = notificationsSlice.reducer;
