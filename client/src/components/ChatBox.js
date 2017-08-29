
import React from 'react';
import { Component } from 'react';

export default class ChatBox extends Component{


    render()
    {
      return (
        <div className="chat-box" ref="root">
        <div className="chat-header ui-widget-header">React p2p Chat</div>
        <div className="chat-content-wrapper row">
          <MessagesList ref="messagesList"></MessagesList>
          <UsersList users={this.state.users} ref="usersList"></UsersList>
        </div>
        <MessageInput ref="messageInput" messageHandler={this.messageHandler}>
        </MessageInput>
      </div>
      );
    }

}