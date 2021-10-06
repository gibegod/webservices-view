import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import SignUp from "./components/ui/auth/SignUp";
import SignIn from "./components/ui/auth/SignIn";
import Navegacion from "./components/ui/Navegacion";
import StickyFooter from "./components/ui/StickyFooter";

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
          <Route path="/">
  
          </Route>
        </Switch>
        <StickyFooter />
      </div>
    </Router>
  );
}

export default App;
