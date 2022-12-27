import router from '../router/index';
import store from '../store/index';

export default function setup() {
    router.beforeEach((to, from, next) => {
        if( to.path != '/' && to.path != '/register' && !store.getters.token) {
            next('/');
        } else {
            next();
        }
    })
}