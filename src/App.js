import React from 'react';
import { Provider } from 'react-redux';
import { Route, BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import Navigation from './navigation/Navigation';
import Sidebar from './navigation/Sidebar';
import store, { persistor } from './redux/store';
import MeContainer from './routes/Auth/Me';
import ProfileContainer from './routes/Auth/Profile/ProfilePresenter';
import SignInContainer from './routes/Auth/SignIn/SignInContainer';
import SingUpContainer from './routes/Auth/SignUp/SingUpContainer';
import ExploreContainer from './routes/Explore/ExploreContainer';
import PostContainer from './routes/Post';
import PostDetailContainer from './routes/PostDetail/PostDetailContainer';
import PostUpdateContainer from './routes/PostUpdate/PostUpdateContainer';
import Test from './routes/Test';
import './styles/css/styles.css';

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <div className="pb-24">
            <Navigation />
          </div>
          <Sidebar />
          <Route path="/" exact={true} component={ExploreContainer} />
          <Route path="/test/" exact={true} component={Test} />
          <Route path="/post/write/" exact={true} component={PostContainer} />
          <Route
            path="/post/detail/:id/"
            exact={true}
            component={PostDetailContainer}
          />
          <Route
            path="/post/update/:id/"
            exact={true}
            component={PostUpdateContainer}
          />
          <Route path="/user/login/" exact={true} component={SignInContainer} />
          <Route
            path="/user/signup/"
            exact={true}
            component={SingUpContainer}
          />
          <Route path="/me/:id/" exact={true} component={MeContainer} />
          <Route
            path="/user/profile/"
            exact={true}
            component={ProfileContainer}
          />
        </PersistGate>
      </Provider>
    </BrowserRouter>
  );
}
export default App;
