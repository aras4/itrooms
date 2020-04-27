<template>
  <div class="hello">
    <h1>{{ msg }} sto je ovo dobro ovo sljaka</h1>
    <div v-for="(message,index) in messages" :key="index">{{message.username}} - {{message.text}}</div>

    <input v-model="message" @keyup.enter="sendMessage" />
    <button @click="sendMessage">Send</button>

    <textarea @keyup.enter="shareCode" v-model="shareText" cols="30" rows="10"></textarea>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ChatRoom",
  props: {
    msg: String
  },
  data() {
    return {
      messages: [],
      message: "",
      shareText: ""
    };
  },
  methods: {
    sendMessage() {
      this.$socket.emit("chatMessage", this.message);
      this.message = "";
    },
    shareCode() {
      axios
        .post(`http://localhost:3000/api/v1/share-code`, {
          shareText: this.shareText
        })
        .then(() => {})
        .catch(e => {
          console.error(e);
        });
    }
  },
  sockets: {
    message(data) {
      console.log(data);
      this.messages.push(data);
    }
  },
  created() {
    // const { room } = this.$route.query;
    var channel = this.$pusher.subscribe("room-channel");
    console.log(channel);
    channel.bind("share-code", data => {
      this.shareText = data.shareText;
      console.log(data);
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
