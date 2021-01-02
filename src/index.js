import configureStore from "./store/configureStore";
import {
  bugAdded,
  bugResolved,
  getUnresolvedBugs,
  bugAssignedToUser,
  getBugsByUser,
} from "./store/bugs";
import { projectAdded } from "./store/projects";
import { userAdded } from "./store/users";

const store = configureStore();

// Logging amount of actions
store.subscribe(() => {
  console.log("Actions!");
});

store.dispatch(projectAdded({ name: "Create a super redux app" }));

store.dispatch(userAdded({ user: "User 1" }));
store.dispatch(userAdded({ user: "User 2" }));

store.dispatch(bugAdded({ description: "Bug 1" }));
store.dispatch(bugAdded({ description: "Bug 2" }));
store.dispatch(bugAdded({ description: "Bug 3" }));

store.dispatch(bugAssignedToUser({ bugId: 1, userId: 1 }));
store.dispatch(bugResolved({ id: 1 }));

const bugs = getBugsByUser(1)(store.getState());
console.log(bugs);
