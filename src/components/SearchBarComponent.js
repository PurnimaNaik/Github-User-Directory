import React from "react";
import {render} from "react-dom";
import {SearchDisplayComponent} from "../components/SearchDisplayComponent.js";
import $ from "jquery";

import style from '../styles/searchComponent.css';


export class SearchBarComponent extends React.Component{

  constructor(props){
    super();
    this.state={
      username:"",
      data:"",
      noResultsflag:false,
      }

this.oncallback = this.oncallback.bind(this);
this.onNoResultCallback = this.onNoResultCallback.bind(this);

}



componentDidMount(){

  $("#searchUser").on("keypress", function(e){

if(e.which == 13) {

  this.setState({
    username:e.target.value,
    });

  var request = new XMLHttpRequest();
  request.open('GET', 'https://api.github.com/users/' + this.state.username, true);
  request.onload = function () {
  var data = JSON.parse(request.response);
  if (request.readyState == 4 && request.status == 200){
    this.oncallback(data);
  }
  else if(request.readyState == 4 && request.status == 404){
    this.onNoResultCallback();
  }
  }.bind(this);
  request.send();
 }

}.bind(this));

}

onNoResultCallback(){
  this.setState({
    noResultsflag:true,
    });
this.props.actionToCall(this.state.username);
}

oncallback(newData){
  this.setState({
    data:newData,
    });
}

  render(){

    return (
      <div>
      <div className="searchBoxContainer">
      {this.state.noResultsflag==true?<input type="search" id="searchUser" placeholder="Enter exact username..." className="searchBoxDisabled" disabled/>:<input type="search"  id="searchUser" placeholder="Enter exact username..." className="searchBox" />}
      </div>

      <SearchDisplayComponent data={this.state.data}/>
      </div>
    );
  }
}
