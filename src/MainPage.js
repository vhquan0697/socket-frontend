import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import coco from'./coco.jpg';


const ChatBox = props => {
    return (
        <div id="ChatBox">
            <div id="ChatWindow">
                <div className="ui segment" id="history">
                    {
                        props.messageData.map((messageItem, i) => {
                            return (
                                <div className="ui comments" key={i}>
                                  <div className="comment">
                                    <a className="avatar">
                                      <img src={messageItem.avatar}></img>
                                    </a>
                                    <div className="content">
                                      <a className="author" onClick={() => props.openProfile(messageItem.username)}>{messageItem.username}</a>
                                      <div className="metadata">
                                        <div className="date">{messageItem.date}</div>
                                      </div>
                                      <div className="text">{messageItem.message}</div>
                                    </div>
                                  </div>
                                </div>
                            )
                        })
                    }
                    {props.isTyping && <div id="status"> someone is typing...</div>}
                </div> 
            </div>
            <div id="inputChatBox" className="ui icon input">
              <i className="telegram plane icon"></i>
              <input type="text" 
                    placeholder="Type a message..." 
                    onKeyPress={(e) => props.handleKeyPress(e, )} 
                    onChange={(e) => props.handleChange(e)} 
                    name="inputMessage"
                    value={props.inputMessage}
                />
            </div>
        </div>
    );
};

const FriendsList = props => {
    return (
    <div id="friendsList">
      <div className="ui segment ">
        <div id="inputFriendsList" className="ui icon input">
          <i className="search icon"></i>
          <input type="text" placeholder="Search a person..." 
                    onChange={(e) => props.handleChangeSearch(e)} 
                    name="inputSearch"
                    value={props.inputSearch}
          />
        </div>
        <h3>Friends</h3>
        <div id="knownFriends" className="ui middle aligned animated list">
            {
                props.knownFriends.map((friendItem, i) => {
                    if(friendItem.username.includes(props.inputSearch)) {
                        return (
                            <div className="item" key={i}>
                              <div className="right floated content">
                                {friendItem.isOnline == 1 && <div className="dot"></div>}
                              </div>
                              <img className="ui avatar image" src="https://api.adorable.io/avatars/285/asiojdioasd" />
                              <div className="content">
                                <a className="header" onClick={() => props.initChatBox(friendItem)}>{friendItem.username}</a>
                              </div>
                            </div>
                        )
                    }
                })
            }
        </div>
        <h3>People you may know</h3>
        <div id="strangers" className="ui middle aligned list">
            {
                props.requestedFriends.map((friendItem, i) => {
                    if(friendItem.username.includes(props.inputSearch)) {
                        return (
                            <div className="item" key={i}>
                              <div className="right floated content">
                                {friendItem.status === "request" && <button className="ui disabled button">Requested</button>}
                                {friendItem.status === "accept" && <button className="ui positive basic button" onClick={() => props.handleAccept(friendItem.id)}>Accept</button>}
                              </div>
                              <img className="ui avatar image" src="https://api.adorable.io/avatars/285/asiojdioasd" />
                              <div className="content">
                                <a className="header">{friendItem.username}</a>
                              </div>
                            </div>
                        )
                    }
                })
            }{
                props.potentialFriends.map((friendItem, i) => {
                    if(friendItem.username.includes(props.inputSearch)) {
                        return (
                            <div className="item" key={i}>
                              <div className="right floated content">
                                <button className="ui basic button" onClick={() => props.handleRequest(friendItem.id)}> <i className="icon user" />Add</button>
                              </div>
                              <img className="ui avatar image" src="https://api.adorable.io/avatars/285/asiojdioasd" />
                              <div className="content">
                                <a className="header">{friendItem.username}</a>
                              </div>
                            </div>
                        )
                    }
                })
            }
        </div>
      </div>
    </div>
    )
};

