import Vue from "vue";
import App from "./App.vue";

new Vue({
  el: "#app",
//   render(createElement) {
//       return createElement(App)
//   },
//   render: (h) => {
//       return h(App)
//   },
  render: h => h(App)
});
