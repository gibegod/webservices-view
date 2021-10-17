import React, {Component} from "react";
import Cookies from "universal-cookie";
import GenericNav from "../components/GenericNav";
import { Table } from "react-bootstrap";
import axios from "axios";
import "../css/Home.css";

const cookies = new Cookies();
const urlGetEnvios = "http://localhost:9001/api/v1.0/envios";
const urlPatchEnvio = "http://localhost:9001/api/v1.0/envio";

class Home extends Component{
    state={
        envios:[],
        busqueda:"",
    }

    peticionGetEnvios=()=>{
        axios.get(urlGetEnvios).then(response=>{
            this.setState({envios: response.data})
            this.allEnvios=response.data;
        })
    }

    componentDidMount(){
        if(!cookies.get("usuario")){
            window.location.href="./";
        }

        this.peticionGetEnvios();
    }

    onChangeBusqueda=async e=>{
        e.persist();
        await this.setState({busqueda: e.target.value});
        this.filtrarElementos();
    }

    filtrarElementos=()=>{
        var busqueda = this.state.busqueda.toLowerCase();
        var search=this.allEnvios.filter(item=>{
            if(item.cod_seguimiento.toLowerCase().includes(busqueda)
                || item.dni_destinatario.toLowerCase().includes(busqueda)
                || item.estado.toLowerCase().includes(busqueda)){
                return item;
            }
        })
        this.setState({envios: search})
    }

    actualizarEstados=()=>{
        var envios = document.getElementsByClassName("envio");
        for(var i=0; i<envios.length; i++){
            var cod_seguimiento = envios[i].childNodes[0].innerHTML;
            var estado = envios[i].childNodes[3].childNodes[0].value;
            
            this.peticionPatchEnvio(cod_seguimiento, estado);
        }  
        window.location.href="./Home";      
    }

    peticionPatchEnvio=(cod_seguimiento, estado)=>{
        axios.patch(urlPatchEnvio, {params:{cod_seguimiento:cod_seguimiento, estado:estado}})
    }

    render(){
        return (
            <div>
                <GenericNav/>

                <div className="container">                
                    <h3>Envíos</h3>
                    <br/>
                    <input
                        type="text"
                        placeholder="Buscar..."
                        className="form-control"
                        onChange={this.onChangeBusqueda}
                    ></input>
                    <br/>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Código seguimiento</th>
                                <th>DNI destinatario</th>
                                <th>Estado</th>
                                <th>Nuevo estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.envios.map(envio=>{
                                return (
                                    <tr className="envio">
                                        <td>{envio.cod_seguimiento}</td>
                                        <td>{envio.dni_destinatario}</td>
                                        <td>{envio.estado}</td>
                                        <td>
                                            <select className="form-select">
                                                <option disabled selected value={envio.estado}>Seleccione...</option>
                                                <option value="En preparación">En preparación</option>
                                                <option value="Despachado">Despachado</option>
                                                <option value="En Camino">En Camino</option>
                                                <option value="Entregado">Entregado</option>
                                            </select>
                                        </td>
                                    </tr>
                                )
                            })}                            
                        </tbody>
                    </Table>
                    <button className="btn btn-success btn-actualizar-estados" onClick={this.actualizarEstados}>Actualizar estados</button>
                </div>
            </div>            
        );
    }
}

export default Home;