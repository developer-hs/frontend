import moment from 'moment';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { detailPostClear } from '../../redux/PostSlice';
import { getInformation } from '../../redux/userSlice';

export default ({ post }) => {
  const { token } = useSelector((state) => state.usersReducer);
  console.log(token);
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchData() {
      await dispatch(detailPostClear());
      await dispatch(getInformation(token));
    }
    fetchData();
  }, [post]);
  return (
    <Link
      className="transition-all duration-150 flex w-full px-4 py-6 md:w-4/12 2xl:w-1/3 max-h-225"
      to={{
        pathname: `/post/detail/${post.id}/`,
        state: { postId: post.id },
      }}
    >
      {/* <!-- Card Component --> */}
      {/* image line */}
      <div className="flex flex-col items-stretch min-h-full pb-4 mb-6 transition-all duration-150 bg-white rounded-lg shadow-lg hover:shadow-2xl">
        <div className="md:flex-shrink-0">
          {post.thumbnail != null ? (
            <div
              className="h-48 rounded-lg bg-cover bg-center 2xl:w-172 xl:w-154"
              style={{ backgroundImage: `url("${post.thumbnail}")` }}
            ></div>
          ) : Object.keys(post.photos).length >= 1 ? (
            <div
              className="h-48 rounded-lg bg-cover bg-center 2xl:w-172 xl:w-154"
              style={{ backgroundImage: `url("${post.photos[0]['image']}")` }}
            ></div>
          ) : (
            <div
              className="bg-no-repeat left-0 top-0 h-48 z-0 bg-cover bg-top rounded-lg 2xl:w-172 xl:w-154"
              style={{
                backgroundImage: `url("https://images.unsplash.com/photo-1458419948946-19fb2cc296af?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80")`,
              }}
            ></div>
          )}
        </div>
        {/* end image line */}
        <div className="flex items-center justify-between px-4 py-2 overflow-hidden">
          <span className="text-xs font-medium text-blue-600 uppercase">
            Question Infomation
          </span>
          <div className="flex flex-row items-center">
            <div className="text-xs font-medium text-gray-700 flex flex-row items-center mr-2">
              <i
                className={
                  post.point > 0
                    ? 'xi-dollar text-red-400'
                    : post.free_point > 0
                    ? 'xi-lightbulb-o text-red-400'
                    : ''
                }
              ></i>
              <span>{post.point ? post.point : post.free_point}</span>
            </div>
            <div className="text-xs font-medium text-gray-500 flex flex-row items-center mr-2">
              <i className="xi-forum text-red-400"></i>
              <span>{post.reviews.length}</span>
            </div>

            <div className="text-xs font-medium text-gray-500 flex flex-row items-center">
              <span>7</span>
            </div>
          </div>
        </div>
        <hr className="border-gray-300" />
        <div className="flex flex-wrap items-center flex-1 px-4 py-1 text-center mx-auto hover:underline">
          {/* 제목 */}
          <h2
            className="text-2xl font-bold tracking-normal text-gray-800 overflow-hidden"
            dangerouslySetInnerHTML={{ __html: post.title }}
          ></h2>
        </div>
        <hr className="border-gray-300" />
        <p
          className="flex flex-row flex-wrap w-full px-4 py-2 overflow-hidden text-sm text-justify text-gray-700"
          dangerouslySetInnerHTML={{
            __html: post.content.substring(0, 250),
          }}
        />
        <hr className="border-gray-300" />
        <section className="px-4 py-2 mt-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center flex-1">
              <img
                className="object-cover h-10 w-10 rounded-full"
                src={`${post.user.avatar}`}
                alt="Avatar"
              />
              <div className="flex flex-col mx-2 font-semibold text-gray-700 hover:underline">
                {post.user.username}
                <span className="mx-1 text-xs text-gray-600">
                  {moment(post.created).format('LL')}
                </span>
              </div>
            </div>
            <p className="mt-1 text-xs text-gray-600">
              {moment(post.created).fromNow()}
            </p>
          </div>
        </section>
      </div>
    </Link>
  );
};
