<template>
  <div class="main">
    <div class="topbar">
      <button id="close" @click="closeChat">
        <i class="fas fa-power-off"></i>
      </button>
      <p>ITRooms</p>
      <img src="../assets/logo.png" class="logo" />
    </div>
    <div class="code-chat-form">
      <div class="code">
        <div class="code-title">
          <p>Share your code</p>
        </div>
        <prism-editor
          @change="shareCode"
          :lineNumbers="true"
          :autoStyleLineNumbers="true"
          v-model="code"
          language="js"
        ></prism-editor>
      </div>
      <div class="messages">
        <div class="room-name">
          <div class="onlineMembers" @click="onlineUsers">
            <i class="fas fa-users"></i>
            <span>{{roomUsers.users.length}}</span>
          </div>
          <p>Room: {{roomUsers.room}}</p>
        </div>
        <div class="display">
          <div class="OnlineUsers" v-if="clickOnlineMembers">
            <div
              v-for="(user,index) in roomUsers.users"
              :key="index"
              :class="[index % 2 === 0 ? 'first-user':'second-user']"
            >
              <img src="../assets/pngfuel.com.png" />
              <p>{{user.username}}</p>
            </div>
          </div>
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
          <input
            type="text"
            placeholder="Type a message..."
            v-model="message"
            @keyup="typingMessage($event)"
          />

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
import axios from "axios";
import VEmojiPicker from "v-emoji-picker";
import "prismjs";
import "prismjs/themes/prism.css";
import "vue-prism-editor/dist/VuePrismEditor.css";
import PrismEditor from "vue-prism-editor";

export default {
  name: "ChatRoom",
  components: {
    VEmojiPicker,
    PrismEditor
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
      code: ""
    };
  },
  methods: {
    preventEnter(e) {
      return e.keyCode !== 13;
    },
    getShareCode() {
      axios(
        `https://it-collaboration-server.herokuapp.com/getShareCode/${this.room}`
      )
        .then(response => {
          this.code = response.data;
        })
        .catch(err => console.error(err));
    },
    shareCode() {
      this.$socket.emit("shareCode", {
        room: this.room,
        code: this.code
      });
    },
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
    shareCode(data) {
      this.code = data.code;
    },
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
    this.getShareCode();
  }
};
</script>

<style lang="scss" >
.prism-editor__line-numbers {
  background-color: rgba(65, 225, 240, 0.8) !important;
  padding-right: 5px;
  border-right: 1px solid #27272e;
  .token {
    color: #27272e;
  }
}

.prism-editor-wrapper {
  height: 89vh;
}
.prism-editor-wrapper pre {
  background-color: #f8f8f8 !important;
}

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
  left: 63%;
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
      font-size: 18px;
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
    height: 94.7vh;

    .code {
      height: 94vh;
      .code-title {
        background-color: #27272ef3;
        padding: 10px;

        p {
          font-family: "Poppins", sans-serif;
          color: #b1b1b1;
          text-align: left;
          margin: 0px;
          margin-left: 3%;
        }
      }
    }

    .messages {
      border-left: 1px solid rgb(187, 185, 185);
      background-color: rgb(255, 255, 255);
      font-family: "Poppins", sans-serif;

      .room-name {
        background-color: #27272ef3;
        padding: 10px;

        p {
          font-family: "Poppins", sans-serif;
          color: #b1b1b1;
          text-align: right;
          margin: 0px;
          margin-right: 5%;
        }
      }

      .display {
        font-family: "Poppins", sans-serif;

        .display-messages {
          @include custom-scroll-bar;
          overflow-y: scroll;
          height: 78.8vh;
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
      background-color: #27272e;
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
  @include custom-scroll-bar;
  overflow-y: scroll;
  float: left;
  color: rgb(187, 185, 185);
  margin-left: 4%;

  span {
    padding-left: 5px;
    color: rgba(65, 225, 240, 0.8);
  }
}
.OnlineUsers {
  position: absolute;
  width: 30%;
  height: 82.6vh;
  background-color: rgb(248, 248, 248);
  text-align: center;
  border-right: 1px solid rgb(187, 185, 185);
  z-index: 1;

  .first-user {
    display: flex;
    flex-direction: row;
    padding: 15px;
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
    background-color: rgb(238, 238, 238);
    color: black;
  }
  .first-user:hover {
    background-color: rgb(65, 225, 240);
    color: rgb(255, 255, 255);
  }
}

@media only screen and (max-width: 425px) {
  .main {
    .OnlineUsers {
      width: 100% !important;
      border: none;
      height: 82.6vh !important;
    }

    .user-typing {
      position: absolute;
      bottom: 5%;
      left: 8% !important;
      font-size: 12px;
      color: rgb(177, 177, 177);
    }

    .code-chat-form {
      display: grid;
      grid-template-columns: repeat(1, 100%);
      height: 94vh !important;

      .code {
        display: none;
      }

      .messages {
        width: 100%;
        border: none;

        .room-name {
          padding: 5px;
          p {
            text-align: right;
            font-size: 14px;
            margin-right: 5%;
          }
        }

        .display {
          .display-messages {
            height: 75.9vh !important;
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
}

@media only screen and (max-width: 768px) {
  .user-typing {
    position: absolute;
    bottom: 4%;
    left: 5% !important;
    font-size: 12px;
    color: rgb(177, 177, 177);
  }

  .code-chat-form {
    display: grid;
    grid-template-columns: repeat(1, 100%) !important;
    .code {
      display: none;
    }

    .messages {
      border: none !important;
    }

    .OnlineUsers {
      width: 50%;
    }
  }
}

@media only screen and (max-width: 1024px) {
  .user-typing {
    position: absolute;
    bottom: 6%;
    left: 63%;
    font-size: 12px;
    color: rgb(177, 177, 177);
  }

  .prism-editor-wrapper {
    height: 87.6vh !important;
  }
  .main {
    .code-chat-form {
      height: 94vh;
      .messages {
        .display {
          .OnlineUsers {
            height: 80.6vh;

            .first-user {
              img {
                height: 40px;
              }
              p {
                font-size: 14px !important;
              }
            }
          }
          .display-messages {
            height: 76.7vh;
          }
        }
      }
    }
  }
}
</style>
