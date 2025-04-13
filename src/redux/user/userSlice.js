import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import authorizeAxiosInstance from "~/utils/authorizeAxios";
import { api_root } from "~/utils/constants";

export const LoginUserAPI = createAsyncThunk(
  "user/LoginUserAPI",
  async (userData) => {
    const request = await authorizeAxiosInstance.post(
      `${api_root}/v1/users/login`,
      userData
    );
    return request.data;
  }
);
export const LogoutUserAPI = createAsyncThunk(
  "user/LogoutUserAPI",
  async (showSuccessMessage = true) => {
    const response = await authorizeAxiosInstance.delete(
      `${api_root}/v1/users/logout`
    );
    if (showSuccessMessage) {
      toast.success("logout successfully!");
    }
    return response.data;
  }
);
export const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
  },
  //extraReducers
  extraReducers: (builder) => {
    builder.addCase(LoginUserAPI.fulfilled, (state, action) => {
      const user = action.payload; //action.payload = request.data
      state.currentUser = user;
    });
    builder.addCase(LogoutUserAPI.fulfilled, (state, action) => {
      state.currentUser = null;
    });
  },
});

// Action la noi danh cho cac component ben duoi goi bang dispatch  toi no de cap nhat lai du lieu thong qua reducer
// export const {} = userSlice.actions;

//selector: danh cho cac component ben duoi goi bang useSelector de lay du lieu tu trong kho reduxStore ra su dung
export const selectCurrentUser = (state) => {
  return state.user.currentUser;
};

// export default userSlice.reducer;
export const UserReducer = userSlice.reducer;
