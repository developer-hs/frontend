import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import api from '../../api';
import ExplorePresenter from './ExplorePresenter';

export default () => {
  const [post, setPosts] = useState();
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useSelector((state) => state.usersReducer);
  useEffect(() => {
    async function fetchData() {
      const {
        data: { results },
      } = await api.posts(page, token);
      await setPosts(post ? [...post, ...results] : results);
      setIsLoading(true);
    }
    fetchData();
  }, [page]);

  const increasePage = () => {
    setPage(page + 1);
  };
  return isLoading ? (
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
              {post.map((post) => (
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
  ) : (
    <div className="fixed top-0 right-0 h-screen w-screen z-50 flex justify-center items-center">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900" />
    </div>
  );
};

// function mapDispatchToProps(dispatch) {
//   return {
//     // getPosts: (page) => dispatch(getPosts(page)),
//     increasePage: () => dispatch(increasePage()),
//   };
// }

// function mapStateToProps(state) {
//   return state.postsReducer.explore;
// }
// export default connect(mapStateToProps, mapDispatchToProps)(ExploreContainer);

// export default connect(
//   (state) => ({ page: state.postsReducer.explore.page }),
//   (dispatch) => ({ getPosts: (page) => dispatch(getPosts(page)) })
// )(ExploreContainer);
