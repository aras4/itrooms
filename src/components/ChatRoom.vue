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
    }
  },
  sockets: {
    message(data) {
      console.log(data);
      this.messages.push(data);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
