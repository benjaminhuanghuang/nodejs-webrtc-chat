import React from 'react';
import { Component } from 'react';
import PropTypes from 'prop-types';
//
import Peer from 'peerjs';
//
import ChatBox from './ChatBox';

export default class App extends Component {
  state = {
    hasUserMedia: false,
  };

  componentWillUnmount()
  {
     this.peer = new Peer({key: 'qv3hp6ln05w5ewmi'});
    
    this.peer.on('open', function(){
   
    });

    navigator.getUserMedia({audio: true, video: true}, callback, function(error){
      console.log(error);
      alert('An error occured. Please try again');
    });
  }

  function(stream){
    window.localStream = stream;
    onReceiveStream(stream, 'my-camera');
  }
  
  onReceiveStream(stream, element_id){
    var video = $('#' + element_id + ' video')[0];
    video.src = window.URL.createObjectURL(stream);
    window.peer_stream = stream;
  }

  hasGetUserMedia() {
    return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
              navigator.mozGetUserMedia || navigator.msGetUserMedia);
  }

  onCallClick()
  {
    console.log('now calling: ' + peer_id);
    console.log(peer);
    var call = this.peer.call(peer_id, window.localStream);
    call.on('stream', function(stream){
      window.peer_stream = stream;
      onReceiveStream(stream, 'peer-camera');
    });
  }

  handleMessage(data){
    var header_plus_footer_height = 285;
    var base_height = $(document).height() - header_plus_footer_height;
    var messages_container_height = $('#messages-container').height();
    messages.push(data);

    var html = messages_template({'messages' : messages});
    $('#messages').html(html);

    if(messages_container_height >= base_height){
      $('html, body').animate({ scrollTop: $(document).height() }, 500);
    }
  }


  render() {
    return (
      <div id="wrapper">

      <div id="peer-camera" className="camera">
        <video width="300" height="300" autoPlay></video>
      </div>

      <div id="messenger-wrapper">
        <div className="container">
          <h1>Peer Messenger</h1>

          <div id="connect">
            <h4>ID: <span id="id"></span></h4>
            <input type="text" name="name" id="name" placeholder="Name"/>
            <input type="text" name="peer_id" id="peer_id" placeholder="Peer ID"/>
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
              <input type="text" name="message" id="message" placeholder="Type message.."/>
              <button id="send-message">Send Message</button>
              <button id="call" onClick={}>Call</button>
            </div>
          </div>
        </div>
      </div>

      <div id="my-camera" className="camera">
        <video width="200" height="200" autoPlay></video>
      </div>
    </div>
    );
  }
}