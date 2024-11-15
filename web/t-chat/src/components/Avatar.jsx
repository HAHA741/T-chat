import React from "react";

function Avatar({ username }) {
  return (
    <div className="avatar">
      <img
        src={`https://www.gravatar.com/avatar/${username}`}
        alt="User Avatar"
      />
    </div>
  );
}

export default Avatar;
