import { combineReducers } from 'redux';
import usersReducer from './userSlice';
import postsReducer from './PostSlice';
export default combineReducers({
  usersReducer,
  postsReducer,
});
