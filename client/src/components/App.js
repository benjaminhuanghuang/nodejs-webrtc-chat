import React from 'react';
import { Component } from 'react';
import PropTypes from 'prop-types';
//
import Peer from 'peerjs';
//
export default class App extends Component {
  state = {
    hasUserMedia: false,
    message:"",
    messages:[],
    name:"",
    peerId:"",
    peer:null,
    conn:null
  }

  componentWillMount()
  {
    this.state.peer = new Peer({key: 'qv3hp6ln05w5ewmi'});
    
    this.state.peer.on('open', ()=>{
      console.log("peer open #", this.state.peer.id);
      this.setState({peerId: this.state.peer.id})
    });

    this.state.peer.on('call', (call)=>{
      onReceiveCall(call);
    });

    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    
    // User audio and video
    navigator.getUserMedia({audio: true, video: true}, 
      (stream)=>{
        window.localStream = stream;
        this.userVideo.src = window.URL.createObjectURL(stream);
        window.peer_stream = stream;
      },
      (error)=>{
        console.log(error);
        alert('An error occured. Please try again');
      });
    }

  onReceiveCall(call){
    call.answer(window.localStream);
    call.on('stream', function(stream){
      window.peer_stream = stream;
      // onReceiveStream(stream, 'peer-camera');
      this.peerVideo.src = window.URL.createObjectURL(stream);
    });
  }
  function(stream){
    window.localStream = stream;
    onReceiveStream(stream, 'my-camera');
  }
  
  handleMessage(data){
    this.state.messages.push(data);
  }

  sendMessage()
  {
    var msg = this.state.message.trim();
    if (msg.length) {
      let data = {from: this.state.name, text: msg};
      this.state.conn.send(data);
      handleMessage(data);
      this.setState({ message: "" });
    }
  }

  onNameInputChange(event) {
    this.setState({ name: event.target.value });
  }

  onPeerIdInputChange(event) {
    this.setState({ peerId: event.target.value });
  }

  onMessageInputChange(event) {
    this.setState({ message: event.target.value });
  }

  onMessageInputKeyUp(event) {
    if (event.keyCode === 13) {
      this.sendMessage();
    }
  }
  
  onLoginClick(){
    if(this.state.peerId)
    {
      this.state.conn = this.state.peer.connect(this.state.peerId, {metadata:{
        username:name
      }});
      this.state.conn.on('data', this.handleMessage);
    }
  }

  onSendMessageClick(){
    this.sendMessage();
  }

  onCallClick()
  {
    var call = this.state.peer.call(this.state.peer_id, window.localStream);
    call.on('stream', function(stream){
      window.peer_stream = stream;
      onReceiveStream(stream, 'peer-camera');
    });
  }

  render() {
    return (
      <div id="wrapper">

      <div id="peer-camera" className="camera">
        <video width="300" height="300" autoPlay  ref={(video) => { this.peerVideo = video; }}></video>
      </div>

      <div id="messenger-wrapper">
        <div className="container">
          <h1>Peer Messenger</h1>

          <div id="connect">
            <h4>ID: <span id="id"></span></h4>
            <input type="text" name="name" id="name" placeholder="Name"/>
            <input type="text" name="peer_id" id="peer_id" placeholder="Peer ID"
              value={this.state.peerId} onChange={(event)=>this.onPeerIdInputChange(event)} 
            />
            <div id="connected_peer_container">
              Connected Peer:
              <span id="connected_peer"></span>
            </div>
            <button id="login">Login</button>
          </div>

          <div id="chat">
            <div id="messages-container">
              <ul id="messages"></ul>
            </div>
            <div id="message-container">
              <input type="text" name="message" id="message" placeholder="Type message.." 
              value={this.state.message} onChange={(event)=>this.onMessageInputChange(event)} 
              onKeyUp={(event)=>this.onMessageInputKeyUp(event)}/>
              <button id="send-message" onClick={()=>this.onSendMessageClick}>Send Message</button>
              <button id="call" onClick={()=>this.onCallClick()}>Call</button>
            </div>
          </div>
        </div>
      </div>

      <div id="my-camera" className="camera">
        <video width="200" height="200" autoPlay ref={(video) => { this.userVideo = video; }}></video>
      </div>
    </div>
    );
  }
}