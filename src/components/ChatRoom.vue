<template>
 
  <div class="main">
        <div class="chat-form">
            <div class="users">
                <h3>Chat users:</h3>
                <div class="one-user">
                    <img src="../assets/user_avatar_var2.png">
                    <h4>Profa</h4>
                </div>
              
                <div class="one-user" >
                 
                    <img src="../assets/user_avatar.png">
                    <h4>User</h4>
                   
                </div>
               
            </div>
            <div class="messages">
                <h3>room_name</h3>
                <hr>
                <div class="display">
                <div class="chatbox">
                    <div class="user-msg" >
                        <img src="../assets/user_avatar_var2.png">
                        
                        <div class="msg"><p>Sto je dobar ovaj git :)</p>
                        </div>
                    </div>
                    <div class="my-msg" v-for="(message,index) in messages"
                    :key="index" >
                        <div class="msg">
                            <p> {{message.text}}</p><span class="username-time">{{message.username}}, {{message.time}}</span>
                        </div>
                        <img src="../assets/user_avatar.png">
                       
                    </div>
                    </div>
                    <div class="type-area">
                        <input type="text" placeholder="Type a message..." v-model=" message">
                        <button @click="sendMessage">SEND</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "ChatRoom",
  props: {},
  data() {
    return {
      messages: [],
      message: "",
      shareText: "",
      
      
  
   
     

    }
   
  },
  methods: {
    sendMessage() {
      
      this.$socket.emit("chatMessage", this.message);
      console.log(this.$socket)
     
       this.message="";
      
    },
   
    
    
    
  },
  sockets: {
    message(data) {  
       

      this.messages.push(data);
  

    },
    
  }
  
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
      -ms-flex-pack: center;
          justify-content: center;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
  height: 700px;
  padding: 30px;
}

.main .chat-form {
  width: 80%;
  display: -ms-grid;
  display: grid;
  -ms-grid-columns: (33.33%)[3];
      grid-template-columns: repeat(3, 33.33%);
  border-radius: 20px;
  height: 700px;
}

.main .chat-form .users {
  background-color: #424040;
  padding: 30px;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
}

.main .chat-form .users h3 {
  margin: 0;
  margin-bottom: 30px;
  color: white;
}

.main .chat-form .users .one-user {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
      -ms-flex-direction: row;
          flex-direction: row;
  margin: 10px;
}

.main .chat-form .users .one-user img {
  height: 40px;
  margin-right: 20px;
}

.main .chat-form .users .one-user h4 {
  color: white;
  font-size: 16px;
  margin: 5px;
}

.main .chat-form .messages {
  grid-column: 2 span;
  background-color: #e4e4e4;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  padding: 20px;
}

.main .chat-form .messages h3 {
  margin: 10px;
  color: white;
}

.main .chat-form .messages .display {
  overflow: hidden;
  position: relative;
  height: 90%;
  margin-top: 40px;
}

.main .chat-form .messages .display .user-msg {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
      -ms-flex-direction: row;
          flex-direction: row;
  -webkit-box-pack: center;
      -ms-flex-pack: center;
          justify-content: center;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
  float: left;
  padding: 10px;
  margin-right:100px;
  margin-top:10px;
}

.main .chat-form .messages .display .user-msg img {
  height: 40px;
  margin-right: 20px;
}

.main .chat-form .messages .display .user-msg .msg {
  background-color: white;
  border: 1px solid #b3b3b3;
  padding: 10px;
  border-radius: 20px;
  margin-right: 60px;
}

.main .chat-form .messages .display .user-msg .msg p {
  margin: 0 10px;
  font-size: 12px;
}

.main .chat-form .messages .display .my-msg {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
      -ms-flex-direction: row;
          flex-direction: row;
  -webkit-box-pack: center;
      -ms-flex-pack: center;
          justify-content: center;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
  float: right;
  padding: 10px;
  margin-left: 200px;
  margin-bottom:20px;
}

.main .chat-form .messages .display .my-msg img {
  height: 40px;
  margin-left: 20px;
}

.main .chat-form .messages .display .my-msg .msg {
  background-color: #920f92;
  border: 1px solid #b3b3b3;
  padding: 10px;
  border-radius: 20px;
}

.main .chat-form .messages .display .my-msg .msg p {
  margin: 0 10px;
  font-size: 12px;
  color: white;
}

.main .chat-form .messages .display .type-area {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
      -ms-flex-direction: row;
          flex-direction: row;
  -webkit-box-pack: center;
      -ms-flex-pack: center;
          justify-content: center;
  padding: 10px;
  margin: 10px;
  margin-bottom: 0px;
  width: 90%;
  position: absolute;
  bottom: 10px;
  border-top: 1px solid #b3b3b3;
}

.main .chat-form .messages .display .type-area input {
  background-color: white;
  border: 1px solid #b3b3b3;
  border-radius: 20px;
  padding: 12px;
  outline: none;
  margin: 5px;
  width: 70%;
  font-family: 'Poppins', sans-serif;
  font-size: 12px;
}

.main .chat-form .messages .display .type-area button {
  border: 1px solid #b3b3b3;
  border-radius: 20px;
  padding: 10px;
  outline: none;
  margin: 5px;
  width: 15%;
  background-color: #920f92;
  color: white;
  font-weight: bold;
  font-family: 'Poppins', sans-serif;
  letter-spacing: 1px;
  -webkit-transition: all 0.2s ease;
  transition: all 0.2s ease;
}

.main .chat-form .messages .display .type-area button:hover {
  background-color: #610b61;
}
.chatbox{
  height:500px;
  overflow-y:scroll;
}
::-webkit-scrollbar{
 
}
::-webkit-scrollbar-thmub{
 
 background-color:#e4e4e4;
}
.username-time{
  font-size:12px;
  float:left;
  margin-top:10px;
  margin-left:10px;
  opacity:0.6;
}
</style>

