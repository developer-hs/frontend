import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import api from '../../../api';
import SignInContainer from '../SignIn';

export default () => {
  const { isLoggedIn } = useSelector((state) => state.usersReducer);
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [sex, setSex] = useState('');
  const [birthday, setBirthday] = useState('');
  const [signupCheck, setSignupCheck] = useState(false);
  const onChangeNickname = (e) => {
    setNickname(e.target.value);
  };
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const onChangeSex = (e) => {
    setSex(e.target.value);
  };
  const onChangesetBirthday = (e) => {
    setBirthday(e.target.value);
  };
  const handleSubmit = async () => {
    try {
      const { status } = await api.createAcount({
        nickname,
        username: email,
        password,
        sex,
        birthday,
      });
      if (status === 201) {
        alert('Account created. Sign in, Please');
      } else if (status === 200) {
        setSignupCheck(true);
      }
    } catch (e) {
      alert('The email is taken');
      console.warn(e);
    }
  };

  return signupCheck ? (
    <SignInContainer email={email} password={password} />
  ) : isLoggedIn ? (
    <div>Status : login</div>
  ) : (
    <div className="bg-grey-lighter min-h-200 flex flex-col">
      <div className="container max-w-xl mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
          <h1 className="mb-8 text-3xl text-center">Sign up</h1>
          <input
            className="block border border-grey-light w-full p-3 rounded mb-4"
            type="text"
            value={nickname}
            placeholder="Nickname"
            onChange={onChangeNickname}
          ></input>
          <input
            className="block border border-grey-light w-full p-3 rounded mb-4"
            type="email"
            value={email}
            placeholder="Email"
            onChange={onChangeEmail}
          ></input>
          <input
            className="block border border-grey-light w-full p-3 rounded mb-4"
            type="password"
            value={password}
            placeholder="Password"
            onChange={onChangePassword}
          ></input>
          <select
            className="block border border-grey-light w-full p-3 rounded mb-4"
            onChange={onChangeSex}
          >
            <option value="">성별</option>
            <option value="male">남자</option>
            <option value="female">여자</option>
          </select>
          <input
            className="block border border-grey-light w-full p-3 rounded mb-4"
            type="date"
            value={birthday}
            placeholder="생년월일"
            onChange={onChangesetBirthday}
          ></input>
          <button
            className="w-full text-center py-3 rounded bg-green-400 text-white hover:bg-green-dark focus:outline-none my-1"
            onClick={handleSubmit}
          >
            SignUp
          </button>
        </div>
      </div>
    </div>
  );
};
