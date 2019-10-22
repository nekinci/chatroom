import React from 'react';
import './css/mystyle.css';
import io from 'socket.io-client/dist/socket.io';
import MessageBox from './MessageBox';
import config from './config.json';
class App extends React.Component{

    constructor(props){
        super(props);
        console.log(props);
        this.state = {modalCss: 'modal',id:this.props.location.state.username,mesajlar:[],kisiSayisi:0};
        this.ayrilma = this.ayrilma.bind(this);
        this.mesajAt = this.mesajAt.bind(this);
        this.connectionConfig = {
            jsonp: false,
            reconnection: true,
            reconnectionDelay: 100,
            reconnectionAttempts: 100000,
            transports: ['websocket']
        };
        this.socket = io('http://127.0.0.1:3030',this.connectionConfig);
        this.socket.on('connect',()=>{
            console.log('Socket connected');
        });
        
        this.socket.on('update',(x)=>{
            this.messages = this.state.mesajlar;
            this.id = 1;
            if(x.data.name === this.state.id) this.id=0;
            this.messages.push(<MessageBox id={this.id} key={Math.random()*10+1+Math.random()*5} name={x.data.name} message={x.data.message} />);
            this.setState({mesajlar:this.messages});
        });

        this.socket.on('kisisayisi',(data)=>{
            console.log(data);
            let kisiSayisi = data.kisiSayisi;
            this.setState({kisiSayisi:kisiSayisi});
        });

        this.text = React.createRef();
        this.area = React.createRef();

    }
    


    ayrilma(){
        this.setState({
            modalCss: 'modal show'
        });
    }

    mesajAt(message){
        console.log(message);
        if(message === undefined || message === '')
            return false;
        this.socket.emit('update', {name:this.state.id,id:this.state.id,message:message});
        this.setState({mesajIcerigi:''});
        this.text.current.value = '';
        this.text.current.focus();
        this.area.current.scrollTop = this.area.current.scrollHeight*10;
    }


    render(){

        return (
            <div>
                
               
                <div className="container-full">
                    <div className="chat-wrapper">
                        <div className="chat-header">
                            <div className="">chat odası </div>
                            <div className="aktif-sayisi"> {this.state.kisiSayisi} kişi aktif</div>
                            <div className="header-right">
                                <i className="menu-item fa fa-ellipsis-v pr-right"></i>
                                <i className="menu-item fa fa-sign-out" onClick={this.ayrilma} />
                            </div>
                        </div>
                        <div className="chat-channel" ref={this.area}>
                            {this.state.mesajlar}
                        </div>
                        <div className="message-box">
                            
                            <input 
                                ref={this.text} 
                                onKeyUp={(e)=>{
                                    if(e.keyCode === 13)
                                        this.mesajAt(this.state.mesajIcerigi)
                                    }
                                } 
                                type="text" 
                                onChange={(e)=>this.setState({mesajIcerigi:e.target.value})}
                                className="inputText" 
                                tabIndex="0" 
                                placeholder="mesaj gönderin.."/>
                            <button 
                            type="button" 
                            onClick={()=>this.mesajAt(this.state.mesajIcerigi)}  
                            className="send-button"><i className="fa  fa-paper-plane"></i> <div className="gonder">Gönder</div></button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;