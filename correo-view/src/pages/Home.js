import React, {Component} from "react";
import Cookies from "universal-cookie";
import GenericNav from "../components/GenericNav";

const cookies = new Cookies();

class Home extends Component{
    componentDidMount(){
        if(!cookies.get("usuario")){
            window.location.href="./";
        }
    }

    render(){
        return (
            <div>
                <GenericNav/>
            </div>            
        );
    }
}

export default Home;