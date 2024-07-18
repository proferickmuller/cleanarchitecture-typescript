interface EntityCreationError extends Error {
  name: "EntityCreationError";
}

function EntityCreationError(msg: string) {
  const error = new Error(msg) as EntityCreationError;
  return error;
}

export { EntityCreationError };
