import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        bunker: {},
        serverTime: null,
    },
    mutations: {
        setBunker(state, bunker) {
            state.bunker = bunker;
        },
        setServerTime(state, time) {
            state.serverTime = time;
        },
    },
});
