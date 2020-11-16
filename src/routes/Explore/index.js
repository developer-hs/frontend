import ExploreContainer from "./ExploreContainer";
import { connect } from "react-redux";
import { getPosts, increasePage } from "../../redux/PostSlice";

function mapDispatchToProps(dispatch) {
  return {
    getPosts: (page) => dispatch(getPosts(page)),
    increasePage: () => dispatch(increasePage()),
  };
}

function mapStateToProps(state) {
  return state.postsReducer.explore;
}
export default connect(mapStateToProps, mapDispatchToProps)(ExploreContainer);
