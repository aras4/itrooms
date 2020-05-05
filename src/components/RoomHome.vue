<template>
  <div>
    <div class="header">
      <div class="logo">
        <img src="../assets/logo.png">
        <span>ITRooms</span>
      </div>

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
        <div class="login">
          <h1>ITRooms</h1>
          <div class="input-fields">
            <input type="text" v-model="username" placeholder="Username" />
          </div>
          <div class="input-fields">
            <input type="text" v-model="room" placeholder="Room" />
          </div>
          <div class="validation-msg">
            <p>{{validationMsg}}</p>
          </div>
          <div class="button-field">
            <button class="join-btn" @click="joinRoom">JOIN</button>
            <button class="create-btn" @click="joinRoom">CREATE</button>
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
  
  .logo {
    position: absolute;
    top: 2%;
    left: 2%;
    img {
    width: 40px;
    border-radius: 50%;
    }
    span{
      color: #d9cfce;
      font-family: "Poppins", sans-serif;
    }
  }
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
    border-radius: 10px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding: 70px;

    .login {
      width: 40%;
      margin: 70px 40px 0 20px;
      h1 {
        text-align: center;
        font-family: "Poppins", sans-serif;
        letter-spacing: 2px;
        font-size: 40px;
        color: #dadada;
      }

      .input-fields {
        display: flex;
        flex-direction: row;
        background-color: rgba(230, 230, 230, 0.219);
        border-radius: 30px;
        margin-bottom: 10px;
        height: 50px;

        input {
          padding: 15px;
          color: white;
          border: none;
          outline: none;
          background-color: rgba(230, 230, 230, 0);
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

      .login-form {
        .login {
          h1 {
            font-size: 34px;
          }
        }
      }
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
    display:none;
  }
}

/* scaling for smaller phones than usual */
@media screen and (max-width: 425px) {
  
  li,
  a {
    font-size: 9px;
  }

  .footer {
    font-size: 9px;
  }
}
</style>