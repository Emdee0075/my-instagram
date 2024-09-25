
import React from 'react';

function Story({ username }) {
  return (
    <div className="flex flex-col items-center">
      {/* Avatar div with pink background */}
      <div className="h-14 w-14 bg-blue-500 rounded-full flex items-center justify-center navBtn">
        {/* Replace the image with an initial */}
        <span className="text-white text-xl font-bold">
          {username.charAt(0).toUpperCase()}
        </span>
      </div>
      <p className="text-xs w-14 truncate text-center mt-1">{username}</p>
    </div>
  );
}

export default Story;
