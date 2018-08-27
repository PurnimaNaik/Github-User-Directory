import React from "react";
import {render} from "react-dom";
import { BrowserRouter, Route } from 'react-router-dom';
import {Index} from "../components/index.js";
import {SearchBarComponent} from "../components/SearchBarComponent.js";


export class Root extends React.Component{

render(){
    return (

      <BrowserRouter>
      <div>
      <Route path="/" component={Index}/>
      <Route path={"signin"} component={SearchBarComponent}/>
      </div>
      </BrowserRouter>

    );
  }
}
render(<Root />, window.document.getElementById('app'));
