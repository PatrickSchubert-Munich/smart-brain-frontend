import React from "react";

const Rank = ({ name, rank }) => {
  return (
    <div>
      <div className="white f3 pt5">{`${name}, your current entry count is...`}</div>
      <div className="white f3">{`#${rank}`}</div>
    </div>
  );
};

export default Rank;
