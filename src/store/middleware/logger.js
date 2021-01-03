const logger = (param) => (store) => (next) => (action) => {
  console.log("Logging", param);
  next(action);
};

export default logger;

// Currying the functions
// func1 => func2 => func3
