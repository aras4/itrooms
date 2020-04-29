<template>
  <div>
    <div class="main">
      <div class="login-form">
        <div class="login-img">
          <img src="../assets/login.png" />
        </div>
        <div class="login">
          <h1>ITRooms</h1>
          <div class="input-fields">
            <!--ion-icon name="mail-outline"></ion-icon-->
            <input type="text" v-model="username" placeholder="Username" />
          </div>
          <div class="input-fields">
            <!--ion-icon name="key-outline"></ion-icon-->
            <input type="text" v-model="room" placeholder="Room" />
          </div>
          <div class="button-field">
            <button class="join-btn" @click="joinRoom">JOIN</button>
            <button class="create-btn">CREATE ROOM</button>
            <p>
              <a href="#">Forgot Username / Password?</a>
            </p>
          </div>
          <p id="create-acc">
            <a href="#">Create your Account &rarr;</a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RoomHome",
  data() {
    return {
      username: "",
      room: ""
    };
  },
  methods: {
    joinRoom() {
      this.$router.push({
        path: "chatroom",
        query: { username: this.username, room: "js" }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.main {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 90px;

  .login-form {
    background-color: white;
    border-radius: 10px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding: 50px;
    width: 70%;

    .login-img {
      width: 50%;
      display: flex;
      justify-content: center;
      align-items: center;

      img {
        width: 40%;
      }
    }

    .login {
      width: 40%;
      margin: 70px 40px 0 20px;
      h1 {
        text-align: center;
      }

      .input-fields {
        display: flex;
        flex-direction: row;
        background-color: rgb(230, 230, 230);
        border-radius: 30px;
        margin-bottom: 10px;
        height: 50px;

        input {
          padding: 15px;
          border: none;
          outline: none;
          background-color: rgb(230, 230, 230);
          margin: 5px;
          width: 90%;
          border-radius: 30px;
          font-family: "Poppins", sans-serif;
        }
      }

      .button-field {
        button {
          padding: 15px;
          border: none;
          outline: none;
          border-radius: 30px;
          margin: 15px 5px 3px 0px;
          width: 35%;
          color: white;
          font-family: "Poppins", sans-serif;
          height: 50px;
          cursor: pointer;
          font-weight: bold;
          letter-spacing: 1px;
          transition: all 0.2 ease;
        }

        .join-btn {
          background-color: rgb(82, 187, 82);
        }

        .join-btn:hover {
          background-color: #4caf50;
        }

        .create-btn {
          background-color: rgb(26, 149, 237);
        }

        .create-btn:hover {
          background-color: rgb(52, 160, 237);
        }

        p {
          text-align: center;

          a {
            color: rgb(197, 197, 197);
            font-size: 14px;
            text-decoration: none;
          }
          a:hover {
            color: rgb(168, 168, 168);
          }
        }
      }
      #create-acc {
        font-size: 14px;
        text-align: center;
        margin: 100px 0 0 0;

        a {
          color: rgb(197, 197, 197);
          text-decoration: none;
        }

        a:hover {
          color: rgb(168, 168, 168);
        }
      }
    }
  }
}
</style>