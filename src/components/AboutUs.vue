<template>
  <div>
    <div class="header">
      <nav class="navbar">
        <ul class="nav_links">
          <!-- Delete the unnecessary ones -->
          <li>
            <a href="#" @click="joinAboutUs" id="aboutus-white">About us</a>
          </li>

          

          <!--li>
            <a href="#">Register</a>
          </li-->

          <li>
            <a href="#" @click="joinContactUs">Contact</a>
          </li>
        </ul>
      </nav>
    </div>
    <div class="main">
      <h1 class="h1about">About us</h1>
      <div class="aboutus">
        <p>
          <b>ITRooms</b> is our first chat application.
          For this project, we use popular JavaScript framework called "VueJS".
          The idea was created by a professor
          <a
            href="https://github.com/aras4"
            class="aboutus-links"
            target="_blank"
          >Amir Ramic</a>.
          If you would like to join us please
          <a
            href="#"
            @click="joinContactUs"
            class="aboutus-links"
          >contact us</a>.

        </p>
        Built by Developers:
        <a
          href="https://github.com/djordjeavr"
          class="aboutus-links"
          target="_blank"
        >Djordje Avram</a>,
        <a href="https://github.com/harislapo" class="aboutus-links" target="_blank">Haris Lapo</a>,
        <a
          href="https://github.com/sminela"
          class="aboutus-links"
          target="_blank"
        >Minela Salkicevic</a>,
        <a href="https://github.com/sahaa46" class="aboutus-links" target="_blank">Emin Sahat</a>.
      </div>
      <div class="aboutus">
        Built by Developers:
        <a
          href="https://github.com/djordjeavr"
          class="aboutus-links"
          target="_blank"
        >Djordje Avram</a>,
        <a href="https://github.com/harislapo" class="aboutus-links" target="_blank">Haris Lapo</a>,
        <a
          href="https://github.com/sminela"
          class="aboutus-links"
          target="_blank"
        >Minela Salkicevic</a>,
        <a href="https://github.com/sahaa46" class="aboutus-links" target="_blank">Emin Sahat</a>.
      </div>
      <div class="second">
        <a href="#" @click="joinRoomHome">
          <img src="../assets/logo4.png" title="Home page" id="logo-link" />
        </a>
      </div>
    </div>
    <div class="footer">
      <p>&copy; 2020 All Rights Reserved | Design By ITAcademy Group A</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "AboutUs",
  data() {
    return {};
  },
  methods: {
    joinContactUs() {
      this.$router.push({
        name: "contactus"
      });
    },
    joinAboutUs() {
      this.$router.push({
        name: "aboutus"
      });
    },
    joinRoomHome() {
      this.$router.push({
        name: "roomhome"
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
  font-size: 14px;
  font-family: "Poppins", sans-serif;
  text-decoration: none;
  color: #d9cfce;
  padding: 10px 10px;
  transition: all 0.3 ease 0s;
}

.nav_links li a:hover {
  color: #ffffff;
  background-color: rgba(248, 248, 248, 0.164);
}

#aboutus-white {
  color: #ffffff;
}

.main {
  position: absolute;
  left: 50%;
  top: 25%;
  transform: translate(-50%, -50%);
  width: 70%;
  .aboutus {
    color: #fff;
    font-size: 20px;
    font-family: "Poppins", sans-serif;
    text-align: center;
  }
  .aboutus-links:hover {
    color: rgb(65, 225, 240);
    font-size: 20px;
    font-family: "Poppins", sans-serif;
    text-align: center;
  }
  
  }
  .h1about {
    color: #fff;
    font-size: 50px;
    font-family: "Poppins", sans-serif;
  }
  .homelink {
    float: right;
    margin: 5px 5px;
  }
  .homelink:hover {
    color: #d9cfce;
  }

  #logo-link {
    width: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: 82%;
    top: 170%;
    img {
      width: 40%;
    }
  }

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
  right: 2%;
  width: 100%;
  color: #ffffff;
  font-size: 12px;
  font-family: "Poppins", sans-serif;
  display: flex;

    font-size: 15px;
    justify-content: center;
 
}

/* most mobile phones */
@media only screen and (max-width: 600px) {
  .header {
  
    padding: 6px;
   
  }

 

  .nav_links li {
    margin-right: 4px;
  }

  .main {
    left: 50%;
    top: 40%;
    height:350px;
    p{
     font-size: 12px;
    }
    a{
      font-size: 12px;
    }
   .navbar{
     width:400px;
   }

    
    
  }
  .footer {
    font-size: 12px;
    justify-content: center;
  }
}

/* most tablets and laptops*/
@media only screen and(min-width:1024px) and (max-width: 1200px) {
  li,
  a {
    font-size: 15px;
  }

  .main {
    left: 50%;
    top: 40%;

    
    
  }
  .footer {
    font-size: 15px;
    justify-content: center;
  }
}
@media only screen and(min-width:768px) and (max-width: 980px) {

 .main {
    left: 50%;
    top: 40%;
    
  } 
  .footer {
    font-size: 15px;
    justify-content: center;
  }
}
</style>