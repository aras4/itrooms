import ChatRoom from './components/ChatRoom.vue';
import RoomHome from './components/RoomHome.vue';
import AboutUs from './components/AboutUs.vue';
import ContactUs from './components/ContactUs.vue';

export default [
    { path: '/', name: 'roomhome', component: RoomHome },
    { path: '/chatroom/:room/:username', name: 'chatroom', component: ChatRoom },
    { path: '/aboutus', name: 'aboutus', component: AboutUs },
    { path: '/contactus', name: 'contactus', component: ContactUs },
    { path: '*', redirect: '/', component: RoomHome }
]