const NewsFeed = props => {
    return (
      <div id="newsFeed">
        <div className="ui feed segment">
          <div className="event">
            <div className="label">
              <img style={{cursor: "pointer"}} onClick={() => {props.openProfile(props.user.username)}} src={"https://api.adorable.io/avatars/285/" + props.user.username} />
              <a style={{cursor: "pointer"}} onClick={() => {props.handlelogout()}}>Logout</a>
            </div>
            <div className="content">
              <div className="ui form">
                <textarea rows="3" placeholder="What's on your mind..."
                            onKeyPress={(e) => props.handleKeyPressPost(e)} 
                            onChange={(e) => props.handleChangePost(e)} 
                            name="postMessage"
                            value={props.postMessage}
                ></textarea>
              </div>
            </div>
          </div>
        </div>
        <div id="postFeed" className="ui feed segment">
        {
            props.feedData.map((feedItem, i) => {
                return (
                  <div className="event" key={i}>
                    <div className="label">
                      <img src={feedItem.avatar} />
                    </div>
                    <div className="content">
                      <div className="summary">
                        <a>{feedItem.username}</a> posted on his page
                        <div className="date">
                          {feedItem.date}
                        </div>
                      </div>
                      <div className="extra text">
                        {feedItem.message}
                      </div>
                      <div className="meta">
                        <a className="like">
                          <i className="like icon"></i> Like
                        </a>
                      </div>
                    </div>
                  </div>
                )
            })
        }
        </div>
      </div>  
    )
};

const Profile = props => {
    let tmpAvatar = props.modalData.avatar ? props.modalData.avatar : ("https://api.adorable.io/avatars/285/" + props.modalData.username);
    return (
        <div className="ui modal">
          <i className="close icon"></i>
          <div className="header">
            Profile
          </div>
          <div className="image content">
            <div className="ui medium image">
              <img src={tmpAvatar} />
            </div>
            <div className="description">
              <div className="ui header">{props.modalData.username}</div>
              <p>yêu màu tím , thích màu hồng, sống nội tâm, hay khóc thầm,ghét sự giả dối...đặc biệt rất thích ăn rau dền...</p>
            </div>
          </div>
          
          <input type="file" id="my_file" />
          <button onClick={() => props.handleUploadImage()}>Yes</button>
          <div className="actions">
            <div className="ui black deny button">
              Nope
            </div>
            <div className="ui positive right labeled icon button">Follow me<i className="checkmark icon"></i>
            </div>
          </div>
        </div>
    );
};

class MainPage extends Component {
    constructor(props) {
        super(props);
        // _state
        this.state = {
            messageData: [
                {
                    username: "Chatbox",
                    avatar: "https://api.adorable.io/avatars/285/Chatbox",
                    date: "69:69 AM",
                    message: "Welcome our socket application",
                },
                {
                    username: "Chatbox",
                    avatar: "https://api.adorable.io/avatars/285/Chatbox",
                    date: "69:69 AM",
                    message: "Team members",
                },
                {
                    username: "Chatbox",
                    avatar: "https://api.adorable.io/avatars/285/Chatbox",
                    date: "69:69 AM",
                    message: "1551026_Vu~ Hoang` Qua^n",
                },
                {
                    username: "Chatbox",
                    avatar: "https://api.adorable.io/avatars/285/Chatbox",
                    date: "69:69 AM",
                    message: "Huynh` Vinh~ Lo^c.",
                },
                {
                    username: "Chatbox",
                    avatar: "https://api.adorable.io/avatars/285/Chatbox",
                    date: "69:69 AM",
                    message: "NKT",
                },
            ],
            textingFriend: "",
            inputMessage: "",
            isTyping: false,
            inputSearch: "",
            postMessage: "",
            query:"",
            knownFriends: [
                {
                    username: "Windrunner",
                    avatar: "",
                    isOnline: true,
                    pastMessage: "A wind of change is blowing.",
                },
                {
                    username: "Crystal Maiden",
                    avatar: "",
                    isOnline: false,
                    pastMessage: "Who calls the Crystal Maiden?",
                },
            ],
            potentialFriends: [
                {
                    username: "Troll Warlord",
                    avatar: "",
                },
                {
                    username: "Huskar",
                    avatar: "",
                },
            ],
            requestedFriends: [
                {
                    username: "Bristle back",
                    avatar: "",
                },
                {
                    username: "Sniper",
                    avatar: "",
                },
            ],
            feedData: [
                {
                    username: "Ursa",
                    avatar: "",
                    message: "Ours is a life of constant reruns. We're always circling back to where we'd we started, then starting all over again. Even if we don't run extra laps that day, we surely will come back for more of the same another day soon.",
                    date: "68:86",
                },
                {
                    username: "Monkey King",
                    avatar: "",
                    message: "After Supper the Master dismissed all except Sun Wukong, Zhu Bajie and Sha the Monk. He took them out with him and said, \"Look at that wonderful moolight. It makes me long for the time when I can return home.",
                    date: "86:68",
                },
            ],
            user: JSON.parse(sessionStorage.getItem('user')),
            modalData: {
                username: "",
                avatar: ""
            },
        };
    }
    
