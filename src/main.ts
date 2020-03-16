import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import validator from './utils/validator'
import { getStorage, setStorage, removeStorage } from './utils/storage'
// import './registerServiceWorker'

import './styles/base.styl'
import './styles/common.styl'
import { storageName } from './config/config'
import { dispatchSetLoginUser } from './store/dispatches'
import iniRem from './utils/rem'

Vue.prototype.$validator = validator
Vue.prototype.$setStorage = setStorage
Vue.prototype.$getStorage = getStorage
Vue.prototype.$removeStorage = removeStorage
Vue.config.productionTip = false

// rem适配
iniRem();

function init() {
  const loginUser = getStorage(storageName);
  const host = window.location.host;
  const path = window.location.pathname;
  const protocol = window.location.protocol;
  if (!loginUser) {
    window.location.href = `${protocol}//${host}${path}login.html`;
  } else {
    dispatchSetLoginUser(loginUser);
    new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
}
init();