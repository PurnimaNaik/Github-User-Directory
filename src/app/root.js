import React from "react";
import {render} from "react-dom";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {Index} from "../components/index.js";
import {SearchDisplayComponent} from "../components/SearchDisplayComponent.js";
import {SearchBarComponent} from "../components/SearchBarComponent.js";


export class Root extends React.Component{

render(){
    return (

      <BrowserRouter>
      <div>
      <Switch>
        <Route path="/home" component={Index}/>
        <Route path="/search" component={SearchBarComponent}/>
        <Route path="/signin" component={SearchDisplayComponent}/>
        </Switch>
      </div>
      </BrowserRouter>

    );
  }
}
render(<Root/>, window.document.getElementById('app'));

//<Route path={"/"} component={Index}/>
// <Route path="/signin" component={searchDisplayComponent}/>
// import React from "react";
// import {render} from "react-dom";
// import { BrowserRouter, Route, Switch } from 'react-router-dom';
// import {Index} from "../components/index.js";
// import {SearchDisplayContainer} from "../components/SearchDisplayContainer.js";
// import {SearchBarContainer} from "../components/SearchBarContainer.js";
//
//
// export class Root extends React.Component{
//
// render(){
//     return (
//
//       <BrowserRouter>
//       <div>
//       <Switch>
//         <Route path="/home" component={Index}/>
//         <Route path="/search" component={SearchDisplayContainer}/>
//         <Route path="/sign" component={SearchBarContainer}/>
//         </Switch>
//       </div>
//       </BrowserRouter>
//
//     );
//   }
// }
