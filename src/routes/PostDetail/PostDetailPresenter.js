import moment from 'moment';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import api from '../../api';
import CkeditorContainer from '../Main/Ckeditor/CkeditorContainer';
import { editorConfiguration } from '../Post/PostContainer';
import PostReviewContainer from '../PostReview';

export default ({
  handleDelete,
  postId,
  isLoggedIn,
  post,
  dispatch,
  getPost,
}) => {
  const { author, token } = useSelector((state) => state.usersReducer);
  const [showModal, setShowModal] = useState(false);
  return getPost ? (
    <>
      {/* 제목 뒷 배경 */}
      <div className="mb-4 md:mb-0 w-full max-w-screen-xl items-center mx-auto relative h-56">
        {post.thumbnail ? (
          <img
            alt=""
            className="absolute left-0 top-0 w-full h-full z-0 object-cover opacity-75"
            src={`http://127.0.0.1:8000${post.thumbnail}`}
          />
        ) : (
          <img
            alt=""
            className="absolute left-0 top-0 w-full h-full z-0 object-cover opacity-75"
            src={`https://images.unsplash.com/photo-1458419948946-19fb2cc296af?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80`}
          />
        )}
        {/* end 제목 뒷 배경 */}
        <div className="p-4 absolute bottom-0 left-0 z-20">
          {author ? (
            <>
              <Link
                className="px-4 py-1 mr-4 bg-black rounded-b text-gray-200 inline-flex items-center justify-center mb-2"
                to={{
                  pathname: `/post/update/${post.id}/`,
                  state: {
                    id: post.id,
                    old_title: post.title,
                    old_content: post.content,
                  },
                }}
              >
                수정하기
              </Link>
              <button
                onClick={handleDelete}
                className="px-4 py-1 mr-4 rounded-b bg-red-500 text-gray-200 inline-flex items-center justify-center mb-2"
              >
                삭제하기
              </button>
            </>
          ) : (
            ''
          )}
          <h2 className="text-4xl font-semibold text-center text-gray-900 leading-tight hover:text-gray-200 transition duration-200 ease-in-out">
            {post.title}
          </h2>
          <div className="flex mt-3">
            <img
              alt=""
              src={`http://127.0.0.1:8000${post.user.avatar}`}
              className="h-10 w-10 rounded-full mr-2 object-cover"
            />
            <div>
              <p className="font-semibold text-gray-200 text-sm  hover:text-gray-700 transition duration-200 ease-in-out">
                {post.user.nickname}
              </p>
              <p className="font-semibold text-gray-400 text-xs">
                {moment(post.created).format('LL')}
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* 게시글 내용 */}
      <div className="px-4 lg:px-0 max-w-screen-xl mx-auto text-lg leading-relaxed min-h-200">
        <div className="max-w-5xl mx-auto">
          <p
            className="pb-6 z-10 bg-white pl-12 pt-3 border-gray-200 shadow-md min-h-200"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </div>
      {/* 댓글 라인 */}
      <div className="">
        <div className="flex justify-center">
          <button
            className="mt-5 w-2/12 bg-white text-gray-400 border border-green-200 hover:border-green-500 hover:text-black font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
            type="button"
            style={{ transition: 'all .15s ease' }}
            onClick={
              isLoggedIn
                ? () => setShowModal(true)
                : () => alert('로그인 후 작성하실 수 있습니다')
            }
          >
            댓글 작성
          </button>
        </div>
        {showModal ? (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative my-6 mx-auto w-8/12">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                    <h3 className="text-3xl font-semibold">Comment</h3>
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
                      response={api.createReview}
                      token={token}
                      isLoggedIn={isLoggedIn}
                      comment_mode={true}
                      id={postId}
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
      </div>
      )
      <div className="w-1/2 mx-auto" />
      <div className="flex flex-col justify-center items-center h-auto">
        <div className="w-3/4 ">
          {Object.keys(post.reviews).length === 0 ? (
            <PostReviewContainer
              postId={post.id}
              isLoggedIn={isLoggedIn}
              token={token}
            />
          ) : Object.keys(post.reviews).length > 1 ? (
            post.reviews.map((review) => (
              <PostReviewContainer
                key={review.id}
                token={token}
                isLoggedIn={isLoggedIn}
                review={review}
                postId={post.id}
              />
            ))
          ) : (
            <>
              <PostReviewContainer
                token={token}
                isLoggedIn={isLoggedIn}
                review={post.reviews[0]}
                postId={post.id}
              />
            </>
          )}
        </div>
      </div>
    </>
  ) : (
    ''
  );
};
