import configureStore from "./store/configureStore";

const store = configureStore();

store.dispatch((dispatch, getState) => {
  // Cann an API
  // When the promise is resolved => dispatch()
  dispatch({ type: "bugReceived", bugs: [1, 2, 3] });
  console.log(getState());
  // If the promise is rejected => dispatch()
});

// import {
//   bugAdded,
//   bugResolved,
//   getUnresolvedBugs,
//   bugAssignedToUser,
//   getBugsByUser,
// } from "./store/bugs";
// import { projectAdded } from "./store/projects";
// import { userAdded } from "./store/users";

// Logging amount of actions
// store.subscribe(() => {
//   console.log("Actions!");
// });

// store.dispatch(userAdded({ user: "User 1" }));
// store.dispatch(userAdded({ user: "User 2" }));

// store.dispatch(bugAdded({ description: "Bug 1" }));
// store.dispatch(bugAdded({ description: "Bug 2" }));
// store.dispatch(bugAdded({ description: "Bug 3" }));

// store.dispatch(bugAssignedToUser({ bugId: 1, userId: 1 }));
// store.dispatch(bugResolved({ id: 1 }));

// const bugs = getBugsByUser(1)(store.getState());
// console.log(bugs);
