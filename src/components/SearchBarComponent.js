import React from "react";
import {render} from "react-dom";
import {browserHistory} from "react-router-dom";
import {Link} from "react-router-dom";
import {SearchDisplayComponent} from "../components/SearchDisplayComponent.js";
import createBrowsHistory from 'history/createBrowserHistory';
import $ from "jquery";
import style from '../styles/searchComponent.css';
export const history = createBrowsHistory();

export class SearchBarComponent extends React.Component{

  constructor(props){
    super();
    this.state= {
      username:"",
      data:"",
      noResultsflag:false,
    }
    this.oncallback = this.oncallback.bind(this);
    this.onNoResultCallback = this.onNoResultCallback.bind(this);
  }



  componentDidMount(){
    //extract the keyword from searchbar if any key is pressed
    $("#searchUser").on("keypress", function(e){

     //execute the following code only if 'Enter' key is pressed
      if(e.which == 13) {

        this.setState({
          username:e.target.value,
          data:"",
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
    //calling actionToCall() in Index.js
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
          {this.state.noResultsflag==true?<input type="search" id="searchUser" placeholder="Enter username..." className="searchBoxDisabled" disabled/>:<input type="search"  id="searchUser" placeholder="Enter username..." className="searchBox" />}
        </div>
        {this.state.data==""? "": <SearchDisplayComponent data={this.state.data}/>}
      </div>
    );
  }
}
