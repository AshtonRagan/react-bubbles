import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import PrivetRoute from "./components/PrivetRoute";
import Login from "./components/Login";
import "./styles.scss";
import BubblePage from "./components/BubblePage";

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={Login} />
        {/* 
          Build a PrivateRoute component that will 
          display BubblePage when you're authenticated 
        */}
        <PrivetRoute path="/Protected" component={BubblePage} />
      </div>
    </Router>
  );
}

export default App;
