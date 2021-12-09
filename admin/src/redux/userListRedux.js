import { createSlice } from "@reduxjs/toolkit";

const userListSlice = createSlice({
  name: "userList",
  initialState: {
    users: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    getAllUsersRequest: (state) => {
      state.isFetching = true;
    },
    getAllUsersSuccess: (state, action) => {
      state.isFetching = false;
      state.users = action.payload;
    },
    getAllUsersFailure: (state) => {
      state.isFetching = true;
      state.error = true;
    },
    deleteUserRequest: (state) => {
      state.isFetching = true;
    },
    deleteUserSuccess: (state, action) => {
      state.isFetching = false;
      //index - quantity delete
      state.products.splice(
        state.products.findIndex(
          (item) => item._id === action.payload,
        ),
        1,
      );
      alert("Delete user successfull")
    },
    deleteUserFailure: (state) => {
      state.isFetching = true;
      state.error = true;
    },
    updateUserRequest: (state) => {
      state.isFetching = true;
    },
    updateUserSuccess: (state, action) => {
      state.isFetching = false;

      state.users[
        state.users.findIndex(
          (item) =>
            item._id === action.payload.id,
        )
      ] = action.payload.updatedUser;
   alert("Update user successfull") },
    updateUserFailure: (state) => {
      state.isFetching = true;
      state.error = true;
    },
    addUserRequest: (state) => {
      state.isFetching = true;
    },
    addUserSuccess: (state, action) => {
      state.isFetching = false;

      state.users.push(action.payload);
      alert("Add user successfull")
    },
    addUserFailure: (state) => {
      state.isFetching = true;
      state.error = true;
    },
  },
});

export const {
  getAllUsersRequest,
  getAllUsersSuccess,
  getAllUsersFailure,
  addUserRequest,
  addUserSuccess,
  addUserFailure,
  updateUserRequest,
  updateUserSuccess,
  updateUserFailure,
  deleteUserRequest,
  deleteUserSuccess,
  deleteUserFailure,
} = userListSlice.actions;
export default userListSlice.reducer;
