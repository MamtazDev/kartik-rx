// function to create edit obj in each list item of the input data
export const addEditObj = (data) => {
  return data.map((item) => {
    return {
      ...item,
      editObj: {...item},
    };
  });
};
