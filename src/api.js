import axios from 'axios';
import { useLayoutEffect, useState } from 'react';

const callApi = async (method, path, data, jwt) => {
  const headers = {
    Authorization: `Bearer ${jwt}`,
    'Content-Type': 'application/json',
  };
  const baseUrl = 'http://127.0.0.1:8000/api/v1';
  const fullUrl = `${baseUrl}${path}`;
  if (method === 'get' || method === 'delete') {
    return axios[method](fullUrl, { headers });
  } else {
    return axios[method](fullUrl, data, { headers });
  }
};

const warningChangeUrl = (url, message = '로그인 후 이용해주세요.') => {
  if (!alert(message)) {
    document.location = url;
  }
};

const changeUrl = (url) => {
  document.location = url;
};

function isFileImage(file) {
  return file && file['type'].split('/')[0] === 'image';
}

const useWindowSize = () => {
  let [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    const updateSize = () => {
      setSize([window.innerWidth, window.innerHeight]);
    };
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
};
export default {
  // Auth
  createAcount: (form) => callApi('post', '/users/', form),
  login: (form) => callApi('post', '/users/login/', form),
  getUserInformation: (token) =>
    callApi('post', '/users/information/', null, token),
  // Post
  posts: (page = 1, token) =>
    callApi('get', `/posts/?page=${page}`, null, token),
  getPostDetail: (id, token) => callApi('get', `/posts/${id}`, null, token),
  createPost: (id = undefined, form, token) =>
    callApi('post', '/posts/post/', form, token),
  updatePost: (id, form, token) => callApi('put', `/posts/${id}/`, form, token),
  deletePost: (id, token) => callApi('delete', `/posts/${id}/`, null, token),
  imageUpload: (form, token) =>
    callApi('post', '/posts/upload/image/', form, token),
  // Review
  createReview: (id, form, token) =>
    callApi('post', `/posts/review/${id}/`, form, token),
  updateReview: (id, form, token) =>
    callApi('put', `/posts/review/${id}/`, form, token),
  deleteReview: (id, token) =>
    callApi('delete', `/posts/review/${id}/`, null, token),
  // utill
  validateAuthor: (id, token) =>
    callApi('get', `/posts/validate/${id}/`, null, token),
  warningChangeUrl,
  changeUrl,
  isFileImage,
  useWindowSize,
};
