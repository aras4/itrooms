<template>
  <div class="main">
    <div class="topbar">
      <button>x</button>
      <p>itrooms</p>
    </div>
    <!--div class="logo-img">
      <img src="../assets/logo.png">
    </div-->
    <div class="search-roomname-bar">
      <div class="search">
        <input type="text" placeholder="Search">
        <button><i class="fas fa-search"></i></button>
      </div>
      <div class="room-name">
        <p>{{roomUsers.room}}</p>
      </div>
    </div>
    <div class="chat-form">
      <div class="users-wrapper">
        <div class="users">
          <div v-for="(user,index) in roomUsers.users" :key="index" 
          :class="[index % 2 === 0 ? 'first-user':'second-user']">
            <img src="../assets/pngfuel.com.png" />
            <p>{{user.username}}</p>
          </div>
        </div>
      </div>
      <div class="messages">
        <div class="display">
          <div class="display-messages">
            <div
              v-for="(message,index) in messages"
              :key="index"
              :class="[username === message.username ? 'my-msg':'user-msg']"
            >
              <img src="../assets/pngfuel.com.png" />
              <div class="user-msg-time">
                <div class="msg">
                  <p>{{message.text}}</p>
                </div>
                <span class="username-time">{{message.username}}, {{message.time}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bottombar">
      <div class="options">
        <button><i class="fas fa-cog"></i></button>
        <button><i class="fas fa-user"></i></button>
        <button><i class="fas fa-phone"></i></button>
        <button><i class="fas fa-paper-plane"></i></button>
      </div>
      <div class="type-area">
            <p class="user-typing">{{userTypingMsg}}</p>
            <button><i class="fas fa-smile"></i></button>
            <button><i class="fas fa-paperclip"></i></button>
            <input
              type="text"
              placeholder="Type a message..."
              v-model="message"
              @keyup="typingMessage($event)"
            />
            <button class="button-right" @click="sendMessage"><i class="fas fa-paper-plane"></i></button>
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
      roomUsers: { room: "", users: [] },
      username: "",
      room: "",
      userTypingMsg: ""
    };
  },
  methods: {
    typingMessage(e) {
      let canPublish = true;

      if (!this.message) {
        return this.emitTypingEvent(false);
      }

      if (e.keyCode === 13) {
        this.sendMessage();
      } else {
        if (canPublish) {
          this.emitTypingEvent(true);
          canPublish = false;
          setTimeout(() => (canPublish = true), 1000);
        }
      }
    },
    emitTypingEvent(isTyping) {
      this.$socket.emit("typing", {
        room: this.room,
        username: this.username,
        isTyping: isTyping
      });
    },
    sendMessage() {
      this.emitTypingEvent(false);
      this.$socket.emit("chatMessage", this.message);
      this.message = "";
    },
    scrollToEndMessages() {
      var container = document.querySelector(".display-messages");
      var scrollHeight = container.scrollHeight;
      container.scrollTop = scrollHeight;
    },
    scrollToEndUsers() {
      var container = document.querySelector(".users");
      var scrollHeight = container.scrollHeight;
      container.scrollTop = scrollHeight;
    }
  },
  mounted() {
    this.scrollToEndMessages();
    this.scrollToEndMessages();
  },
  updated() {
    this.scrollToEndMessages();
    this.scrollToEndUsers();
  },
  sockets: {
    typing(data) {
      this.userTypingMsg = data.username !== this.username ? data.msg : "";
    },
    message(data) {
      this.messages.push(data);
    },
    roomUsers(data) {
      this.roomUsers = data;
    }
  },
  created() {
    this.username = this.$route.query.username;
    this.room = this.$route.query.room;
    this.$socket.emit("joinRoom", { username: this.username, room: this.room });
  }
};
</script>

<style lang="scss" scoped>
.user-typing {
  position: absolute;
  top: -55px;
  left: 0;
}

@mixin custom-scroll-bar() {
  &::-webkit-scrollbar {
    border-radius: 10px;
    height: 10px;
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background: rgb(177, 177, 177);
    border-radius: 10px;
  }
  &::-webkit-scrollbar-track {
    border-radius: 10px;
  }
}

