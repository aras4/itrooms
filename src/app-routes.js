import ChatRoom from './components/ChatRoom.vue';
import RoomHome from './components/RoomHome.vue';

export default [
    { path: '/', name: 'roomhome', component: RoomHome },
    { path: '/chatroom/:room/:username', name: 'chatroom', component: ChatRoom },
    { path: '*', redirect: '/', component: RoomHome }
]

