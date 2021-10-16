import React, {Component} from "react";
import Cookies from "universal-cookie";

const cookies = new Cookies();

class Home extends Component{
    cerrarSesion=()=>{
        cookies.remove("id", {path:"/"});
        cookies.remove("usuario", {path:"/"});
        window.location.href="./";
    }

    componentDidMount(){
        if(!cookies.get("usuario")){
            window.location.href="./";
        }
    }

    render(){
        return (
            <div>
                Home
                <button onClick={()=>this.cerrarSesion()}>Cerrar Sesión</button>
            </div>            
        );
    }
}

export default Home;