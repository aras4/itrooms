<template>
  <div class="main">
    <div class="topbar">
      <button id="close" @click="closeChat">
        <i class="fas fa-times"></i>
      </button>
      <p>ITRooms</p>
    </div>
    <div class="search-roomname-bar">
      <div class="search">
        <input type="text" placeholder="Search" />
        <button>
          <i class="fas fa-search"></i>
        </button>
      </div>
      <div class="room-name">
        <p>{{roomUsers.room}}</p>
      </div>
    </div>
    <div class="chat-form">
      <div class="users-wrapper">
        <div class="users">
          <div
            v-for="(user,index) in roomUsers.users"
            :key="index"
            :class="[index % 2 === 0 ? 'first-user':'second-user']"
          >
            <img src="../assets/pngfuel.com.png" />
            <p>{{user.username}}</p>
          </div>
        </div>
        <div class="options">
          <button>
            <i class="fas fa-cog"></i>
          </button>
          <button>
            <i class="fas fa-user"></i>
          </button>
          <button>
            <i class="fas fa-phone"></i>
          </button>
          <button>
            <i class="fas fa-paper-plane"></i>
          </button>
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
              <img v-if="username !== message.username" src="../assets/pngfuel.com.png" />
              <div class="user-msg-time">
                <div class="msg">
                  <p>{{message.text}}</p>
                </div>
                <span class="username-time">{{message.username}}, {{message.time}}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="type-area">
          <p class="user-typing">{{userTypingMsg}}</p>
          <button>
            <i class="fas fa-paperclip"></i>
          </button>
          <!--VueEmoji ref="emoji" @input="onInput" @keyup="typingMessage($event)" 
          /-->
          <input
            type="text"
            placeholder="Type a message..."
            v-model="message"
            @keyup="typingMessage($event)"
          />
          <button class="button-right" @click="sendMessage" :disabled="!message">
            <i class="fas fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//import VueEmoji from "emoji-vue";
export default {
  name: "ChatRoom",
  /*components: {
    VueEmoji
  },*/
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
    closeChat() {
      this.$socket.close();
      this.$router.push({ name: "roomhome" });
    },
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
      // this.$refs.emoji.clear();
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
    },
    onInput(event) {
      event.data;
      this.message = event.data;
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
    this.username = this.$route.params.username;
    this.room = this.$route.params.room;
    this.$socket.connect();
    this.$socket.emit("joinRoom", { username: this.username, room: this.room });
  }
};
</script>

<style lang="scss" scoped>
button:disabled {
  color: #ddd !important;
}

