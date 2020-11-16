import React, { useState } from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import api from '../../../api';
import { useDispatch, useSelector } from 'react-redux';
import { getPostDetail } from '../../../redux/PostSlice';

export default ({
  editorConfiguration,
  token,
  isLoggedIn,
  response,
  old_title = '',
  old_content = '',
  id = '',
  postId = '',
  comment_mode = false,
}) => {
  const dispatch = useDispatch();
  const { point, free_point } = useSelector((state) => state.usersReducer);
  const [title, setTitle] = useState(old_title);
  const [desiredPoint, setDesiredPoint] = useState(0);
  const [desiredFreePoint, setDesiredFreePoint] = useState(0);
  const [content, setContent] = useState(old_content);
  const [thumbnail, setThumbnail] = useState('');
  const [pointType, setPointType] = useState(true);
  const [calPoint, setCalPoint] = useState(point);
  const [calFreePoint, setCalFreePoint] = useState(free_point);

  const handleSubmit = async () => {
    if (pointType) {
      if (!parseInt(desiredPoint)) {
        return alert('올바른 금액이 아닙니다.');
      }
      if (parseInt(desiredPoint) > point) {
        return alert('보유 포인트가 부족합니다');
      }
    } else {
      if (!parseInt(desiredFreePoint)) {
        return alert('올바른 금액이 아닙니다.');
      }
      if (parseInt(desiredFreePoint) > free_point) {
        return alert('보유 포인트가 부족합니다');
      }
    }
    try {
      const { data } = await response(
        id,
        {
          content: content,
          title: title,
          point: desiredPoint,
          free_point: desiredFreePoint,
          point_type: pointType,
        },
        token,
      );
      const formData = await new FormData();
      if (thumbnail) {
        formData.append('img', thumbnail);
        formData.append('pk', data.id);
        await api.imageUpload(formData, token);
      }
    } catch (e) {
      console.warn(e);
    }
    api.changeUrl('http://localhost:3000/');
  };

  const handleReviewSubmit = async () => {
    if (!isLoggedIn) {
      return alert('로그인 후 댓글을 입력할 수 있습니다.');
    }
    try {
      const { status } = await response(id, { review: content }, token);
      if (status === 200) {
        await dispatch(getPostDetail(postId ? postId : id));
        document.location.reload();
      }
    } catch (e) {
      console.warn(e);
    }
  };
  const onChange = async (e) => {
    const file = e.target.files[0];
    const checkImageFile = api.isFileImage(file);
    if (checkImageFile) {
      await setThumbnail(file);
      console.log(file);
    } else {
      alert('파일형식이 올바르지않습니다.');
    }
  };
  const onChangeTitle = (e) => {
    return setTitle(e.target.value);
  };

  const onChageInitPoint = (e) => {
    return (e.target.value = '');
  };
  const onChangePointType = () => {
    setDesiredPoint(0);
    setDesiredFreePoint(0);
    setCalPoint(point);
    setCalFreePoint(free_point);
    return setPointType(!pointType);
  };

  const onChageDesiredPoint = (e) => {
    if (parseInt(e.target.value) >= 0) {
      if (pointType) {
        setCalPoint(point - e.target.value);
        return setDesiredPoint(e.target.value);
      } else {
        setCalFreePoint(free_point - e.target.value);
        return setDesiredFreePoint(e.target.value);
      }
    }
  };
  return isLoggedIn ? (
    <div>
      {comment_mode ? (
        <></>
      ) : (
        <>
          <div className="flex relative items-center justify-center bg-grey-lighter">
            <label className="flex flex-col w-3/5 items-center px-4 py-6 bg-white text-blue rounded-t tracking-wide uppercase border cursor-pointer hover:bg-blue-500 hover:text-white">
              <svg
                className="w-8 h-8"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
              </svg>
              <span className="mt-2 text-base leading-normal">
                Select a Thumbnail
              </span>
              <input type="file" className="hidden" onChange={onChange} />
            </label>
          </div>
          <div className="absolute right-44">
            <div>
              <input
                className="form-radio h-5 w-5 text-blue-600"
                type="radio"
                id="contactChoice1"
                name="contact"
                value="premium"
                checked={pointType}
                onChange={onChangePointType}
              />
              <label
                className="inline-flex items-center pl-3"
                htmlFor="contactChoice1"
              >
                Premium Point
              </label>
            </div>
            <div className="pt-3">
              <input
                className="form-radio h-5 w-5 text-green-600"
                type="radio"
                id="contactChoice2"
                name="contact"
                value="free"
                checked={!pointType}
                onChange={onChangePointType}
              />
              <label
                className="inline-flex items-center pl-3"
                htmlFor="contactChoice2"
              >
                Free Point
              </label>
            </div>
          </div>
          <div className="mx-auto my-0 flex justify-center">
            <input
              className="w-3/5 h-24 text-3xl text-center border-2 rounded-b mx-auto"
              type="text"
              value={title}
              onChange={onChangeTitle}
              placeholder="제목을 입력하세요"
            ></input>
          </div>
          <div className="border absolute h-40 w-64 rounded-b shadow-md right-12">
            <div className="border-b border-gray-100  flex w-full h-12 justify-between">
              <h1 className="flex justify-center items-center w-full text-xl font-semibold">
                {pointType ? 'Premium Point' : 'Free Point'}
              </h1>
            </div>
            <div className="border-b border-gray-100 shadow-md flex w-full h-12 justify-between">
              <h1
                className={
                  calPoint < 0
                    ? 'text-red-400 flex justify-center items-center w-full text-xl'
                    : calFreePoint < 0
                    ? 'text-red-400 flex justify-center items-center w-full text-xl'
                    : 'flex justify-center items-center w-full text-xl'
                }
              >
                {pointType ? `${calPoint}` : `${calFreePoint}`}
              </h1>
            </div>
            <div className="border-b border-gray-100 shadow-md flex w-full h-14 justify-between">
              <input
                className="w-full flex justify-center items-center text-center"
                type="text"
                pattern="[0-9]+"
                value={pointType ? desiredPoint : desiredFreePoint}
                onChange={onChageDesiredPoint}
                onClick={onChageInitPoint}
                placeholder="금액을 입력하세요"
              ></input>
            </div>
          </div>
        </>
      )}
      <div
        className={`${
          comment_mode
            ? 'inset-x-0 flex justify-center flex-col items-center max-w-5xl mx-auto'
            : 'flex flex-col inset-x-0 items-center max-w-6xl mx-auto'
        }`}
      >
        <CKEditor
          editor={ClassicEditor}
          config={editorConfiguration}
          data={old_content}
          onInit={(editor) => {
            // You can store the "editor" and use when it is needed.
            console.log('Editor is ready to use!', editor);
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            setContent(data);
            console.log(data);
          }}
          onBlur={(event, editor) => {
            console.log('Blur.', editor);
          }}
          onFocus={(event, editor) => {
            console.log('Focus.', editor);
          }}
        />
        <div className="flex pt-5 justify-center items-center">
          <button
            className="w-52 border border-red-500 bg-red-500 text-white rounded-b py-2 transition duration-500 ease select-none hover:bg-red-600 focus:outline-none focus:shadow-outline"
            onClick={comment_mode ? handleReviewSubmit : handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  ) : (
    ''
  );
};
