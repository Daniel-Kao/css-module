import axios from 'axios';

const changeList = list => ({
  type: 'changeList',
  list,
});

export const getNewsList = () => (dispatch, getState, axiosInstance) => {
  return axiosInstance.get('https://jsonplaceholder.typicode.com/todos').then(res => {
    console.log(res);
    // dispatch(changeList(res.data));
  });
};
