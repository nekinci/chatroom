import React from 'react';
import {Link} from 'react-router-dom';
import './css/mystyle.css';

class Login extends React.Component{

    constructor(props){
        super(props);
        this.state = {isim:''};
    }


    render(){
        return (

            <div className="login-wrapper">
                <div className="login-box">
                    <div className="inner-wrapper">
                        <input onChange={(e)=>this.setState({isim:e.target.value})} type="text" id="isim" placeholder="isminizi girin" maxLength="20"  className= "loginInput" name="isim" />
                        <Link to={{pathname:'/chat', state:{username:this.state.isim}}} ><button className="btnGiris">chate gir</button></Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;