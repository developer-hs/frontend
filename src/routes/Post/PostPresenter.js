import React from 'react';
import CkeditorContainer from '../Main/Ckeditor/CkeditorContainer';
import api from '../../api';

export default ({ editorConfiguration, token, isLoggedIn }) => {
  return (
    <CkeditorContainer
      editorConfiguration={editorConfiguration}
      token={token}
      isLoggedIn={isLoggedIn}
      response={api.createPost}
    />
  );
};
