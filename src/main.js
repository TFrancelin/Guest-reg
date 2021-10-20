import "@babel/polyfill";
import "mutationobserver-shim";
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "./plugins/bootstrap-vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Vuelidate from "vuelidate";

axios.defaults.baseURL = "/api";
Vue.config.productionTip = false;
// Vue.prototype.axios = axios;

Vue.use(VueAxios, axios);
Vue.use(ElementUI);
Vue.use(Vuelidate);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
