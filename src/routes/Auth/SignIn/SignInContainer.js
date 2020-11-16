import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from '../../../redux/userSlice';

export default (props) => {
  const { isLoggedIn } = useSelector((state) => state.usersReducer);
  const dispatch = useDispatch();
  const [email, setEmail] = useState(props?.email || '');
  const [password, setPassword] = useState(props?.password || '');
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmit = async () => {
    await dispatch(
      userLogin({
        username: email,
        password,
      }),
    );
    document.location = 'http://localhost:3000/';
  };

  return isLoggedIn ? (
    ''
  ) : (
    <div className="bg-grey-lighter min-h-200 flex flex-col">
      <div className="container max-w-xl mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
          <h1 className="mb-8 text-3xl text-center">LogIn</h1>
          <input
            className="block border border-grey-light w-full p-3 rounded mb-4"
            type="email"
            value={email}
            onChange={onChangeEmail}
            placeholder="Email"
          />
          <input
            className="block border border-grey-light w-full p-3 rounded mb-4"
            type="password"
            value={password}
            onChange={onChangePassword}
            placeholder="Password"
          />
          <button
            className="w-full text-center py-3 rounded bg-green-400 text-white hover:bg-green-dark focus:outline-none my-1"
            onClick={handleSubmit}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};
