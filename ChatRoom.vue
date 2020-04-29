<template>
    <div class="main">
        <div class="chat-form">
            <div class="users-wrapper">
                <h3>Chat users:</h3>
                <div class="users">
                  <div v-for="(user,index) in roomUsers.users" :key="index" class="one-user" >
                    <img src="../assets/user_avatar_2.png">
                    <p>{{user.username}}</p>                    
                  </div>
                </div>
            </div>
            <div class="messages">
              <h3>{{roomUsers.room}}</h3>
                <div class="display">
                  <div class="display-messages">
                    <div class="user-msg" v-for="(message,index) in messages" :key="index">
                      <img src="../assets/user_avatar_2.png">
                      <div class="user-msg-time">
                        <div class="msg">
                          <p>{{message.text}}</p>
                        </div>
                        <span class="username-time">{{message.username}}, {{message.time}}</span>
                      </div>
                    </div>
                  </div>
                  <div class="type-area">
                    <input type="text" placeholder="Type a message..." v-model="message" @keyup.enter="sendMessage"/>
                    <button @click="sendMessage">Send</button>
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
      roomUsers: { room: "", users: [] }
    };
  },
  methods: {
    sendMessage() {
      this.$socket.emit("chatMessage", this.message);
      console.log(this.$socket);

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
    message(data) {
      this.messages.push(data);
    },
    roomUsers(data) {
      this.roomUsers = data;
    }
  },
  created() {
    const { room, username } = this.$route.query;
    this.$socket.emit("joinRoom", { username: username, room: room });
  }
};
</script>

<style lang="scss" scoped>

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
    display: flex;
    justify-content: center;
    align-items: center;
    height: 700px;
    padding: 30px;

    .chat-form {
      width: 80%;
      display: grid;
      grid-template-columns: repeat(3, 33.33%);
      border-radius: 20px;
      height: 700px;
        
        .users-wrapper {
          background-color: rgb(66, 64, 64);
          padding: 30px;
          border-top-left-radius: 20px;
          border-bottom-left-radius: 20px;
          font-family: 'Poppins', sans-serif;

            h3 {
              text-align: left;
              margin: 5px;
              margin-bottom: 10px;
              color: white;
            }

            .users {
              @include custom-scroll-bar;
              overflow: auto;
              height: 620px;
              border-top: 1px solid  rgb(187, 185, 185);
              display: flex;
              flex-direction: column;

              .one-user {
                display: flex;
                flex-direction: row;
                margin: 10px;
                border-bottom: 1px solid  rgb(187, 185, 185);

                img {
                  height: 40px;
                  margin: 5px; 
                }

                p {
                  color: white;
                  font-size: 16px;
                  margin: 5px;
                  padding: 7px;
                }
              }
            } 
        }

        .messages {
            grid-column: 2 span;
            background-color: rgb(228, 228, 228);
            border-top-right-radius: 20px;
            border-bottom-right-radius: 20px;
            padding: 15px;
            font-family: 'Poppins', sans-serif;

            h3 {
              text-align: left;
              margin: 10px 10px 0px 10px;
              color: white;
              padding: 10px;
            }

            .display { 
                height: 600px;
                font-family: 'Poppins', sans-serif;

                .display-messages {
                  @include custom-scroll-bar;
                  overflow: auto;
                  height: 550px;
                  border-bottom: 1px solid  rgb(187, 185, 185);
                  border-top: 1px solid  rgb(187, 185, 185);

                  .user-msg {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    margin-top: 5px;

                    .user-msg-time {
                      display: flex;
                      flex-direction: column;

                      .msg {
                        background-color:white;
                        border-radius: 10px;
                        margin: 5px;
                        margin-bottom: 0px;
                        border: 1px solid rgb(179, 179, 179);

                      p{
                        margin: 8px;
                        color: rgb(0, 0, 0);
                        font-size: 12px;
                      }
                    }

                      .username-time {
                        font-size: 10px;
                        color:rgb(187, 185, 185);
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
                
                  }
                .type-area {
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                    padding: 10px;
                    margin: 10px; 
                    width: 90%;          
    
                    input {
                        background-color: white;
                        border: 1px solid rgb(179, 179, 179);
                        border-radius: 20px;
                        padding: 12px;
                        outline: none;
                        margin: 5px;
                        width: 70%;
                        font-family: 'Poppins', sans-serif;
                        font-size: 12px;
                    }
                    
                    button {
                        border: 1px solid rgb(179, 179, 179);
                        border-radius: 20px;
                        padding: 10px;
                        outline: none;
                        margin: 5px;
                        width: 15%;
                        background-color: rgb(146, 15, 146);
                        color: white;
                        font-weight: bold;
                        font-family: 'Poppins', sans-serif;
                        letter-spacing: 1px;
                        transition: all 0.2s ease;
                    }
    
                    button:hover {
                        background-color: rgb(97, 11, 97);
                    }
                }
            }

            
        }
    }
}
</style>

