export const getTodoKey = (id: string, userId: string) => {
  return `todo:${userId}:${id}`;
};
