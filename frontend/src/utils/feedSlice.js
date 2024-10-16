import { createSlice } from "@reduxjs/toolkit";

const FeedSlice = createSlice({
  name: "feed",
  initialState: null,
  reducers: {
    addFeed: (state, action) => {
      return action.payload;
    },
    removeFeed: (state, action) => null,
  },
});
export const { addFeed, removeFeed } = FeedSlice.actions;
export default FeedSlice.reducer;
