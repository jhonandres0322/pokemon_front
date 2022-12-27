import App from './App.vue'
import router from './router/index';
import store from './store/index';
import Vue from 'vue'
import axios from 'axios';
import VueAxios from 'vue-axios';
import { BootstrapVue, IconsPlugin, BVToastPlugin } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import validateToken from './interceptor/validate_token';
import protectedRoute from './interceptor/protected_route';

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(BVToastPlugin);
Vue.use(VueAxios, axios);
Vue.config.productionTip = false
Vue.prototype.$apiBaseURL = 'https://pokefavback.herokuapp.com/api';
validateToken();
protectedRoute();


new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
