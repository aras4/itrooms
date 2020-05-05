<template>
  <div>
    <div class="header">
      <div class="hamburger-menu">
        <input type="checkbox" class="toggler" @click="openMenu" />
        <div class="hamburger"><div></div></div>
        <div class="menu" v-if="isOpen">
          <div class="nav">
          <ul>
          <li>
            <a href="#" @click="joinAboutUs">About us</a>
          </li>
          <li>
            <a href="#">Register</a>
          </li>
          <li>
            <a href="#">Contact</a>
          </li>
          </ul>
        </div>
        </div>
      </div>
      <nav class="navbar">
        <ul class="nav_links">
          <!-- Delete the unnecessary ones -->
          <li>
            <a href="#" @click="joinAboutUs">About us</a>
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
    <div class="main" v-if="!isOpen" >
      <div class="login-form">
        <img src="../assets/logo4.png">
        <div class="login">
          <div class="input-fields">
            <i class="fas fa-user"></i><input type="text" v-model="username" placeholder="Username" />
          </div>
          <div class="input-fields">
            <i class="fas fa-hotel"></i><input type="text" v-model="room" placeholder="Room" />
          </div>
          <div class="validation-msg">
            <p>{{validationMsg}}</p>
          </div>
          <div class="button-field">
            <button class="join-btn" @click="joinRoom">JOIN</button>
            <!--button class="create-btn" @click="joinRoom">CREATE</button-->
            <p id="new-room">CREATE NEW ROOM</p>
            <p id="help">NEED HELP?</p>
          </div>
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
      room: "",
      validationMsg: "",
      isOpen: false
    };
  },
  methods: {
    isEmpty(str) {
      return !str || 0 === str.length;
    },
    joinRoom() {
      this.validationMsg = "";
      if (this.isEmpty(this.username) || this.isEmpty(this.room)) {
        this.validationMsg = "You need to fill required fields";
        return;
      }
      this.$router.push({
        name: "chatroom",
        params: { username: this.username, room: this.room || "js" }
      });
    },
    joinAboutUs() {
      this.$router.push("aboutus");
    },
    openMenu() {
      this.isOpen = !this.isOpen;
    }
  }
};
</script>

<style lang="scss" scoped>

.hamburger-menu {
  display: none;
}

.toggler {
  position: absolute;
  top: 2%;
  right: 5%;
  z-index: 2;
  cursor: pointer;
  width: 30px;
  height: 30px;
  opacity: 0;
}

.hamburger {
  position: absolute;
  top: 2%;
  right: 5%;
  z-index: 1;
  width: 30px;
  height: 30px;
  padding: 3px;

  div {
    position: relative;
    top: 19px;
    width: 100%;
    height: 2px;
    flex: none;
    background: #dadada;
    align-items: center;
    transition: all 0.4s ease;
  }
  div::before,
  div::after {
    content: '';
    position: absolute;
    z-index: 1;
    top: -10px;
    left: 0px;
    width: 100%;
    height: 2px;
    background-color: #dadada;
  }
  div::after {
    top: 10px;
  }
}
.toggler:checked + .hamburger div {
  transform: rotate(135deg);
}
/* Turns Lines Into X */
.toggler:checked + .hamburger div:before,
.toggler:checked + .hamburger div:after {
  top: 0;
  transform: rotate(90deg);
}

.menu {
  position: absolute;
  top: 10%;
  left:0px;
  z-index: 1;
  width: 100%;
  height: 80vh;
  background-color:#0f151700;

  .nav {
    ul {
      list-style: none;
      margin: 0px;
      padding: 0px;
      li{
        text-align: center;
        padding: 20px;
        a{
          font-size: 20px;
          text-decoration: none;
          color: #dadada;
          font-family: "Poppins", sans-serif;
        }
      }
    }
  }
  .nav ul li a:hover {
    color: #ffffff;
  }
  .nav ul li:hover {
    background-color:rgba(248, 248, 248, 0.164);
  }
}

.validation-msg{
  color: rgba(255, 0, 0, 0.527);
}
.header {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 10px 5%;
}
.nav_links {
  list-style: none;
}
.nav_links li {
  display: inline-block;
  padding: 0px;
  margin-right: 5px;
}

.nav_links li a {
  font-size: 18px;
  font-family: "Poppins", sans-serif;
   text-decoration: none;
  color: #d9cfce;
  padding: 10px 15px;
  transition: all 0.3 ease 0s;
}

.nav_links li a:hover {
  color: #ffffff;
  background-color:rgba(248, 248, 248, 0.164);
}

.main {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 70%;

  .login-form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    padding: 50px;

    img {
      width: 150px;
      height: 150px;
      margin: auto;
      margin-bottom: 40px;
      border-radius: 30px;
    }

    .login {
      width: 50%;
      margin: auto;

      .input-fields {
        display: flex;
        flex-direction: row;
        background-color: rgba(230, 230, 230, 0.219);
        border-radius: 30px;
        height: 50px;
        width: 100%;
        color: white;
        margin-bottom: 10px;

        svg{
         margin:16px;
         margin-left: 30px;
        }

        input {
          padding: 10px;
          color: white;
          border: none;
          outline: none;
          background-color: rgba(230, 230, 230, 0);
          border-radius: 30px;
          font-family: "Poppins", sans-serif;
          width: 70%;
        }
      }

      .button-field {
        button {
          padding: 15px;
          border: none;
          outline: none;
          border-radius: 30px;
          margin: 15px 5px 30px 0px;
          width: 100%;
          color: white;
          font-family: "Poppins", sans-serif;
          height: 50px;
          cursor: pointer;
          font-weight: 400;
          letter-spacing: 1px;
          transition: all 0.2 ease;
        }

        .join-btn {
          background-color: rgba(65, 225, 240, 0.8);
        }

        .join-btn:hover {
          background-color:rgb(65, 225, 240);
        }

        #new-room {
          float: left;
          color:white;
          font-family: "Poppins", sans-serif;
          margin-left: 10px;
          font-weight: bold;
          cursor: pointer;
        }

        #new-room:hover {
          color: rgb(65, 225, 240);
        }

        #help {
          float: right;
          color: white;
          font-family: "Poppins", sans-serif;
          margin-right: 10px;
          cursor: pointer;
        }

        #help:hover {
          color: #d9cfce;
        }

        /*.create-btn {
          background-color: rgb(26, 149, 237);
        }

        .create-btn:hover {
          background-color: rgb(52, 160, 237);
        }*/
      }
    }
  }
}
.footer {
  position: absolute;
  bottom: 0;
  right: 2%;
  width: 100%;
  color: #ffffff;
  font-size: 12px;
  display: flex;
  justify-content: flex-end;
}

@media only screen and (max-width: 1024px) {
    .nav_links li a {
      font-size: 16px;
    }
    .main {
      width: 80%;
    }
}

@media only screen and (max-width: 768px) {
  .hamburger-menu {
  display: block;
  }
  .header {
    padding: 10px;
    margin-right: 10px;
  }
  .nav_links {
    display: none;
  }

  .main {

    .login-form {
      padding: 5px;

      .login {
        width: 70%;

        .input-fields {
          margin-top: 20px;

          input {
           
          }
        }

        .button-field {
          button {
            font-size: 14px;
            margin: 15px 3px 0px 0px;
            letter-spacing: 2px;
          }
        }
      }
    }
  }
  .footer {
    display:none;
  }
}

/* scaling for smaller phones than usual */
@media screen and (max-width: 425px) {
  #help {
    float: left !important;
    margin-left: 10px;
  }
}
</style>