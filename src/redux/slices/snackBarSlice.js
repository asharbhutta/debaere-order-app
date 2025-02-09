import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  visible: false,
  message: "aa",
  color: "green",
  isLoading: false,
  isLoadingDismissed: true,
  modalOpen: false,
  adOpen: false,
};

const snackBarSlice = createSlice({
  name: "snackSlice",
  initialState,
  reducers: {
    showSucessSnackBar: (state, payload) => {
      state.visible = true;
      state.message = payload.payload.message;
      state.color = "green";
    },
    showErrorSnackBar: (state, payload) => {
      state.visible = true;
      state.message = payload.payload.message;
      state.color = "red";
    },
    showWarningSnackBar: (state, payload) => {
      state.visible = true;
      state.message = payload.payload.message;
      state.color = "orange";
    },
    hideSnackBar: (state) => {
      state.visible = false;
    },
    loadingStarted: (state) => {
      state.isLoading = true;
      state.isLoadingDismissed = false
    },
    loadingFinished: (state) => {
      state.isLoading = false;
    },
    loadingDismissed: (state) => {
      state.isLoadingDismissed = true
    },
    modalOpen: (state) => {
      state.modalOpen = true;
    },
    modalClose: (state) => {
      state.modalOpen = false;
    },

    adOpen: (state) => {
      state.adOpen = true;
    },
    adClose: (state) => {
      state.adOpen = false;
    },
  },
});

export const {
  showSucessSnackBar,
  showWarningSnackBar,
  showErrorSnackBar,
  hideSnackBar,
  loadingStarted,
  loadingFinished,
  loadingDismissed,
  modalClose,
  modalOpen,
  adClose,
  adOpen,
} = snackBarSlice.actions;
export const selectSnackVisible = (state) => state.snackSlice.visible;
export const selectSnackMessage = (state) => state.snackSlice.message;
export const selectSnackColor = (state) => state.snackSlice.color;
export const selectLoadingStatus = (state) => state.snackSlice.isLoading;
export const selectLoadingDismissedStatus = (state) => state.snackSlice.isLoadingDismissed;
export const selectModalStatus = (state) => state.snackSlice.modalOpen;
export const selectAddStatus = (state) => state.snackSlice.adOpen;

export default snackBarSlice.reducer;
