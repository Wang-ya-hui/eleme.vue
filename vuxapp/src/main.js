import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'

Vue.use(VueRouter)
// 解除点击事件的延迟
FastClick.attach(document.body)
 // 创建基本的axios配置
 import axios from 'axios';
 // 挂载到vue的原型
 Vue.prototype.http = axios;

//  import {Actionsheet,AlertPlugin} from 'vux'
//  // 插件 使用弹窗
//  Vue.use(AlertPlugin)
//  // 注册为全局组件
//  Vue.component('Actionsheet',Actionsheet)

import './assets/base.css'
import './assets/font-awesome-4.7.0/css/font-awesome.css'

// 导入子组件
import Food from './components/Food.vue'
import Order from './components/Order.vue'
import Find from './components/Find.vue'
import Me from './components/Me.vue'
const routes = [
  {path: '/food',component: Food },
  {path: '/order',component: Order },
  {path: '/find',component:Find },
  {path: '/me',component: Me }
]
// 路由
const router = new VueRouter({
  routes
})
router.push('./food')

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app-box')

// 设置文字的大小
var html = document.documentElement;
var calcRem = function(){
  var w = html.clientWidth; 
  if (w <= 320) {
    html.style.fontSize = '10px';
  }else if (w <= 640) {
    html.style.fontSize = w/32 + 'px';
  }else{
    html.style.fontSize = '20px';
  }
}
calcRem();
window.onresize = function(){
  calcRem();
}
