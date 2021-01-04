import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "./api";

let lastId = 0;

const slice = createSlice({
  name: "bugs",
  initialState: {
    list: [],
    loading: false,
    lastFetch: null,
  },
  reducers: {
    bugsRequested: (bugs, action) => {
      bugs.loading = true;
    },

    bugReceived: (bugs, action) => {
      bugs.list = action.payload;
      bugs.loading = false;
    },

    bugsRequestFailed: (bugs, action) => {
      bugs.loading = false;
    },

    // actions => action handler
    bugAssignedToUser: (bugs, action) => {
      const { bugId, userId } = action.payload;
      const index = bugs.list.findIndex((bug) => bug.id === bugId);
      bugs.list[index].userId = userId;
    },

    bugAdded: (bugs, action) => {
      bugs.list.push({
        id: ++lastId,
        description: action.payload.description,
        resolved: false,
      });
    },

    bugResolved: (bugs, action) => {
      const index = bugs.list.findIndex((bug) => bug.id === action.payload.id);
      bugs.list[index].resolved = true;
    },
  },
});

export const {
  bugAdded,
  bugResolved,
  bugAssignedToUser,
  bugReceived,
  bugsRequested,
  bugsRequestFailed,
} = slice.actions;
export default slice.reducer;

// Action Creators
const url = "/bugs";

export const loadBugs = () =>
  apiCallBegan({
    url,
    onStart: bugsRequested.type,
    onSuccess: bugReceived.type,
    onError: bugsRequestFailed.type,
  });

// Selector

// Memorization to improve the performance, no need to re-calculate
// bugs => get unresolved bugs from the cache
export const getUnresolvedBugs = createSelector(
  (state) => state.entities.bugs,
  (state) => state.entities.projects,
  (bugs, projects) => bugs.filter((bug) => !bug.resolved)
);

export const getBugsByUser = (userId) =>
  createSelector(
    (state) => state.entities.bugs,
    (bugs) => bugs.filter((bug) => bug.userId === userId)
  );
