import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logOut } from '../redux/userSlice';
import '../styles/css/styles.css';

export default () => {
  const { isLoggedIn, point, free_point, avatar } = useSelector(
    (state) => state.usersReducer,
  );
  const dispatch = useDispatch();
  const handleLogOut = async () => {
    await dispatch(logOut());
    document.location = 'http://localhost:3000/';
  };
  return (
    <header className="header_navibox z-50 shadow fixed w-full">
      <nav className="">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 ">
          <div className="relative flex justify-between h-16">
            <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
              <div className="hidden sm:ml-6 sm:flex">
                <Link
                  className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-2xl font-medium leading-5 text-gray-500 hover:text-gray-700 focus:outline-none transition duration-150 ease-in-out"
                  to="/"
                >
                  Home
                </Link>
                <Link
                  className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-2xl font-medium leading-5 text-gray-500 hover:text-gray-700 focus:outline-none transition duration-150 ease-in-out "
                  to="/test/"
                >
                  Test
                </Link>
                <Link
                  className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-2xl font-medium leading-5 text-gray-500 hover:text-gray-700 focus:outline-none transition duration-150 ease-in-out "
                  to="#"
                >
                  Home
                </Link>
                <Link
                  className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-2xl font-medium leading-5 text-gray-500 hover:text-gray-700 focus:outline-none transition duration-150 ease-in-out "
                  to="#"
                >
                  Home
                </Link>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <div className="ml-3 relative flex items-center">
                {/* Auth Navi */}
                {isLoggedIn ? (
                  <>
                    <Link
                      className="flex text-gray-400 text-2xl border-2 border-transparent rounded-full focus:outline-none  focus:border-red-300 hover:underline focus:text-red-400 transition duration-150 ease-in-out px-1 py-1"
                      to="/post/write/"
                    >
                      글쓰기
                    </Link>
                    <Link
                      onClick={handleLogOut}
                      className="flex text-gray-400 text-2xl border-2 border-transparent rounded-full focus:outline-none  focus:border-red-300 hover:underline focus:text-red-400 transition duration-150 ease-in-out px-1 py-1"
                      to="/user/logout/"
                    >
                      Logout
                    </Link>
                    <Link
                      className="flex h-18 w-18 text-red-400 border-2 border-transparent rounded-full focus:outline-none  focus:border-red-400 hover:underline focus:text-red-400 transition duration-150 ease-in-out ml-2 "
                      to="/user/profile/"
                    >
                      <div
                        className="h-12 w-12 rounded-full bg-cover bg-center"
                        style={{ backgroundImage: `url("${avatar}")` }}
                      />
                    </Link>
                    <div className="grid grid-cols-2">
                      <i className="xi-dollar text-red-400 flex justify-center text-lg font-mono"></i>
                      <div className="text-sm font-mono text-gray-800">
                        {point}
                      </div>
                      <i className="xi-lightbulb-o text-red-400 flex justify-center text-lg font-mono"></i>
                      <div className="text-sm font-mono text-gray-800">
                        {free_point}
                      </div>
                    </div>
                    <div className="flex ml-4">
                      <div className="mr-5  hover:bg-gray-100 transition duration-150 ease-in-out shadow-md border border-gray-400 py-2 px-6 rounded-md">
                        <span className="flex items-center text-center">
                          충전하기
                        </span>
                      </div>
                      <div className="mr-5 text-cool-gray-500 hover:bg-gray-100 transition duration-150 ease-in-out shadow-md border border-gray-400 py-2 px-6 rounded-md">
                        <span className="flex items-center text-center">
                          환전하기
                        </span>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <Link
                      className="flex text-gray-400 text-2xl border-2 border-transparent rounded-full focus:outline-none  focus:border-red-300 hover:underline focus:text-red-400 transition duration-150 ease-in-out px-1 py-1"
                      to="/user/signup/"
                    >
                      SingUp
                    </Link>
                    <Link
                      className="flex text-gray-400 text-2xl border-2 border-transparent rounded-full focus:outline-none focus:border-red-300 hover:underline focus:text-red-400 transition duration-150 ease-in-out px-1 py-1"
                      to="/user/login/"
                    >
                      Login
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};
