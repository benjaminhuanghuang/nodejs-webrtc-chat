import React from 'react';
import { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
//
import ChatBox from './ChatBox';

export default class App extends Component {
  state =  {
    chatProxy:null,
    username:""
  };

  render() {
    return (
      <div className="container">
        <ChatBox chatProxy = {this.state.chatProxy} username={this.state.username}/>
        <label htmlFor="username-input">Username</label>
        <input type="text" id="username-input" className="form-control"/>
        <button id="connect-btn" className="btn btn-primary">Connect</button>
      </div>
    );
  }
}