.user-typing {
  position: absolute;
  bottom: 5%;
  left: 38.5%;
  font-size: 12px;
  color: rgb(177, 177, 177);
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
  position: relative;

  .topbar {
    background-color: rgb(66, 64, 64);
    overflow: hidden;

    #close {
      display: block;
      float: left;
      outline: none;
      background-color: rgb(66, 64, 64);
      color: rgb(177, 177, 177);
      font-weight: bold;
      border: none;
      font-size: 18px;
      margin: 5px 20px;
      padding: 0px;
      font-family: "Poppins", sans-serif;
    }

    #swipe-left {
      display: none;
      float: left;
      outline: none;
      background-color: rgb(66, 64, 64);
      color: rgb(177, 177, 177);
      font-weight: bold;
      border: none;
      font-size: 18px;
      margin: 5px 20px;
      padding: 0px;
      font-family: "Poppins", sans-serif;
    }

    #close:hover {
      color: rgb(128, 127, 127);
    }

    p {
      font-family: "Poppins", sans-serif;
      color: rgb(177, 177, 177);
      font-size: 14px;
      margin: 8px;
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

  .search-roomname-bar {
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
        color: rgb(177, 177, 177);
        font-family: "Poppins", sans-serif;
        border: none;
        outline: none;
      }

      button {
        padding: 9px;
        background-color: rgb(75, 71, 71);
        font-size: 16px;
        margin-right: 10px;
        color: rgb(177, 177, 177);
        font-family: "Poppins", sans-serif;
        border: none;
        outline: none;
        font-size: 20px;
      }

      button:hover {
        color: rgb(161, 161, 161);
      }
    }
    .room-name {
      grid-column: 2 span;
      background-color: rgb(75, 71, 71);

      p {
        color: rgb(177, 177, 177);
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

    .users-wrapper {
      display: flex;
      flex-direction: column;

      .users {
        @include custom-scroll-bar;
        overflow: auto;
        height: 82.6vh;
        display: flex;
        flex-direction: column;
        border-right: 1px solid rgb(187, 185, 185);

        .first-user {
          display: flex;
          flex-direction: row;
          padding: 20px;
          background-color: white;
          color: rgb(0, 0, 0);
          transition: all 0.1s ease;
          
          img {
            height: 50px;
            margin: 5px;
            border-radius: 50%;
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
        color: rgb(255, 255, 255);
        }
      }
      .options {
        display: grid;
        grid-template-columns: repeat(4, 25%);
        border-top: 1px solid rgb(187, 185, 185);

        button {
          border: none;
          outline: none;
          font-size: 22px;
          background-color: white;
          border-right: 1px solid rgb(187, 185, 185);
          color: rgb(187, 185, 185);
          padding: 10px;
        }

        button:hover {
          background-color: rgb(65, 225, 240);
          color: rgb(66, 64, 64);
        }
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
          overflow-y: scroll;
          height: 79.5vh;
          margin: 0 0px 25px 20px;
          
        }
      }

      .type-area {
        grid-column: 2 span;
        display: flex;
        flex-direction: row;
        overflow: hidden;
        padding: 0 20px;
        border-top: 1px solid rgb(187, 185, 185);

        button {
          border: none;
          outline: none;
          color: rgb(187, 185, 185);
          background-color: white;
          margin: 10px;
          font-size: 22px;
        }

        button:hover {
          color: rgb(161, 161, 161);
        }

        /*.emoji-vue-wraper {
          outline: none;
          width: 70%;
          color: black;
          font-family: "Poppins", sans-serif;
          height: 30px;
          
          .emoji-picker-cantainer {
        
            .emoji-wysiwyg-editor {
              padding: 0px;
              border: none;

              .emoji-picker {
                right: 40px;
                top: 2px;

              }
            }
          }
        }*/

        input {
          outline: none;
          padding: 10px;
          width: 90%;
          color: black;
          font-family: "Poppins", sans-serif;
          border: none;
        }

        .button-right {
          color: #bbb9b9;
          background-color: white;
          margin: 10px;
          font-size: 22px;
        }

        .button-right:hover {
          color: rgb(65, 225, 240);
        }
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
      background-color: rgb(92, 86, 86);
      border-radius: 15px;
      margin: 5px;
      margin-bottom: 0px;
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
    border-radius: 50%;
  }
}

.my-msg {
  @extend .user-msg;
  justify-content: flex-end !important;

  .msg {
    border-radius: 15px !important;
    border-bottom-right-radius: 0 !important;
    background-color: rgb(65, 225, 240) !important;
  }

  .username-time {
    text-align: right !important;
  }
}

@media only screen and (max-width: 425px) {
  .main {
    .topbar {
      #close {
        float: right;
      }
    }

    .search-roomname-bar {
      display: none;
    }

    .user-typing {
    position: absolute;
    bottom: 4%;
    left: 13% !important;
    font-size: 12px;
    color: rgb(177, 177, 177);
    }

    .chat-form {
      display: grid;
      grid-template-columns: repeat(1, 100%);

      .users-wrapper {
        display: none;
      }
      .messages {
        width: 100%;

        .display {
          .display-messages {
            height: 86vh !important;
            margin-bottom:20px;
            margin-left: 0px;
            .user-msg {
              img {
                width: 30px;
                height: 30px;
                margin: 10px 5px;
              }
            }
          }
        }
        .type-area {
          padding: 0px;
          button {
            margin: 0 0 0 5px;
          }

          .button-right {
            margin: 0 5px 0 0;
          }
        }
      }
    }
  }
}

@media only screen and (max-width: 768px) {
 .user-typing {
    position: absolute;
    bottom: 6%;
    left: 44% !important;
    font-size: 12px;
    color: rgb(177, 177, 177);
    }
}


@media only screen and (max-width: 1440px) {

  .user-typing {
    position: absolute;
    bottom: 5%;
    left: 39%;
    font-size: 12px;
    color: rgb(177, 177, 177);
    }
  .main {
    .chat-form {
      .messages {
        .display{
          .display-messages {
            height: 79.4vh;
          }
        }
      }
    }
  }
}

@media only screen and (max-width: 1024px) {

   .user-typing {
    position: absolute;
    bottom: 6%;
    left: 42%;
    font-size: 12px;
    color: rgb(177, 177, 177);
    }
  .main {
    .chat-form {
      .users-wrapper{
        .users {
          height: 80.7vh;
        }
      }
      .messages {
        .display{
          .display-messages {
            height: 77.2vh;
          }
        }
      }
    }
  }
}
</style>
