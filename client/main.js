import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import store from './store';

Vue.use(ElementUI);

Vue.filter('capitalize', (value) => {
  if (!value) return '';
  value = value.toString();
  return value.charAt(0).toUpperCase() + value.slice(1);
});

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  store,
  render: h => h(App),
});
