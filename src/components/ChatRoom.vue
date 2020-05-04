<template>
  <div class="main">
    <div class="topbar">
      <button id="close" @click="closeChat">
        <i class="fas fa-power-off"></i>
      </button>
      <p class="onlineMembers" @click="onlineUsers">
        <i class="fas fa-users"></i>
        <span>{{roomUsers.users.length}}</span>
      </p>
      <p>ITRooms</p>
      <img src="../assets/logo.png" class="logo" />
    </div>
    <div class="code-chat-form">
      <div class="code">
        <prism>{{code}}</prism>
      </div>
      <!--div class="OnlineUsers" v-if="clickOnlineMembers">
        <div
          v-for="(user,index) in roomUsers.users"
          :key="index"
          :class="[index % 2 === 0 ? 'first-user':'second-user']"
        >
          <img src="../assets/pngfuel.com.png" />
          <p>{{user.username}}</p>
        </div>
      </div-->
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
          <!--click to open emojiPicker-->
          <button @click="toggleEmo">
            <i class="far fa-smile"></i>
          </button>
          <!--button>
            <i class="fas fa-paperclip"></i>
          </button-->
          <textarea
            type="text"
            placeholder="Type a message..."
            v-model="message"
            @keyup="typingMessage($event)"
          ></textarea>

          <VEmojiPicker v-if="emoStatus" @select="selectEmoji" />
          <button class="button-right" @click="sendMessage" :disabled="!message">
            <i class="fas fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "prismjs/prism";
import "prismjs/themes/prism.css";
import VEmojiPicker from "v-emoji-picker";
import Prism from "vue-prism-component";
export default {
  name: "ChatRoom",
  components: {
    VEmojiPicker,
    Prism
  },
  props: {},
  data() {
    return {
      messages: [],
      message: "",
      roomUsers: { room: "", users: [] },
      username: "",
      room: "",
      userTypingMsg: "",
      emoStatus: false,
      clickOnlineMembers: false,
      code: "<html><div>Lorem ipsum</div></html>"
    };
  },
  methods: {
    selectEmoji(emoji) {
      this.message += emoji.data;
    },
    onlineUsers() {
      this.clickOnlineMembers = !this.clickOnlineMembers;
    },
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
    toggleEmo() {
      this.emoStatus = !this.emoStatus;
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
    }
  },
  mounted() {
    this.scrollToEndMessages();
  },
  updated() {
    this.scrollToEndMessages();
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
#EmojiPicker {
  position: absolute;
  bottom: 45px;
}
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
    background-color: #27272e;
    overflow: hidden;

    .logo {
      position: absolute;
      top: 3px;
      left: 10px;
      width: 35px;
      margin-left: 5px;
    }

    #close {
      display: block;
      float: right;
      outline: none;
      background-color: #27272e;
      color: rgb(177, 177, 177);
      font-weight: bold;
      border: none;
      font-size: 20px;
      margin: 5px 15px;
      font-family: "Poppins", sans-serif;
    }

    #close:hover {
      color: #e62270;
      cursor: pointer;
    }

    p {
      font-family: "Poppins", sans-serif;
      color: #b1b1b1;
      font-size: 16px;
      margin: 8px;
      text-align: left;
      margin-left: 53px;
    }
  }

  .code-chat-form {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, 60% 40%);
    background-color: white;

    .messages {
      border-left: 1px solid rgb(187, 185, 185);
      background-color: rgb(255, 255, 255);
      font-family: "Poppins", sans-serif;

      .display {
        font-family: "Poppins", sans-serif;

        .display-messages {
          @include custom-scroll-bar;
          overflow-y: scroll;
          height: 79vh;
          padding: 0 0 3.9vh 0.9vh;
        }
      }

      .type-area {
        grid-column: 2 span;
        display: flex;
        flex-direction: row;
        overflow: hidden;
        padding: 0 10px 0 0;
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

        textarea {
          outline: none;
          padding: 10px;
          width: 90%;
          color: black;
          font-family: "Poppins", sans-serif;
          border: none;
          resize: none;
          height: 28px;
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
.onlineMembers {
  float: left;
  margin-top: 5px !important;
  display: none;
  span {
    padding-left: 5px;
    color: rgba(65, 225, 240, 0.8);
  }
}
.OnlineUsers {
  position: fixed;
  width: 50%;
  height: 100vh;
  background: #2c3e50;
  top: 40px;
  left: 0;
  text-align: center;

  .first-user {
    display: flex;
    flex-direction: row;
    padding: 20px;
    background-color: #2c3e50;
    color: rgb(0, 0, 0);
    transition: all 0.1s ease;
    color: white;
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
    background-color: #2c3e50;
    color: white;
  }
  .first-user:hover {
    background-color: rgb(65, 225, 240);
    color: rgb(255, 255, 255);
  }
}

@media only screen and (max-width: 425px) {
  .main {
    .topbar {
      #close {
        float: left;
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
        width: 98%;

        .display {
          .display-messages {
            height: 86vh !important;
            margin-bottom: 20px;
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
  .onlineMembers {
    display: block;
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
        .display {
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
      .users-wrapper {
        .users {
          height: 80.7vh;
        }
      }
      .messages {
        .display {
          .display-messages {
            height: 77.2vh;
          }
        }
      }
    }
  }
}
</style>
