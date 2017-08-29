import React from "react";

export default () => {
  const users = this.props.users.map(function(user) {
    return <div className="chat-user">{user}</div>;
  });

  return <div className="users-list col-xs-3">{users}</div>;
};
