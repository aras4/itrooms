<template>
  <div>
    <div
      class="messages"
      v-for="(message,index) in messages"
      :key="index"
    >{{message.username}} - {{message.text}}</div>

    <input v-model="message" @keyup.enter="sendMessage" />
    <button @click="sendMessage">Send</button>
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
      this.messages.push(data);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.messages {
  color: white;
  font-size: 14px;
}
</style>
