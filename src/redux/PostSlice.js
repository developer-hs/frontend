import api from '../api';

const { createSlice } = require('@reduxjs/toolkit');

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    explore: {
      page: 1,
    },
    post: [],
    getPost: false,
  },
  reducers: {
    // setExplorePosts(state, action) {
    //   const { payload } = action;
    //   if (action.payload.page === 1) {
    //     state.explore.posts = payload.posts;
    //     state.explore.page = 1;
    //   } else {
    //     state.explore.posts = [...state.explore.posts, ...payload.posts];
    //   }
    // },
    increasePage(state, action) {
      state.explore.page += 1;
    },
    getPost(state, action) {
      state.post = action.payload.post;
      state.getPost = true;
    },
    detailPostClear(state, action) {
      console.log('detailPostClear');
      state.post = '';
      state.getPost = false;
    },
  },
});

export const {
  setExplorePosts,
  increasePage,
  getPost,
  detailPostClear,
} = postsSlice.actions;

// export const getPosts = (page) => async (dispatch, getState) => {
//   try {
//     const {
//       usersReducer: { token },
//     } = getState();
//     console.log(token);
//     const {
//       data: { results },
//     } = await api.posts(page, token);
//     dispatch(
//       setExplorePosts({
//         posts: results,
//         page,
//       })
//     );
//   } catch (e) {
//     console.warn(e);
//   }
// };

export const getPostDetail = (id) => async (dispatch, getState) => {
  try {
    const {
      usersReducer: { token },
    } = getState();
    const { data } = await api.getPostDetail(id, token);
    dispatch(
      getPost({
        post: data,
      }),
    );
  } catch (e) {
    console.warn(e);
  }
};
export default postsSlice.reducer;
