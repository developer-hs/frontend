import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import api from '../../api';
import { getPostDetail } from '../../redux/PostSlice';
import { validateAuthor } from '../../redux/userSlice';
import PostDetailPresenter from './PostDetailPresenter';

export default ({
  location: {
    state: { postId },
  },
  history,
}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchData() {
      await dispatch(getPostDetail(postId));
      await dispatch(validateAuthor(postId));
    }
    fetchData();
  }, [postId]);
  const { token, isLoggedIn } = useSelector((state) => state.usersReducer);
  const { post, getPost } = useSelector((state) => state.postsReducer);
  const handleDelete = async () => {
    try {
      await api.deletePost(postId, token);
      return history.push('/');
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <PostDetailPresenter
      isLoggedIn={isLoggedIn}
      handleDelete={handleDelete}
      postId={postId}
      post={post}
      dispatch={dispatch}
      getPost={getPost}
    />
  );
};
