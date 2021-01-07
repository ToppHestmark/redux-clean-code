// This is the manually created to illustrate the middleware,
// Redux-toolkit comes with middleware, just have to pull it from @redux-toolkit
// And then configure that in configureStore.js
// Do not call API in the middleware

const func = ({ dispatch, getState }) => (next) => (action) => {
  if (typeof action === "function") action(dispatch, getState);
  else next(action);
};

export default func;
