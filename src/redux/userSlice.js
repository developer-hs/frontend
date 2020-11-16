import { createSlice } from '@reduxjs/toolkit/';
import api from '../api';

const userSlice = createSlice({
  name: 'users',
  initialState: {
    isLoggedIn: false,
    token: null,
  },
  reducers: {
    logIn(state, action) {
      state.isLoggedIn = true;
      state.token = action.payload.token;
      state.id = action.payload.id;
      state.point = action.payload.point;
      state.free_point = action.payload.free_point;
    },
    logOut(state, action) {
      state.isLoggedIn = false;
      state.token = null;
      state.id = null;
      state.point = null;
      state.free_point = null;
    },
    validatedAuthor(state, action) {
      if (action.payload.author === true) {
        state.author = true;
      } else {
        state.author = false;
      }
    },
    userInformation(state, action) {
      state.point = action.payload.point;
      state.free_point = action.payload.free_point;
      state.nickname = action.payload.nickname;
      state.login_method = action.payload.login_method;
      state.avatar = action.payload.avatar;
      state.super_brain = action.payload.super_brain;
      state.introduction = action.payload.introduction;
      state.sex = action.payload.sex;
      state.birth_day = action.payload.birth_day;
      state.like_user_set = action.payload.like_user_set;
    },
  },
});

export const {
  logIn,
  logOut,
  validatedAuthor,
  userInformation,
} = userSlice.actions;

export const userLogin = (form) => async (dispatch) => {
  try {
    const {
      data: { id, token, point, free_point },
    } = await api.login(form);
    if (id && token) {
      dispatch(logIn({ token, id, point, free_point }));
    }
  } catch (e) {
    console.log(e);
    alert('Wrong user/password');
  }
};

export const validateAuthor = (id) => async (dispatch, getState) => {
  console.log(id);
  try {
    const {
      usersReducer: { token },
    } = getState();
    const {
      data: { validate_autor },
    } = await api.validateAuthor(id, token);
    dispatch(
      validatedAuthor({
        author: validate_autor,
      }),
    );
  } catch (e) {
    console.warn(e);
  }
};

export const getInformation = (token) => async (dispatch) => {
  try {
    const {
      data: {
        point,
        free_point,
        nickname,
        login_method,
        avatar,
        super_brain,
        introduction,
        sex,
        birth_day,
        like_user_set,
      },
    } = await api.getUserInformation(token);
    dispatch(
      userInformation({
        point: point,
        free_point: free_point,
        nickname: nickname,
        login_method: login_method,
        avatar: avatar,
        super_brain: super_brain,
        introduction: introduction,
        sex: sex,
        birth_day: birth_day,
        like_user_set: like_user_set,
      }),
    );
  } catch (e) {
    console.warn(e);
  }
};

export default userSlice.reducer;
