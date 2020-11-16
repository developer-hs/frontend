import React, { useState } from 'react';
import api from '../api';

export default () => {
  const [isOn, setIsOn] = useState(true);
  let [width, height] = api.useWindowSize();
  return width > 1845 ? (
    isOn ? (
      <div className="absolute w-46 h-screen bg-fixed fade-in-box z-10">
        <div className="">
          <div className="flex">
            <div className="flex justify-end w-full">
              <button
                className="border-gray-200 bg-gray-100 rounded-md hover:bg-gray-300 transition duration-150 ease-in-out"
                onClick={() => setIsOn(!isOn)}
              >
                <i className="xi-arrow-left xi-2x" />
              </button>
            </div>
          </div>
        </div>
      </div>
    ) : (
      <div className="absolute w-8 h-screen bg-fixed fade-out-box">
        <div className="flex justify-end w-full ">
          <button
            className="border-gray-200 bg-gray-100 rounded-md hover:bg-gray-300 transition duration-150 ease-in-out"
            onClick={() => setIsOn(!isOn)}
          >
            <i className="xi-arrow-right xi-2x" />
          </button>
        </div>
      </div>
    )
  ) : (
    <></>
  );
};