    componentDidMount() {
        this.socket = this.props.socket;
        this.send(this.initMainPage);
    };
     
    send = function (callback) {
        this.waitForConnection(function () {
            if (typeof callback !== 'undefined') {
                callback();
            }
        }, 100);
    };
    
    waitForConnection = function (callback, interval) {
        if (this.socket.readyState === 1) {
            callback();
        } else {
            var that = this;
            // optional: implement backoff for interval here
            setTimeout(function () {
                that.waitForConnection(callback, interval);
            }, interval);
        }
    };
    
        
    initMainPage = () => {    
        // api init connection
        let msgReqCon = {  
            Method: "GET",  
            URL: "connect",
            Authorization: sessionStorage.getItem('authentication'),
        }; 
        this.socket.send(JSON.stringify(msgReqCon));
        // ============================ _request _init
        // api get list friends
        let msgReqFriends = {  
            Method: "GET",  
            URL: "friend",
            Authorization: sessionStorage.getItem('authentication'),
        }; 
        this.socket.send(JSON.stringify(msgReqFriends));
        
        // api get list strangers
        let msgReqStrangers = {  
            Method: "GET",  
            URL: "friend?isrequested=1",
            Authorization: sessionStorage.getItem('authentication'),
        }; 
        this.socket.send(JSON.stringify(msgReqStrangers));
      
        // api get list request friend
        let msgReqRequest = {  
            Method: "GET",  
            URL: "friend?isrequested=2",
            Authorization: sessionStorage.getItem('authentication'),
        }; 
        this.socket.send(JSON.stringify(msgReqRequest));
        
        // api get list posts
        let msgReqPost = {  
            Method: "GET",  
            URL: "blog/get",
            Authorization: sessionStorage.getItem('authentication'),
        }; 
        this.socket.send(JSON.stringify(msgReqPost));
         
         
         
        // ============================ _response
        this.socket.onmessage = (e) => { 
            let obj = JSON.parse(e.data);
           
            // get friend list
            if(obj.status === 200 && obj.method === 'GET' && obj.url === 'friend') { 
                this.setState({
                  knownFriends: obj.data  
                });
            }
            // get unknown people
            else if(obj.status === 200 && obj.method === 'GET' && obj.url === 'friend?isrequested=2') {
                this.setState({
                  potentialFriends: obj.data
                });
            }
            // get requested people
            else if(obj.status === 200 && obj.method === 'GET' && obj.url === 'friend?isrequested=1') {
                this.setState({
                  requestedFriends: obj.data
                });
            }
            // accept friend request
            else if(obj.status === 200 && obj.method === 'POST' && obj.url === 'friend/accept') {
                let arrayRequested = [...this.state.requestedFriends]; 
                let index = findIndex(arrayRequested, "username", obj.data.username);
                if (index !== -1) {
                    arrayRequested.splice(index, 1);
                    
                    let arrayFriend = [...this.state.knownFriends]; 
                    arrayFriend.push(obj.data);
                    this.setState({requestedFriends: arrayRequested, knownFriends: arrayFriend});
                }   
            }
            // request friend
            else if(obj.status === 200 && obj.method === 'POST' && obj.url === 'friend/add') {
                let arrayPotential = [...this.state.potentialFriends]; 
                let index = findIndex(arrayPotential, "username", obj.data.username);
                if (index !== -1) {
                    arrayPotential.splice(index, 1);
                    let arrayRequested = [...this.state.requestedFriends]; 
                    arrayRequested.push(obj.data);
                    this.setState({potentialFriends: arrayPotential, requestedFriends: arrayRequested});
                }   
            }
            // fetch messages
            else if(obj.status === 200 && obj.method === 'GET' && obj.url.startsWith('chat/')) {
                let data = obj.data;  
                let messageArray = [];
                for(let i = data.length - 1; i >= 0; i--) {
                    let item = data[i];
                    if(this.state.user.id === item.senderid) {
                        let tmpUser = this.state.user;
                        let tmpAvatar = tmpUser.avatar ? tmpUser.avatar : ("https://api.adorable.io/avatars/285/" + tmpUser.username);
                        let msg = {
                            username: tmpUser.username,
                            avatar: tmpAvatar,
                            date: convertTimestampToDate(item.date),
                            message: item.content,
                        }
                        messageArray.push(msg);
                        continue;
                    }
                    let idx = findIndex(this.state.knownFriends, "id", item.senderid);
                    if(idx !== -1) {
                        let tmpUser = this.state.knownFriends[idx];
                        let tmpAvatar = tmpUser.avatar ? tmpUser.avatar : ("https://api.adorable.io/avatars/285/" + tmpUser.username);
                        let msg = {
                            username: tmpUser.username,
                            avatar: tmpAvatar,
                            date: convertTimestampToDate(item.date),
                            message: item.content,
                        }
                        messageArray.push(msg);
                    }
                }
                this.setState({messageData: messageArray});   
            }
            // receive message
            else if(obj.status === 200 && obj.method === 'POST' && obj.url === 'chat/receive') {
                let data = obj.data;
                let tmpAvatar = data.avatar ? data.avatar : ("https://api.adorable.io/avatars/285/" + data.username);
                let msg = {
                    username: data.username,
                    message: data.content,
                    date: convertTimestampToDate(data.date),
                    avatar:tmpAvatar,
                }
                this.setState({messageData: [...this.state.messageData, msg]});   
            }
            // typing notify
            else if(obj.status === 200 && obj.method === 'POST' && obj.url === 'chat/istyping') {
                let data = obj.data;
                this.setState({isTyping: data.type});
            }
            // online notify
            else if(obj.status === 200 && obj.method === 'GET' && obj.url === 'online') {
                let data = obj.data;
                let friendArray = [...this.state.knownFriends];
                let idx = findIndex(friendArray, "id", data.id);
                friendArray[idx].isOnline = true;
                this.setState({knownFriends: friendArray});   
            }
            // offine notify
            else if(obj.status === 200 && obj.method === 'GET' && obj.url === 'offline') {
                let data = obj.data;
                let friendArray = [...this.state.knownFriends];
                let idx = findIndex(friendArray, "id", data.id);
                friendArray[idx].isOnline = false;
                this.setState({knownFriends: friendArray});   
            }
            // receive post
            else if(obj.status === 200 && obj.method === 'GET' && obj.url === 'newblog') {
                let data = obj.data;
                let idx = findIndex(this.state.knownFriends, "id", data.id);
                let tmpUser = this.state.knownFriends[idx];
                if(data.id === this.state.user.id) tmpUser = this.state.user;
                let tmpAvatar = tmpUser.avatar ? tmpUser.avatar : ("https://api.adorable.io/avatars/285/" + tmpUser.username);
                let postItem = {
                    username: tmpUser.username,
                    avatar: tmpAvatar,
                    message: data.content,
                    date: convertTimestampToDate(data.date),
                }
                this.setState({feedData: [postItem, ...this.state.feedData]});   
            }
            // fetch post
            else if(obj.status === 200 && obj.method === 'GET' && obj.url === 'blog/get') {
                let data = obj.data;
                let arrayPost = [];
                for(let i = 0; i < data.length; i++) {
                    let idx = findIndex(this.state.knownFriends, "id", data[i].id);
                    let tmpUser = this.state.knownFriends[idx];
                    if(data[i].id === this.state.user.id) tmpUser = this.state.user;
                    let tmpAvatar = tmpUser.avatar ? tmpUser.avatar : ("https://api.adorable.io/avatars/285/" + tmpUser.username);
                    let postItem = {
                        username: tmpUser.username,
                        avatar:tmpAvatar,
                        message: data[i].content,
                        date: convertTimestampToDate(data[i].date),    
                    }
                    arrayPost.push(postItem);
                }
                this.setState({feedData: arrayPost});   
            }
        };  
    };
  
