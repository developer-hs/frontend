import React, { useState } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import api from '../../api';
import { getPostDetail } from '../../redux/PostSlice';
import { validateAuthor } from '../../redux/userSlice';
import CkeditorContainer from '../Main/Ckeditor/CkeditorContainer';
import { editorConfiguration } from '../Post/PostContainer';

export default ({ review, token, isLoggedIn, postId }) => {
  const { nickname } = useSelector((state) => state.usersReducer);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const handleSubmit = async () => {
    try {
      await api.deleteReview(review.id, token);
      dispatch(getPostDetail(postId));
      dispatch(validateAuthor(postId));
    } catch (e) {
      console.log(e);
    }
  };
  return review ? (
    <div className="border-gray-200 shadow-md w-2/3 mx-auto mt-8">
      <div className="flex justify-center">
        {/* 프로필사진 */}
        <div className="w-2/12 pt-3">
          <div className="w-full flex justify-center">
            <div
              className="w-14 h-14 bg-cover bg-center rounded-full"
              style={{
                backgroundImage: `url("http://127.0.0.1:8000${review.user.avatar}")`,
              }}
            />
          </div>
        </div>
        <div className="flex w-10/12">
          <div className="w-full pr-3 pt-1">
            {/* 닉네임 */}
            <div className="items-center h-16 border-b">
              <div>
                <span className="font-extrabold text-xl">
                  {review.user.nickname}
                </span>
              </div>
              <div>
                <span>{moment(review.created).format('LL')}</span>
              </div>
            </div>
            {/* 댓글 */}
            <div
              className="text-lg py-5"
              dangerouslySetInnerHTML={{ __html: review.review }}
            />
            {isLoggedIn ? (
              nickname === review.user.nickname ? (
                <div className="flex justify-end w-full pt-3">
                  <button
                    className="flex px-6 py-2 mr-3 rounded-b bg-white border border-gray-300 text-gray-500 justify-end mb-2 hover:text-red-500 hover:border-gray-500 outline-none focus:outline-none transition duration-200 ease-out"
                    onClick={
                      isLoggedIn
                        ? () => setShowModal(true)
                        : () => alert('로그인 후 작성하실 수 있습니다')
                    }
                  >
                    수정하기
                  </button>
                  {showModal ? (
                    <>
                      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative my-6 mx-auto w-8/12">
                          {/*content*/}
                          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            {/*header*/}
                            <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                              <h3 className="text-3xl font-semibold">
                                Comment
                              </h3>
                              <button
                                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                onClick={() => setShowModal(false)}
                              >
                                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                  ×
                                </span>
                              </button>
                            </div>
                            {/*body*/}
                            <div className="relative p-6 flex-auto">
                              <CkeditorContainer
                                editorConfiguration={editorConfiguration}
                                old_content={review.review}
                                token={token}
                                isLoggedIn={isLoggedIn}
                                comment_mode={true}
                                id={review.id}
                                postId={postId}
                                response={api.updateReview}
                              />
                            </div>
                            {/*footer*/}
                            <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
                              <button
                                className="text-orange-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                                type="button"
                                style={{ transition: 'all .15s ease' }}
                                onClick={() => setShowModal(false)}
                              >
                                Close
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                    </>
                  ) : null}
                  <button
                    className="flex px-6 py-2 rounded-b bg-red-400 text-gray-200 justify-end mb-2  hover:text-black hover:border-black outline-none focus:outline-none transition duration-200 ease-out"
                    onClick={handleSubmit}
                  >
                    삭제
                  </button>
                </div>
              ) : (
                ''
              )
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
    </div>
  ) : (
    ''
  );
};
