import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import routes from './app-routes';
import socketio from 'socket.io-client';
import VueSocketIO from 'vue-socket.io';

//const SocketInstance = socketio('https://it-collaboration-server.herokuapp.com/');
const SocketInstance = socketio('http://localhost:3000');

Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(new VueSocketIO({
  debug: false,
  connection: SocketInstance
}));

const router = new VueRouter({
  routes: routes,
  mode: 'history'
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

