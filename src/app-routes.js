import ChatRoom from './components/ChatRoom.vue';
import RoomHome from './components/RoomHome.vue';
import AboutUs from './components/AboutUs.vue';

export default [
    { path: '/', name: 'roomhome', component: RoomHome },
    { path: '/chatroom/:room/:username', name: 'chatroom', component: ChatRoom },
    { path: '/aboutus', name: 'aboutus', component: AboutUs },
    { path: '*', redirect: '/', component: RoomHome }
]

