import React from "react";

const Leaderboard = () => {
  const users = [
    { name: 'Sebastian', score: 1124, change: 'up', img: 'https://example.com/image1.jpg' },
    { name: 'Jason', score: 875, change: 'down', img: 'https://example.com/image2.jpg' },
    { name: 'Natalie', score: 774, change: 'up', img: 'https://example.com/image3.jpg' },
    { name: 'Serenity', score: 723, change: 'up', img: 'https://example.com/image4.jpg' },
    { name: 'Hannah', score: 559, change: 'down', img: 'https://example.com/image5.jpg' },
  ];

  return (
    <div className="w-full max-w-2xl mt-10 bg-[#252A40] rounded-lg p-5">
      {users.map((user, index) => (
        <div key={index} className="flex items-center justify-between p-4 bg-[#151729] rounded-lg mb-2">
          <div className="flex items-center">
            <img
              className="rounded-full h-12 w-12 mr-4"
              src={user.img}
              alt={user.name}
            />
            <div>
              <div className="text-white text-lg">{user.name}</div>
              <div className="text-gray-400">@username</div>
            </div>
          </div>
          <div className="flex items-center">
            <div className="text-white text-lg mr-4">{user.score}</div>
            <div className={`text-${user.change === 'up' ? 'green' : 'red'}-500`}>
              {user.change === 'up' ? '▲' : '▼'}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Leaderboard;
