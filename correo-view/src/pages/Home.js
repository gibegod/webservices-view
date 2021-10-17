import React, {Component} from "react";
import Cookies from "universal-cookie";
import GenericNav from "../components/GenericNav";
import { Table } from "react-bootstrap";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

const cookies = new Cookies();
const urlGetEnvios = "http://localhost:9001/api/v1.0/envios";

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
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.envios.map(envio=>{
                                return (
                                    <tr>
                                        <td>{envio.cod_seguimiento}</td>
                                        <td>{envio.dni_destinatario}</td>
                                        <td>{envio.estado}</td>
                                        <td>
                                            <button className="btn btn-primary"><FontAwesomeIcon icon={faEdit}/></button>
                                        </td>
                                    </tr>
                                )
                            })}                            
                        </tbody>
                    </Table>
                </div>
            </div>            
        );
    }
}

export default Home;