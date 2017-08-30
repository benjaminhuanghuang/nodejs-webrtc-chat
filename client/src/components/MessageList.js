import React, { Component } from "react";

//
import ChatMessage from "./ChatMessage";

export default class MessageList extends Component {
  state = {
    messages: []
  };

  render() {
    var messages;

    if (!messages.length) {
      messages = <div className="chat-no-messages">No messages</div>;
    } else {
      messages = this.state.messages.map(function(m) {
        return <ChatMessage message={m} />;
      });
    }

    return (
      <div ref="messageContainer" className="chat-messages col-xs-9">
        {messages}
      </div>
    );
  }
}
