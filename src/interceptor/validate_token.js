import axios from 'axios';
import store from '../store/index';

export default function setup() {

    axios.interceptors.request.use(function(config) {
        const token = store.getters.token;
        config.headers.set('Accept', 'application/json');
        config.headers.set('Access-Control-Allow-Origin', '*');
        if(token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }, function(err) {
        return Promise.reject(err);
    });
}