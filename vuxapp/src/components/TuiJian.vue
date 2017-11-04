<template>
    <!-- <slot></slot> -->
   <div id="tuijian">
       <div class="stui_top">
           <div v-if="stui.image_path.slice(-3) == 'png'" class="stui_div">
               <img :src="'http://fuss10.elemecdn.com/'+stui.image_path+'.png'" alt="商店图片.png" class="stui_img">
           </div>
           <div v-if="stui.image_path.slice(-4) == 'jpeg'" class="stui_div">
               <img :src="'http://fuss10.elemecdn.com/'+stui.image_path+'.jpeg'" alt="商店图片.jpeg" class="stui_img">
           </div>
           <div class="stui_left">
               <section class="stui_left_name">
                   <h3>{{stui.name}}</h3>
                   <ul>
                       <li content="保"></li>
                   </ul>
               </section>
               <section class="stui_star">
                   <!-- 五星好评 -->
                   <div>
                       <rater v-model="stui.rating" :font-size="15" disabled></rater>
                        <!-- 分数 -->
                        <span>{{stui.rating}}</span>
                        <!-- 月售 -->
                        <span>月售{{stui.recent_order_num}}单</span>
                    </div>
               </section>
               <!-- 起送 -->
               <section>
                   <div class="stui_left_send">
                       <!-- 起送 -->
                       <span>￥{{stui.float_minimum_order_amount}}起送&nbsp;</span>
                       <!-- 免费配送 -->
                       <span>|&nbsp;配送费￥{{stui.float_delivery_fee}}</span>
                   </div>
                   <!-- 距离和时间 -->
                   <div class="stui_left_time">
                       <!-- 距离 -->
                       <span>{{stui.distance&nbsp; | number}}m</span>
                       <!-- 时间 -->
                       <span>|&nbsp;{{stui.order_lead_time}}分钟</span>
                   </div>
               </section>
           </div>
       </div>
       <div class="stui_bottom">
           <section>
               <span class="stui_bottom_span">
                   <img src="//fuss10.elemecdn.com/a/c1/24c767ffa7fd296d3e2d6f01798c6png.png?imageMogr/thumbnail/!60x60r/gravity/Center/crop/60x60/" alt="口碑人气好店">
                    <span class="stui_popularity">口碑人气好店</span>
                </span>
           </section>
           <!-- 分界限 -->
           <span>
               <hr>
           </span>
           <!-- 所有活动 -->
           <section class="stui_bottom_play">
                <div v-if="stui.activities.length == 0">
                    <div></div>
                </div>
               <div v-if="stui.activities.length == 1" v-show="oneshow" v-model='oneshow'>
                    <div>{{stui.activities[0].tips}}</div>
               </div>
               <div v-if="stui.activities.length == 2" v-show="oneshow" v-model='oneshow'>
                    <div>{{stui.activities[0].tips}}</div>
                    <div>{{stui.activities[1].tips}}</div> 
               </div>
               <div>
                    <div v-if="stui.activities.length >= 3" v-show="oneshow" v-model='oneshow'>
                        <div>{{stui.activities[0].tips}}</div>
                        <div>{{stui.activities[1].tips}}</div>
                    </div>
                    <div v-for="stuia in stui.activities">
                        <div v-show="show" v-model='show'>{{stuia.tips}}</div>
                    </div>
               </div>
                <!-- 活动个数 -->
                <div class="stui_bottom_play_num" @click="showplay">{{stui.activities.length}}个活动</div>
           </section>
       </div>
   </div>
</template>
<script>
    import Vue from 'vue'
    import { Rater, Group, Cell, Range } from 'vux'
    // 过滤器
    Vue.filter('number',value=>{
        if (value >= 1000) {
            return (value/1000).toFixed(2)+'k'
        } else {
            return value;
        }
    });
    export default {
        name: 'tui-jian',
        props: ['tui'],
        components: {
            Rater,Group,Cell,Range
        },
        data(){
            return{
                stui: this.tui,
                t_img: '',
                data3: 5,
                show: false,
                oneshow : true
            }
        },
        methods:{
            showplay(){
                console.log('显示剩余活动');
                if (!this.show) {
                    this.show = true;
                    this.oneshow = false;
                }else{
                    this.show = false;
                    this.oneshow = true;
                    
                }
            }
        }
    }
</script>
<style scoped>
.stui_top{
    position: relative;
    height: 6.2rem;
}
.stui_img{
    width: 6rem;
    height: 6rem;
}
.stui_div{
    width: 6.2rem;
    height: 6.2rem;
    border: 0.1rem solid #ccc;
    margin: 1rem;
}
.stui_left{
    position: absolute;
    top: 0;
    left: 8rem;
    right: 1rem;
    height: 6.2rem;
}
.stui_left_send{
    color: #333;
    position: absolute;
    bottom: 0;
}
.stui_left_time{
    color: #ccc;
    position: absolute;
    bottom: 0;
    right: 0;
}
/* 口碑人气 */
.stui_popularity{
    color: red;
}
/* 五星好评 */
.stui_star{
    margin: 0.5rem auto;
}
/* 活动和口碑 */
.stui_bottom{
    position: relative;
    /* height: 6.2rem; */
    margin-left: 8.2rem;
}
/* 口碑 */
.stui_bottom_span img{
    width: 1.2rem;
    height: 1.2rem;
    margin-top: 1rem;
}
.stui_bottom hr{
    margin-top: 0.5rem;
}
/* 活动 */
.stui_bottom_play{
    position: relative;
    margin: 0.5rem 0;
    color: #ccc;
    margin-right: 1rem;
}
.stui_bottom_play_num{
    position: absolute;
    top: 0;
    right: 0;
}
</style>