export const checkEmptyRequestBody = (data: object) =>
  Object.keys(data).length === 0;
