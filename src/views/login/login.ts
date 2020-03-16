import Vue from 'vue';
import Login from './index.vue';
import router from '../../router/index';
import { getStorage, setStorage, removeStorage } from '../../utils/storage'
// import './registerServiceWorker'

// import elementUi from '../../elementUI';
import '../../styles/base.styl'
import '../../styles/common.styl'
import initRem from '@/utils/rem';

initRem();

// elementUi()

Vue.prototype.$setStorage = setStorage
Vue.prototype.$getStorage = getStorage
Vue.prototype.$removeStorage = removeStorage
Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(Login)
}).$mount('#app')
