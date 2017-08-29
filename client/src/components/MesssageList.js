import React, { Component } from "react";

// 
import ChatMessage from './ChatMessage';

export default class MessageList extends Component{

  render () {
    var messages;
    messages = this.state.messages.map(function (m) {
      return (
        <ChatMessage message={m}></ChatMessage>
      );
    });
    if (!messages.length) {
      messages = <div className="chat-no-messages">No messages</div>;
    }

    return (
      <div ref="messageContainer" className="chat-messages col-xs-9">
        {messages}
      </div>
    );
  }
}