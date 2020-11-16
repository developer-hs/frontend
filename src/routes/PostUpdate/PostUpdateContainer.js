import React from 'react';
import CkeditorContainer from '../Main/Ckeditor/CkeditorContainer';
import { editorConfiguration } from '../Post/PostContainer';
import api from '../../api';
import { useSelector } from 'react-redux';

export default ({
  location: {
    state: { id, old_title, old_content },
  },
}) => {
  const { token, isLoggedIn } = useSelector((state) => state.usersReducer);
  return (
    <CkeditorContainer
      editorConfiguration={editorConfiguration}
      token={token}
      isLoggedIn={isLoggedIn}
      response={api.updatePost}
      old_content={old_content}
      old_title={old_title}
      id={id}
    />
  );
};
