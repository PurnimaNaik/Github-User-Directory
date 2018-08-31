import React from "react";
import {render} from "react-dom";
import $ from "jquery";
import editIcon from '../assets/editIcon.png'
import style from '../styles/searchDisplayComponent.css';

export class SearchDisplayComponent extends React.Component{

  constructor(props){
    super();

    var code;
    if(props.location){
      var length = props.location.search.length;
      code = props.location.search.substring(6,length);
    }

    this.state={
      user:props.data,
      codeInState:code,
      disclaimerText:false,
    }


    if(code){
      var request = new XMLHttpRequest();
      var params = 'client_id=4f316e83b3e3f03239c3&client_secret=95a7986e4e87fefcbcbe76af8650fab8886b03af&code='+ String(this.state.codeInState);
      request.open('POST', 'https://github.com/login/oauth/access_token', true);
      request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      request.onload = function () {
        var allData = JSON.parse(request.response);
        if (request.readyState == 4 && request.status == 200){
          alert(allData);
        }
      }.bind(this);
      request.send(params);
    }
  }

  onEditBio(){
    var request = new XMLHttpRequest();
    // var params = 'client_id=4f316e83b3e3f03239c3&client_secret=95a7986e4e87fefcbcbe76af8650fab8886b03af&code='+ String(this.state.codeInState);
    request.open('GET', 'https://github.com/login/oauth/authorize?client_id=4f316e83b3e3f03239c3&scope=bio&redirect_uri=http://localhost:8080/signin', true);
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    request.onload = function () {
      var allData = JSON.parse(request.response);
      if (request.readyState == 4 && request.status == 200){
      }
    }.bind(this);
    request.send(params);
  }


  componentWillReceiveProps(newProps) {

    if(newProps){
      this.setState({
        user:newProps.data,
      });
    }

    if(newProps.location){

      var length = newProps.location.search.length;
      var code = newProps.location.search.substring(6,length);

      this.setState({
        user:newProps.data,
      });
    }

  }

  render(){

   var user=this.state.user;

    return (
      <div>
        <div className="searchDisplayContainer">

          <div className="modalAvataarContainerinSearchDisplay">
            <img className="modalAvataarinSearchDisplay" src={user["avatar_url"]} alt="avataar"/>
          </div>

          <h1>{user["name"]}</h1>

          <div className="infoContainerinSearchDisplay">

            <p>Username:{' '}{user["login"]}</p>
            <p>Followers:{' '} {user["followers"]}</p>
            <p>Following:{' '} {user["following"]}</p>
            <p>Public Repos:{' '}{user["public_repos"]}</p>

          </div>

          <div className="infoContainerinSearchDisplay">

            {(user["email"]!=null) && (user["email"]!="") ? <p>Email:{' '} {user["email"]}</p>: ""}
            {(user["location"]!=null) && (user["location"]!="") ? <p>Location:{' '} {user["location"]}</p>: ""}
            {(user["company"]!=null) && (user["company"]!="") ? <p>Company:{' '} {user["company"]}</p>: ""}
            {(user["blog"]!=null) && (user["blog"]!="") ? <p>Blog:{' '}{user["blog"]}</p>: ""}

          </div>

          <div className="bioContainer">

            <div className="bioContainer_content">
              {(user["bio"]!=null) && (user["bio"]!="") ? <p>Bio:{' '} {user["bio"]}</p>: ""}
            </div>
          </div>
        </div>

        {this.state.disclaimerText==true ? <h1>No such user found</h1>:""}
      </div>
    );
  }
}

// <div className="bioContainer_edit">
// {(user["bio"]!=null) && (user["bio"]!="") ? <p><a href="https://github.com/login/oauth/authorize?client_id=4f316e83b3e3f03239c3&scope=bio&redirect_uri=http://localhost:8080/signin"> Edit Bio <img  className="editIcon" alt="edit bio" src={editIcon}/></a></p>: <a href="" onClick={this.onEditBio}> Add Bio <img  className="editIcon" alt="edit bio" src={editIcon}/></a>}
// </div>
