import axios from 'axios';
import { FETCH_USER } from './types';

// the dispatch param comes from thunk middleware
export const fetchUser = () => async (dispatch) => {
  const res = await axios.get('/api/current_user');
  // console.log('fetchUser', res.data);
  dispatch({ type: FETCH_USER, payload: res.data });
};
