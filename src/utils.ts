export const merge = <T, E>(obj_1: T, obj_2: E) => {
  return {
    ...obj_1,
    ...obj_2,
  };
};