    openProfile = username => {
        let idx = findIndex(this.state.knownFriends, "username", username);
        let tmpUser = this.state.knownFriends[idx];
        if(username === this.state.user.username) tmpUser = this.state.user;
        this.setState({modalData: tmpUser});
        window.openModalProfile();
    };
    
    handleAccept = target => {
        // api post accept friend
        let msgReq = {  
            Method: "POST",  
            URL: "friend/accept",
            Authorization: sessionStorage.getItem('authentication'),
            DATA: {
                id: target,
            }
        }; 
        this.socket.send(JSON.stringify(msgReq));
    };
    
    handleRequest = target => {
        // api post request add friend
        let msgReq = {  
            Method: "POST",  
            URL: "friend/add",
            Authorization: sessionStorage.getItem('authentication'),
            DATA: {
                id: target,
            }
        }; 
        this.socket.send(JSON.stringify(msgReq));
    };
    
    initChatBox = friend => {
        // api fetch messages
        let msgReq = {  
            Method: "GET",  
            URL: "chat/" + friend.id,
            Authorization: sessionStorage.getItem('authentication'),
        }; 
        this.socket.send(JSON.stringify(msgReq));
        this.setState({textingFriend: friend});
    }

    handleChange = event => {
        const {name, value} = event.target;
        this.setState({
            [name] : value
        });
        if(name === "inputMessage" && value === "") {
            this.sendStopTyping();
        }
    }
    
