import React from "react";

const AddFriendBtn = ({ showFriendsToAdd }) => {
  return (
    <div className="float-right" onClick={showFriendsToAdd}>
      Add Friends +
    </div>
  );
};

export default AddFriendBtn;
