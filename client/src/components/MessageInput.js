import React, { Component } from "react";

export default class MessageInput extends Component {

  state = {
    message: ""
  };

  keyHandler(event) {
    var msg = this.state.message.trim();
    if (event.keyCode === 13 && msg.length) {
      this.props.messageHandler(msg);
      this.setState({ message: "" });
    }
  }

  handleChange(event) {
    this.setState({ message: event.target.value });
  }

  render() {
    return (
      <input type="text" className="form-control" placeholder="Enter a message..."
        value={this.state.message} onChange={(event)=>this.handleChange(event)} 
        onKeyUp={(event)=>this.keyHandler(event)}/>
    );
  }
}
