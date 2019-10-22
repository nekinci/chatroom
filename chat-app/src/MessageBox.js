import './css/mystyle.css';
import React, { Component } from 'react';

class MessageBox extends Component{

    constructor(props){
        super(props);
        this.state = {name:this.props.name, message: this.props.message, id:this.props.id};
        if(this.state.id === 1)
            this.classN = "message-left";
        else 
            this.classN = "message-right";
    }
    render(){
        return (
            <div className={this.classN}>
                {this.state.id !== 0&& <div className="message-name">{this.state.name}</div>}
                {this.state.message}               
            </div>
        );
    }
}

export default MessageBox;