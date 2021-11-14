import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import SignUp from "./components/ui/auth/SignUp";
import SignIn from "./components/ui/auth/SignIn";
import Navegacion from "./components/ui/Navegacion";
import StickyFooter from "./components/ui/StickyFooter";
import DatosUsuario from "./components/ui/DatosUsuario";
import NuevaTarjeta from "./components/ui/NuevaTarjeta";
import NuevoDomicilio from './components/ui/NuevoDomicilio';
import Catalogo from "./components/ui/Catalogo/Catalogo";
import Producto from "./components/ui/Catalogo/Producto";
import Carrito from "./components/ui/Carrito/Carrito";
import PasosOrden from "./components/ui/Orden/PasosOrden";
import Compras from "./components/ui/ComprasRealizadas/Compras";
import FormReclamo from "./components/ui/ComprasRealizadas/FormReclamo";
import Reclamos from "./components/ui/ComprasRealizadas/Reclamos";
import FormDenuncia from "./components/ui/Catalogo/FormDenuncia";
import Denuncias from "./components/ui/Catalogo/Denuncias";
import NuevaCuentaBancaria from "./components/ui/NuevaCuentaBancaria";
import MesaDeAyuda from "./components/ui/MesaDeAyuda/MesaDeAyuda";
import CrearProducto from "./components/ui/Vendedor/CrearProducto";
import Publicaciones from "./components/ui/Vendedor/Publicaciones";
import ModificarProducto from "./components/ui/Vendedor/ModificarProducto";

function App() {
  return (
    <Router>
      <div>
        <Navegacion />

        <Switch>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/signin">
            <SignIn />
          </Route>
          <Route path="/misdatos">
            <DatosUsuario />
          </Route>
          <Route path="/nuevodomicilio">
            <NuevoDomicilio />
          </Route>
          <Route path="/nuevatarjeta">
            <NuevaTarjeta />
          </Route>
          <Route path="/nuevacuentabancaria">
            <NuevaCuentaBancaria />
          </Route>
          <Route path="/catalogo">
            <Catalogo />
          </Route>
          <Route path="/producto/:id">
            <Producto />
          </Route>
          <Route path="/carrito">
            <Carrito />
          </Route>
          <Route path="/orden">
            <PasosOrden />
          </Route>
          <Route path="/compras">
            <Compras />
          </Route>
          <Route path="/nuevoreclamo/:id">
            <FormReclamo />
          </Route>
          <Route path="/reclamos">
            <Reclamos />
          </Route>
          <Route path="/nuevadenuncia/:id">
            <FormDenuncia />
          </Route>
          <Route path="/denuncias">
            <Denuncias />
          </Route>
          <Route path="/mesadeayuda">
            <MesaDeAyuda />
            </Route>
          <Route path="/nuevoproducto">
            <CrearProducto />
          </Route>
          <Route path="/modificarproducto/:id">
            <ModificarProducto />
          </Route>
          <Route path="/publicaciones">
            <Publicaciones />
          </Route>
        </Switch>

      </div>
    </Router>
  );
}

export default App;
