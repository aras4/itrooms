import ChatRoom from './components/ChatRoom.vue';
import RoomHome from './components/RoomHome.vue';

export default [
    { path: '/', component: RoomHome },
    { path: '/chatroom', component: ChatRoom },
    { path: '*', component: RoomHome }
]

