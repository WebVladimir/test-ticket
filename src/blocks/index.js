import Vue from "vue";

import BarTop from "./bar-top/bar-top";
import TicketsBLock from "./tickets/tickets";

// блоки из одного слова должны иметь постфикс block
Vue.component("bar-top", BarTop);
Vue.component("tickets-block", TicketsBLock);