    handleChangePost = event => {
        const {name, value} = event.target;
        this.setState({
            [name] : value
        });
    }
    
    handleKeyPressPost = (e) => {
        if(e.key === "Enter" && this.state.postMessage !== "") {
            // api get post
            let msgReq = {  
                Method: "POST",  
                URL: "blog/create",
                Authorization: sessionStorage.getItem('authentication'),
                DATA: {
                    id: this.state.user.id,
                    content: this.state.postMessage,
                    date: getCurrentTimestamp(),
                }
            }; 
            this.socket.send(JSON.stringify(msgReq));
            this.setState({postMessage: ""});
        }
    };
    
    flagIsTyping = false;
    handleKeyPress = (e) => {
        if(e.key === "Enter" && this.state.inputMessage !== "") {
            // api send message
            let msgReq = {  
                Method: "POST",  
                URL: "chat/send",
                Authorization: sessionStorage.getItem('authentication'),
                DATA: {
                    id: this.state.textingFriend.id,
                    username: this.state.textingFriend.username,
                    content: this.state.inputMessage,
                    date: getCurrentTimestamp(),
                }
            }; 
            let tmpUser = this.state.user;
            let tmpAvatar = tmpUser.avatar ? tmpUser.avatar : ("https://api.adorable.io/avatars/285/" + tmpUser.username);
            let msg = {
                username: tmpUser.username,
                avatar: tmpAvatar,
                date: convertTimestampToDate(getCurrentTimestamp()),
                message: this.state.inputMessage,
            }
            this.socket.send(JSON.stringify(msgReq));
            this.setState({inputMessage: "", messageData: [...this.state.messageData, msg]});
            //this.sendStopTyping();
        }
        
        if(!this.state.flagIsTyping) {
            // api send is typing
            let msgReq = {  
                Method: "POST",  
                URL: "chat/istyping",
                Authorization: sessionStorage.getItem('authentication'),
                DATA: {
                    username: this.state.textingFriend.username,
                    type: true,
                }
            }; 
            this.socket.send(JSON.stringify(msgReq));
            this.setState({flagIsTyping: true});
        }
    }
    
