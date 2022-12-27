import Vue from 'vue';
import VueRouter from 'vue-router';
import LoginPage from '../pages/LoginPage.vue';
import RegisterPage from '../pages/RegisterPage.vue';
import MainPage from '../pages/MainPage.vue';
import FavoritePage from '../pages/FavoritePage.vue';
import EditProfilePage from '../pages/EditProfilePage.vue';


Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Login',
        component: LoginPage
    },
    {
        path: '/register',
        name: 'Register',
        component: RegisterPage
    },
    {
        path: '/home',
        name: 'Home',
        component: MainPage
    },
    {
        path: '/favorite',
        name: 'Favorite',
        component: FavoritePage
    },
    {
        path: '/edit-profile',
        name: 'EditProfile',
        component: EditProfilePage
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
});

export default router;