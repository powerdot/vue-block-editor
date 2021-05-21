import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false;


function getTitle (vm) {
  const { title } = vm.$options
  if (title) {
    return typeof title === 'function'
      ? title.call(vm)
      : title
  }
}
Vue.mixin({
  created () {
    const title = getTitle(this)
    if (title) {
      document.title = title
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
