import React from "react";

const Topper = ({ h, position, name, score, rank }) => {
  const positionStyles = {
    1: 'z-20',
    2: 'z-10',
    3: 'z-10'
  };

  return (
    <div className={`flex flex-col items-center bg-[#252A40] h-${h} w-32 relative m-3 rounded-lg ${positionStyles[position]}`}>
      <img
        className="rounded-full h-24 w-24 mb-2 -mt-12 border-4 border-[#FFAA00]"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmrwX26YF3S-WKqe9EP8Ojzy-R8-s4FxjgPg&s"
        alt="placeholder"
      />
      <div className="text-center text-white text-lg">{name}</div>
      <div className={`text-center text-${rank === 1 ? 'yellow' : rank === 2 ? 'blue' : 'green'}-500 text-xl font-bold`}>{score}</div>
      <div className="text-center text-gray-400">@username</div>
      {rank === 1 && (
        <div className="absolute -top-8">
          <img
            className="h-10 w-10"
            src="https://path/to/crown.png"
            alt="crown"
          />
        </div>
      )}
    </div>
  );
};

export default Topper;
