import login from "@/views/auth/login.vue";
import registration from "@/views/auth/registration.vue";
import index from "@/views/posts/index.vue";

import middleware from './middleware';

export default [
    {
        path: '/login',
        name: 'login',
        component: login,
        beforeEnter: middleware.guest,
    },
    {
        path: '/registration',
        name: 'registration',
        component: registration,
        beforeEnter: middleware.guest,
    },
    {
        path: '/posts',
        name: 'posts',
        component: index,
        beforeEnter: middleware.user
    },
];
