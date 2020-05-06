<template>
  <div>
    <div class="header">
      <nav class="navbar">
        <ul class="nav_links">
          <!-- Delete the unnecessary ones -->
          <li>
            <a href="#">Contact</a>
          </li>

          

          <!--li>
            <a href="#">Register</a>
          </li-->

          <li>
            <a href="#" @click="joinRoomHome">Home Page</a>
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
          The idea was created by a professor <a href="https://github.com/aras4" class="aboutus-links" target="_blank">Amir Ramic</a>.
          If you would like to join us please contact us.
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

.main {
  position: absolute;
  left: 50%;
  top: 30%;
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

    padding: 20px;
    font-size: 20px;

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