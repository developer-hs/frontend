import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getInformation } from '../../../redux/userSlice';
export default () => {
  const user = useSelector((state) => state.usersReducer);
  console.log(user);
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchData() {
      await dispatch(getInformation(user.token));
    }
    fetchData();
  }, [user.token]);

  return (
    <div className="inset-y-0 flex justify-center">
      <div
        className="h-24 w-24 rounded-full bg-cover bg-center"
        style={{ backgroundImage: `url("${user.avatar}")` }}
      />
      {user.nickname}
    </div>
  );
};