    handleLogout = () => {
        const history = this.props.history;
        // api send stop typing
        let msgReq = {  
            Method: "POST",  
            URL: "users/logout",
            Authorization: sessionStorage.getItem('authentication'),
        }; 
        this.socket.send(JSON.stringify(msgReq));
        sessionStorage.removeItem("authentication")
        history.push("/login");
    }
    
    sendStopTyping = () => {
        // api send stop typing
        let msgReq = {  
            Method: "POST",  
            URL: "chat/istyping",
            Authorization: sessionStorage.getItem('authentication'),
            DATA: {
                username: this.state.textingFriend.username,
                type: false,
            }
        }; 
        this.socket.send(JSON.stringify(msgReq));
        this.setState({flagIsTyping: false});
    }
    
    
    handleChangeSearch = (e) => {
        const {name, value} = e.target;
        this.setState({
            [name] : value
        });
    }
    
    handleUploadImage = (e) => {
        console.log("asdsadasdsa   image")
        let modalItem = this.state.modalData;
        modalItem.avatar = coco;
        console.log(modalItem);
        this.setState({modalData: modalItem});
        console.log(this.state.modalData)
    }
    
    // _render
    render() {
        return (
            <div className="ui grid">
                <div className="four wide column">
                    <FriendsList
                        user={this.state.user}
                        knownFriends={this.state.knownFriends}
                        potentialFriends={this.state.potentialFriends}
                        requestedFriends={this.state.requestedFriends}
                        handleAccept={this.handleAccept}
                        handleRequest={this.handleRequest}
                        initChatBox={this.initChatBox}
                        handleChangeSearch={this.handleChangeSearch}
                        inputSearch={this.state.inputSearch}
                    />
                </div>
                <div className="six wide column">          
                    <ChatBox
                        openProfile={this.openProfile}
                        messageData={this.state.messageData}
                        isTyping={this.state.isTyping}
                        handleKeyPress={this.handleKeyPress}
                        handleChange={this.handleChange}
                        inputMessage={this.state.inputMessage}
                    />
                </div>
                <div className="six wide column">
                    <NewsFeed 
                        user={this.state.user}
                        handleChangePost={this.handleChangePost}
                        handleKeyPressPost={this.handleKeyPressPost}
                        feedData={this.state.feedData}
                        postMessage={this.state.postMessage}
                        handlelogout={this.handleLogout}
                        openProfile={this.openProfile}
                    />
                </div>
                <Profile 
                    modalData={this.state.modalData} 
                    handleUploadImage={this.handleUploadImage}
                />
            </div>   
        );
    }
}
export default withRouter(MainPage);


// ====================== Helper functions
var findIndex = (array, attr, value) => {
    for(let i = 0; i < array.length; i += 1) {
        if(array[i][attr] == value) {
            return i;
        }
    }
    return -1;
}
var convertTimestampToDate = (unix_timestamp) => {
    let date = new Date(unix_timestamp*1000);
    let hours = date.getHours();
    let minutes = "0" + date.getMinutes();
    return hours + ':' + minutes.substr(-2);
}

var getCurrentTimestamp = () => {
  return Math.round((new Date()).getTime() / 1000);
}