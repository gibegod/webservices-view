import React, {Component} from "react";
import "../css/Login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Cookies from "universal-cookie";

const loginUrl="http://localhost:9001/api/v1.0/login"
const cookies = new Cookies();

class Login extends Component {
    state={
        form:{
            username: "",
            password: ""
        }
    }

    handleChange=e=>{
        this.setState({
            form:{
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        })
    }

    iniciarSesion=async()=>{
        await axios.get(loginUrl, {params:{usuario: this.state.form.username, contrasenia: this.state.form.password}})
        .then(response=>{
            return response.data;
        })
        .then(response=>{
            if(response.length>0){
                var respuesta=response[0];
                cookies.set("id", respuesta.id, {path:"/"});
                cookies.set("usuario", respuesta.usuario, {path:"/"});
                window.location.href="./home";
            }else{
                alert("El usuario o la contraseña no son correctos!")
            }
        })
        .catch(error=>{
            console.log(error)
        })
    }

    componentDidMount(){
        if(cookies.get("usuario")){
            window.location.href="./Home";
        }
    }

    render(){
        return (
            <div className="containerPrincipal">
                <div className="containerSecundario">
                    <div className="form-group">
                        <label>Usuario: </label>
                        <br/>
                        <input
                            type="text"
                            className="form-control"
                            name="username"
                            onChange={this.handleChange}
                        />
                        <br/>
                        <label>Contraseña: </label>
                        <br/>
                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            onChange={this.handleChange}
                        />
                        <br/>
                        <button className="btn btn-primary" onClick={()=>this.iniciarSesion()}>Iniciar Sesión</button>
                    </div>
                </div>
            </div>  
        );
    }
}

export default Login;