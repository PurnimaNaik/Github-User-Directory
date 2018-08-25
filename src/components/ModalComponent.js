import React from "react";
import {render} from "react-dom";
import style from '../styles/modalComponent.css';

export class ModalComponent extends React.Component{

constructor(props){
    super();
    this.state={
    modalVisibilityinState : props.modalVisibility,
    currentUser:props.userClicked,
    currentUserData:"",
    currentPage:1,
    repoData:"",
    reachedEnd:false,
    length:"",
    }
    this.hideModal = this.hideModal.bind(this);
    this.incrementPaginationIndex = this.incrementPaginationIndex.bind(this);
    this.decrementPaginationIndex=this.decrementPaginationIndex.bind(this)
}

componentWillReceiveProps(newProps) {

//resetting state variables once new user has been selected
this.setState({
  modalVisibilityinState: newProps.modalVisibility,
  currentUser:newProps.userClicked,
  reachedEnd:false,
  repoData:"",
  currentUserData:"",
  currentPage:1,
  length:"",
});

if(newProps.userClicked){

//request to get current user's primary details
  var requestPrimaryData = new XMLHttpRequest();
  requestPrimaryData.open('GET', 'https://api.github.com/users/'+ String(newProps.userClicked), true);
  requestPrimaryData.onload = function () {
  var userData = JSON.parse(requestPrimaryData.response);
  if (requestPrimaryData.readyState == 4 && requestPrimaryData.status == 200){
    this.oncallback(userData);
    }
      }.bind(this);
        requestPrimaryData.send();

//request to get list of current user's repos
  var requestRepoData = new XMLHttpRequest();
  requestRepoData.open('GET', 'https://api.github.com/users/'+ String(newProps.userClicked) + '/repos?per_page=20&page=' + String(this.state.currentPage), true);
  requestRepoData.onload = function () {
  var repoData = JSON.parse(requestRepoData.response);
  if (requestRepoData.readyState == 4 && requestRepoData.status == 200){
    this.onIncrementRepoCallback(repoData);
    }
      }.bind(this);
        requestRepoData.send();

//check if next set of user's repos is empty; if so, set the ReachedEndFlag in state to true
  var requestForTotalRepoLength = new XMLHttpRequest();
  requestForTotalRepoLength.open('GET', 'https://api.github.com/users/'+ String(newProps.userClicked) + '/repos?per_page=20&page=' + String(this.state.currentPage + 1), true);
  requestForTotalRepoLength.onload = function () {
  var nextData = JSON.parse(requestForTotalRepoLength.response);
  if (requestForTotalRepoLength.readyState == 4 && requestForTotalRepoLength.status == 200 && nextData.length==0){
    this.setReachedEndFlag(nextData.length);
  }
    }.bind(this);
      requestForTotalRepoLength.send();
      }
  }

oncallback(userData) {
  if(userData){
  this.setState({
    currentUserData:userData,
  });
  }
}

//only dismiss modal when clicked on the area outside the modal
stopPropagation(event){
  event.stopPropagation();
}

//dismiss modal by calling ontoggleModalVisibility in index.js
hideModal(){
  this.props.toggleVisibilityInIndex();
}

onDecrementRepoCallback(repoData){
  this.setState({
    repoData:repoData,
    reachedEnd:false,
  });
}

onIncrementRepoCallback(repoData){
  this.setState({
    repoData:repoData,
  });
}

//request for the next set of repos and store them in state
incrementPaginationIndex(){
  var newPageIndex=this.state.currentPage+1;
  this.setState({
    currentPage:newPageIndex,
  });

  var requestRepoData = new XMLHttpRequest();
  requestRepoData.open('GET', 'https://api.github.com/users/'+ String(this.state.currentUser) + '/repos?per_page=20&page=' + String(newPageIndex), true);
  requestRepoData.onload = function () {
  var repoData = JSON.parse(requestRepoData.response);
  if (requestRepoData.readyState == 4 && requestRepoData.status == 200){
  this.onIncrementRepoCallback(repoData);
  }
    }.bind(this);
    requestRepoData.send();

//check if next set of user's repos is empty; if so, set the ReachedEndFlag in state to true
  var requestForTotalRepoLength = new XMLHttpRequest();
  requestForTotalRepoLength.open('GET', 'https://api.github.com/users/'+ String(this.state.currentUser) + '/repos?per_page=20&page=' + String(this.state.currentPage + 2), true);
  requestForTotalRepoLength.onload = function () {
  var nextData = JSON.parse(requestForTotalRepoLength.response);
  if (requestForTotalRepoLength.readyState == 4 && requestForTotalRepoLength.status == 200 && nextData.length==0){
  this.setReachedEndFlag(nextData.length);
  }
    }.bind(this);
    requestForTotalRepoLength.send();
}

setReachedEndFlag(length){
  this.setState({
    reachedEnd:true,
    length:this.length,
  });
}

//request for the previous set of repos and store them in state
decrementPaginationIndex(){
var newPageIndex=this.state.currentPage-1;
  this.setState({
  currentPage:newPageIndex,
 });

  var requestRepoData = new XMLHttpRequest();
  requestRepoData.open('GET', 'https://api.github.com/users/'+ String(this.state.currentUser) + '/repos?per_page=20&page=' + String(newPageIndex), true);
  requestRepoData.onload = function () {
  var repoData = JSON.parse(requestRepoData.response);
  if (requestRepoData.readyState == 4 && requestRepoData.status == 200){
  this.onDecrementRepoCallback(repoData);
  }
    }.bind(this);
      requestRepoData.send();
}

render(){

var repoData=this.state.repoData;
var user=this.state.currentUserData;
var repoList=[];

//populate the repoList with repo names based
if(this.state.repoData){
    for(var i=0;i<=this.state.repoData.length-1; i++){
      const repoListEntry= <div key={i} className="repoListEntry"><a >{repoData[i]["name"]}</a></div>
      repoList.push(repoListEntry);
    }
}

let codeBackground = '../assets/codeBackground.jpg';

const modal=
<div onClick={this.hideModal} className="darkContainer">
<div onClick={this.stopPropagation} className="modalContainer">

<div className="backgroundImageContainer">
<img className="backgroundImage" src={codeBackground} alt="code background Image"/>
</div>

<div className="modalAvataarContainer">
<img className="modalAvataar" src={user["avatar_url"]} alt="avataar"/>
</div>

<h1>{user["name"]}</h1>

<div className="infoContainer">

<p>Username:{' '}{user["login"]}</p>
<p>Followers:{' '} {user["followers"]}</p>
<p>Following:{' '} {user["following"]}</p>
<p>Public Repos:{' '}{user["public_repos"]}</p>

</div>

<div className="infoContainer">

{(user["email"]!=null) && (user["email"]!="") ? <p>Email:{' '} {user["email"]}</p>: ""}
{(user["location"]!=null) && (user["location"]!="") ? <p>Location:{' '} {user["location"]}</p>: ""}
{(user["company"]!=null) && (user["company"]!="") ? <p>Company:{' '} {user["company"]}</p>: ""}
{(user["blog"]!=null) && (user["blog"]!="") ? <p>Blog:{' '}{user["blog"]}</p>: ""}

</div>

<h3>Repositories</h3>
<div key={i} className="repoList">
{repoList}
</div>

<div className="buttonContainer">

{this.state.currentPage>=2 && user["public_repos"]!=0 ? <a onClick={this.decrementPaginationIndex}  className="paginationButtonPrev">&#8249;</a> : ""}
{this.state.reachedEnd==false && user["public_repos"]!=0  ? <a onClick={this.incrementPaginationIndex}  className="paginationButtonNext">&#8250;</a> : ""}
{user["public_repos"]==0 ? <p className="noRepoDeclaration">No public repositories</p> : ""}

</div>

</div>
</div>

 const renderModal = this.state.modalVisibilityinState ? <div>{modal}</div> : "";

  return (
  <div>{renderModal}</div>
    );
  }
}
