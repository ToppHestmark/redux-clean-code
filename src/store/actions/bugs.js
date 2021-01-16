import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "./api";
import moment from "moment";

const slice = createSlice({
  name: "BUGS",
  initialState: {
    // States are normally define with array
    // In this case the state is in object since the states contains other properties outside of the array
    list: [],
    loading: false,
    lastFetch: null,
  },
  reducers: {
    BUGS_REQUESTED: (bugs, action) => {
      bugs.loading = true;
    },

    BUG_RECEIVED: (bugs, action) => {
      bugs.list = action.payload;
      bugs.loading = false;
      bugs.lastFetch = Date.now();
    },

    BUGS_REQUEST_FAILED: (bugs, action) => {
      bugs.loading = false;
    },

    // actions => action handler
    BUG_ASSIGNED_TO_USER: (bugs, action) => {
      const { id: bugId, userId } = action.payload;
      const index = bugs.list.findIndex((bug) => bug.id === bugId);
      bugs.list[index].userId = userId;
    },

    BUG_ADDED: (bugs, action) => {
      bugs.list.push(action.payload);
    },

    BUG_RESOLVED: (bugs, action) => {
      const index = bugs.list.findIndex((bug) => bug.id === action.payload.id);
      bugs.list[index].resolved = true;
    },
  },
});

const {
  BUG_ADDED,
  BUG_RESOLVED,
  BUG_ASSIGNED_TO_USER,
  BUG_RECEIVED,
  BUGS_REQUESTED,
  BUGS_REQUEST_FAILED,
} = slice.actions;
export default slice.reducer;

// Action Creators
const url = "/bugs";

// () => fn(dispatch, getState)
export const loadBugs = () => (dispatch, getState) => {
  const { lastFetch } = getState().entities.bugs;

  const diffInMinutes = moment().diff(moment(lastFetch), "minutes");
  if (diffInMinutes < 10) return;

  dispatch(
    apiCallBegan({
      url,
      onStart: BUGS_REQUESTED.type,
      onSuccess: BUG_RECEIVED.type,
      onError: BUGS_REQUEST_FAILED.type,
    })
  );
};

export const addBug = (bug) =>
  apiCallBegan({
    url,
    method: "post",
    data: bug,
    onSuccess: BUG_ADDED.type,
  });

export const resolveBug = (id) =>
  apiCallBegan({
    url: url + "/" + id,
    method: "patch",
    data: { resolved: true },
    onSuccess: BUG_RESOLVED.type,
  });

export const assignBugToUser = (bugId, userId) =>
  apiCallBegan({
    url: url + "/" + bugId,
    method: "patch",
    data: { userId },
    onSuccess: BUG_ASSIGNED_TO_USER.type,
  });

// Selector

// Memorization to improve the performance with 'selector', no need to re-calculate
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
