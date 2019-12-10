import {ADD_USER} from './types';
export const addUser = item => dispatch => {
  dispatch({
    type: ADD_USER,
    payload: item,
  });
};
