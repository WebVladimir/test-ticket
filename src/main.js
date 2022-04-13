import "core-js/es/object/entries";

import "./styles/main.less";

import "./blocks";
import "./layouts";
import "./mixins/global";
import Vue from "vue";
import store from "./store";
import App from "./App";
import { clone } from "./tools";

store.commit("setBunker", clone(window.BUNKER));
store.commit("setServerTime", window.SERVER_TIME);

Vue.config.productionTip = false;

new Vue({
    el: "#app",
    store,
    render: h => h(App)
});
