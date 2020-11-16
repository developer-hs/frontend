import React, { useEffect, useRef, useState } from 'react';
import { select } from 'd3';

export default () => {
  const svgRef = useRef();
  const [isOn, setIsOn] = useState(false);
  const [data, setData] = useState([5, 20, 25, 30, 40]);
  const increaseData = () => {
    setData(data.map((value) => value + 5));
  };
  const decreaseData = () => {
    setData(data.map((value) => value - 5));
  };
  useEffect(() => {
    const svg = select(svgRef.current);
    svg
      .selectAll('circle')
      .data(data)
      .join(
        (enter) => enter.append('circle'),
        (update) => update.attr('class', 'updated'),
        (exit) => exit.remove(),
      )
      .attr('r', (value) => value)
      .attr('cx', (value) => value * 2)
      .attr('cy', (value) => value * 2)
      .attr('stroke', 'blue');
  }, [data]);
  return (
    <div className="flex justify-center">
      <span
        role="checkbox"
        aria-checked={isOn}
        tabIndex="0"
        onMouseEnter={() => setIsOn(!isOn)}
        onMouseLeave={() => setIsOn(!isOn)}
        className={`${
          isOn ? 'bg-indigo-600' : 'bg-gray-200'
        } relative inline-block flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:shadow-outline`}
      >
        <span
          aria-hidden="true"
          className={`${
            isOn ? 'translate-x-5' : 'translate-x-0'
          } inline-block h-5 w-5 rounded-full bg-white shadow transform transition ease-in-out duration-200`}
        ></span>
      </span>
      <svg ref={svgRef}>
        <circle />
      </svg>
      <button onClick={increaseData}>+5</button>
      <button onClick={decreaseData}>-5</button>
    </div>
  );
};
