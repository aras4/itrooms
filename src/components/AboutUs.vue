<template>
  <div>
    <div class="header">
      <nav class="navbar">
        <ul class="nav_links">
          <!-- Delete the unnecessary ones -->
          <li>
            <a href="#">Contact</a>
          </li>
          <li>
            <a href="#">Register</a>
          </li>
          <li>
            <a class="homelink" href="#" @click="joinRoomHome">Home page</a>
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
          The idea was created by a professor Amir Ramic.
          If you would like to join us please contact us.
        </p>
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
    return {
      username: "",
      room: "",
      validationMsg: ""
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
  padding: 5px ;
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
  .aboutus {
    background-color: #d9cfce;
    color: #000000;
    padding: 20px;
    font-size: 18px;
    border-radius: 30px;
  }
  .h1about {
    color: #000000;
    font-size: 50px;
   
   
  }
  .homelink {
    float: right;
    margin: 5px 5px;
  }
  .homelink:hover {
    color: #d9cfce;
  }

  .login-form {
    border-radius: 10px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding: 70px;
    

    
  }
}
.footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  color: #ffffff;
  font-size: 14px;
 text-align: center;
}


@media only screen and (max-width: 600px) {
 
.nav_links {
  padding-left:0;

  a{
    font-size:12px;
  }
}
.footer{
  font-size:10px;
}
.main{
  left:50%;
  width:100%;
  
}
  
 
  }
</style>