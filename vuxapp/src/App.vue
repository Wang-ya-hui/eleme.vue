<template>
  <div id="app">
    <!-- 过渡动画 -->
      <tabbar v-show="true" style="position:fixed;">
        <tabbar-item selected link="/food">
          <img slot="icon" src="./assets/img/index1.png">
          <span slot="label">外卖</span>
        </tabbar-item>
        <tabbar-item link="/find">
          <img slot="icon" src="./assets/img/index2.png">
          <span slot="label">发现</span>
        </tabbar-item>
        <tabbar-item link="/order">
          <img slot="icon" src="./assets/img/index3.png">
          <span slot="label">订单</span>
        </tabbar-item>
        <tabbar-item link="/me">
          <img slot="icon" src="./assets/img/index3.png">
          <span slot="label">我的</span>
        </tabbar-item>
      </tabbar>
      <transition>
          <router-view></router-view>
      </transition>
  </div>
</template>

<script>
import {Tabbar,TabbarItem} from 'vux'
export default {
  name: 'app',
  components:{
    Tabbar,
    TabbarItem
  },
  data(){
    return {
    }
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';

body {
  background-color: #fff !important;
  width: 100%;
}
.vux-slider > .vux-indicator, .vux-slider .vux-indicator-right{
    position: absolute;
    right:49vw !important;
    bottom: 5px !important;
}
</style>
