import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import store from "./store";
import Toast from "./components/common/toast";
import FastClick from 'fastclick'
import VueLazyload from "vue-lazyload";

Vue.config.productionTip = false

Vue.use(Toast)
//解决 移动端 300ms 的延迟问题
FastClick.attach(document.body)
//图片懒加载
Vue.use(VueLazyload)

Vue.prototype.$bus = new Vue()

new Vue({
    render: h => h(App),
    router,
    store
}).$mount('#app')
