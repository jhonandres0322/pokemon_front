import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersist from 'vuex-persist';

Vue.use(Vuex);

const vuexPersist = new VuexPersist({
    key: 'pokefav',
    storage: window.localStorage
  })

const store = new Vuex.Store({
    state: {
        userLogin: null,
        token: null
    },

    mutations: {
        setToken( state, token ) {
            state.token = token;
        },

        setUserLogin( state, userLogin ) {
            state.userLogin = userLogin;
        }
    },

    actions: {
        logout( { commit } ) {
            commit( 'setToken', null );
            commit( 'setUserLogin', null );
        }
    },

    getters: {
        token: state => state.token,
        userLogin: state => state.userLogin
    },

    plugins: [ vuexPersist.plugin ]
});


export default store;