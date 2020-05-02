<template>
  <div>
    <div class="header">
      <nav class="navbar">
        <ul class="nav_links">
          <!-- Delete the unnecessary ones -->
          <li>
            <a href="#">About us</a>
          </li>
          <li>
            <a href="#">Register</a>
          </li>
          <li>
            <a href="#">Contact</a>
          </li>
        </ul>
      </nav>
    </div>
    <div class="main">
      <div class="login-form">
        <!--         <div class="login-img">
          <img src="../assets/login.png" />
        </div>-->
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
            <button class="create-btn">CREATE</button>
          </div>
          <!--p id="create-acc">
            <a href="#">Create your Account &rarr;</a>
          </p-->
        </div>
      </div>
    </div>
    <div class="footer">
      <p>&copy; 2020 All Rights Reserved | Design By ITAcademy Group A</p>
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
        name: "chatroom",
        params: { username: this.username, room: "js" }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 5px 7%;
}
li,
a {
  font-family: "Poppins", sans-serif;
  color: #ffffff;
  text-decoration: none;
}
.nav_links {
  list-style: none;
}
.nav_links li {
  display: inline-block;
  padding: 0px 20px;
}

.nav_links li a {
  transition: all 0.3 ease 0s;
}

.nav_links li a:hover {
  color: #d9cfce;
}

.main {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 70%;
  .login-form {
    border-radius: 10px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding: 70px;
    /*     .login-img {
      width: 50%;
      display: flex;
      justify-content: center;
      align-items: center;

      img {
        width: 40%;
      }
    } */

    .login {
      width: 40%;
      margin: 70px 40px 0 20px;
      h1 {
        text-align: center;
        font-family: "Poppins", sans-serif;
        letter-spacing: 2px;
        font-size: 50px;
        color: #000000;
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
          font-weight: 400;
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
    }
  }
}
.footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  color: #ffffff;
  font-size: 20px;
  display: flex;
  justify-content: flex-end;
}

/* most mobile phones */
@media only screen and (max-width: 600px) {
  .header {
    display: inline-block;
    padding: 6px;
  }

  li,
  a {
    font-size: 12px;
  }

  .nav_links li {
    margin-right: 14px;
  }

  .main {
    left: 42%;
    top: 40%;

    .login-form {
      padding: 5px;

      .login {
        width: 70%;
        margin: 100px 0px 0px 70px;
        h1 {
          font-size: 40px;
        }

        .input-fields {
          margin-top: 20px;

          input {
            text-align: center;
          }
        }

        .button-field {
          button {
            font-size: 11px;
            margin: 15px 3px 0px 0px;
            width: 45%;
            letter-spacing: 2px;
          }
        }
      }
    }
  }
  .footer {
    font-size: 13px;
    justify-content: center;
  }
}

/* most tablets and laptops*/
@media only screen and (max-width: 1200px) {
  li,
  a {
    font-size: 15px;
  }

  .main {
    left: 42%;
    top: 40%;

    .login-form {
      padding: 3px;

      .login {
        width: 50%;
        margin: 100px 0px 0px 70px;

        .input-fields {
          margin-top: 20px;

          input {
            text-align: center;
          }
        }

        .button-field {
          button {
            font-size: 13px;
            margin: 15px 3px 0px 0px;
            width: 40%;
            letter-spacing: 2px;
          }
        }
      }
    }
  }
  .footer {
    font-size: 15px;
    justify-content: center;
  }
}

/* scaling for smaller phones than usual */
@media screen and (max-width: 365px) {
  li,
  a {
    font-size: 11px;
  }

  .footer {
    font-size: 11px;
  }
}
</style>