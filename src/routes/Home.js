import React from 'react';
import ExplorePresenter from './Explore/ExplorePresenter';
export default ({ posts, increasePage }) => {
  return (
    <div>
      <div className="flex justify-center items-center">
        {/* 배너 */}
        <div className="border-2 rounded-lg opacity-50 shadow-xl w-4/5 h-100 bg-question_banner_image bg-center bg-auto "></div>
      </div>
      <div className="flex flex-wrap justify-center items-center">
        <div className="border-2 rounded-lg w-4/5 h-full">
          <div
            className="flex items-center justify-center"
            style={{ backgroundColor: '#edf2f7' }}
          >
            <div className="flex flex-row flex-wrap mx-auto">
              {posts.map((post) => (
                <ExplorePresenter key={post.id} post={post} />
              ))}
            </div>
          </div>
          <div className="flex justify-center py-6">
            <button className="text-center" onClick={increasePage}>
              More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
