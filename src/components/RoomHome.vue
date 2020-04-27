<template>
  <div>
    Join Chat Room
    <div>
      <input type="text" placeholder="Username" v-model="username" />
      <button @click="joinRoom">Join</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "RoomHome",
  data() {
    return {
      username: ""
    };
  },
  methods: {
    joinRoom() {
      this.$socket.emit("joinRoom", { username: this.username, room: "js" });
      this.$router.push({
        path: "chatroom",
        query: { room: "js" }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>