import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrash} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faTrash)
Vue.component('font-awesome-icon', FontAwesomeIcon)

new Vue({
  el: '#app',
  store,
  router,
  components: {
    App
  },
  template: '<App/>'
});
