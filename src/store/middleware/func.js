// This is the manually created to illustrate the middleware,
// Redux-toolkit comes with middleware, juste have to pull it from @redux-toolkit
// And then configure that in configureStore.js

const func = ({ dispatch, getState }) => (next) => (action) => {
  if (typeof action === "function") action(dispatch, getState);
  else next(action);
};

export default func;