.main {
  width: 100%;
  height: 800px;
  position: relative;

  .topbar {
    background-color:rgb(66, 64, 64);
    overflow: hidden;

    button {
      float: left;
      outline: none;
      background-color: rgb(66, 64, 64);
      color:rgb(177, 177, 177);
      border: none;
      font-size: 18px;
      margin: 5px 20px;
      padding: 0px;
      font-family: "Poppins", sans-serif;
    }

    button:hover {
      color:rgb(128, 127, 127)
    }

    p {
      font-family: "Poppins", sans-serif;
      color:rgb(177, 177, 177);
      font-size: 14px;
      margin: 10px;
    }
  }

  /*.logo-img {
    border-radius: 50%;
    position: absolute;
    top: 7%;
    left: 62%;
    background-color: rgb(46, 44, 44);
    padding: 10px;

    img {
      width: 40px;
      border-radius: 50%;
    }
  }*/

  .search-roomname-bar{
    display: grid;
    grid-template-columns: repeat(3, 33.33%);
    background-color: rgb(75, 71, 71);

    .search {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
       border-right: 1px solid rgb(110, 110, 110);
      
      input {
        padding: 10px;
        margin-left: 10px;
        width: 70%;
        background-color: rgb(75, 71, 71);
        font-size: 16px;
        color:rgb(177, 177, 177);
        font-family: "Poppins", sans-serif;
        border: none;
        outline: none;
      }

      button {
        padding: 10px;
        background-color: rgb(75, 71, 71);
        font-size: 16px;
        margin-right: 10px;
        color:rgb(177, 177, 177);
        font-family: "Poppins", sans-serif;
        border: none;
        outline: none;
        font-size: 20px;
      }

      button:hover {
        color:rgb(161, 161, 161);
      }

    }
    .room-name {
      grid-column: 2 span;
      background-color: rgb(75, 71, 71);

      p {
         color:rgb(177, 177, 177);
         text-align: left;
         margin: 15px 0px 15px 40px;
         font-size: 18px;
      }
    }
  }
  
  .chat-form {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 33.33%);
    background-color: white;

      .users {
        @include custom-scroll-bar;
        overflow: auto;
        height: 650px;
        display: flex;
        flex-direction: column;
        border-right: 1px solid rgb(187, 185, 185);

        .first-user {
          display: flex;
          flex-direction: row;
          padding: 20px;
          background-color: white;
          color:rgb(0, 0, 0);
          transition: all 0.1s ease;
          img {
            height: 50px;
            margin: 5px;
          }

          p {
            font-family: "Poppins", sans-serif;
            font-size: 16px;
            font-weight: bold;
            margin: 5px;
            padding: 7px;
          }
        }

        .second-user {
           @extend .first-user;
           background-color: rgb(243, 243, 243);
        } 

        .first-user:hover {
          background-color: rgb(65, 225, 240);
          color:rgb(255, 255, 255);
          }
        
      }
    .messages {
      grid-column: 2 span;
      background-color: rgb(255, 255, 255);
      font-family: "Poppins", sans-serif;      
     
      .display {
        font-family: "Poppins", sans-serif;

        .display-messages {
          @include custom-scroll-bar;
          overflow: auto;
          height: 630px;
          margin:0 0 0 20px;
        }
      }
    }
  }

  .bottombar {
    width:100%;
    display: grid;
    grid-template-columns: repeat(3, 33.33%);
    background-color: white;
    border-top: 1px solid rgb(187, 185, 185);

    .options {
      display: grid;
      grid-template-columns: repeat(4, 25%);

      button {
        border: none;
        outline: none;
        font-size: 22px;
        background-color: white;
        border-right: 1px solid rgb(187, 185, 185);
        color:rgb(187, 185, 185)
      }

      button:hover {
        background-color:rgb(65, 225, 240);
        color:rgb(66, 64, 64);
      }
    }

    .type-area {
      grid-column: 2 span;
      display: flex;
      flex-direction: row;
      overflow: hidden;
     margin-left: 20px;

      button {
        border: none;
        outline: none;
        color:rgb(187, 185, 185);
        background-color: white;
        margin: 10px;
        font-size: 22px;
      }

      button:hover {
        color:rgb(161, 161, 161);
      }

      input {
        outline: none;
        padding: 10px;
        width: 80%;
        color: black;
        font-family: "Poppins", sans-serif;
        border: none;
           
      }

      .button-right {
        color: rgb(75, 71, 71);
        background-color: white;
        margin: 10px;
        font-size: 22px;
        }

      .button-right:hover {
        color:rgb(65, 225, 240);
      }
    }
  }
}

.user-msg {
  display: flex;
  margin: 5px 10px 0;
  justify-content: flex-start;

  .user-msg-time {
    display: flex;
    flex-direction: column;

    .msg {
      background-color: rgb(75, 71, 71);
      border-radius: 15px;
      margin: 5px;
      margin-bottom: 0px;
      border: 1px solid rgb(179, 179, 179);
      border-bottom-left-radius: 0;

      p {
        margin: 8px;
        color: rgb(255, 255, 255);
        font-size: 12px;
      }
    }
    .username-time {
      font-size: 10px;
      color: rgb(187, 185, 185);
      text-align: left;
      margin-left: 5px;
    }
  }
  img {
    height: 40px;
    width: 40px;
    margin: 5px;
    margin: 5px;
  }
}

.my-msg {
  @extend .user-msg;
  justify-content: flex-end !important;
  
}

@media only screen and (max-width: 768px) {
  .messages {
    width: 400px;
  }
  .main {
    padding: 0px;
    margin-right: 70px;
  }
}
@media only screen and (max-width: 600px) {
  .main {
    width: 500px;
  }
  .chat-form {
    margin-top: 150px;
    margin-right: 98px;
  }
}
</style>
