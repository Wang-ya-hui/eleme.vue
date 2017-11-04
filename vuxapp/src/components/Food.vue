<template>
    <div>
        <div id="food">
            <!-- 获取定位 -->
            <div class="food-city">
                <!-- 在定位这里加一个过滤器 -->
                <span class="fa fa-map-marker"></span>
                <i>{{city}}</i>
            </div>
            <!-- 获取天气 -->
            <div class="food-weather">
                <div class="food-weather-word">
                    <h2>{{temperature}}</h2>
                    <p>{{description}}</p>
                </div>
                <img :src='this.image_hash' alt="图片找不到">
            </div>
            <!-- 搜索框 -->
            <div>
                <a href="#">
                    <div class="food-search">
                        <span class="fa fa-search"></span>
                        搜索商家，商品名称
                    </div>
                </a>  
            </div>
            <!-- 热搜 -->
            <scroller lock-y scrollbar-x>
                    <div class="box1">
                            <div class="box1-item" v-for="hot in hots"><span>{{hot.word}}</span></div>
                    </div>
            </scroller>
        </div>
        <!-- 轮播 -->
        <div class="bigbox">
                <swiper auto height="14rem">
                    <!-- 引入swiper-item自定义item内容，用height定义高度 -->
                        <swiper-item>
                            <div class="fadeInUp animated">
                                <div v-for='lunbo in img_src'>

                                    <lun-bo :lun="lunbo"></lun-bo>
                                </div>
                            </div>
                        </swiper-item>
                        <swiper-item>
                            <div class="fadeInUp animated">
                                    <div v-for='lunbo in img_src2'>
                                            <lun-bo :lun="lunbo"></lun-bo>
                                    </div>
                            </div>
                        </swiper-item>
              </swiper>
        </div>
        <!-- 获取推荐商家 -->
        <h3>推荐商家</h3>
        <div id="tuijian">
            <!-- 加载图片 -->
            <div class="loading">
                <span v-if="status == 'loading'" class="fa fa-spinner fa-pulse fa-3x fa-fw"></span>
                <span v-if="status == 'fail'">加载失败...</span>
            </div>
            <!-- 加载成功遍历数据，把Roomltem数据渲染到Home中 -->
            <div v-if="status == 'success'">
                <div v-for="(tj_data,i) in tj_datas">
                    <tui-jian :tui='tj_data' :key="tj_data.id"></tui-jian>
                </div>
            </div>
            <!-- 加载成功时， -->
            <div v-if="status == 'success'" class="load-more">
                <span class="fa fa-spinner fa-pulse fa-2x fa-fw"></span>
                正在加载更多
            </div>
        </div>
        <div v-show="scrolled2" @click="as">
            <back></back>
        </div>
    </div>   
</template>

<script>
    import { Scroller, Divider, Spinner, XButton, Group, Cell, LoadMore } from 'vux'
    import { Swiper, GroupTitle, SwiperItem} from 'vux'
    import LunBo from './LunBo'
    import TuiJian from './TuiJian'
    import Back from './Back.vue'
    export default {
        name: 'food',
        components: {
            Scroller, Divider, Spinner, XButton, Group, Cell, LoadMore,
            Swiper, GroupTitle, SwiperItem,
            LunBo,TuiJian,Back
        },
        data () {
            return {
                city: "城市定位",
                temperature: "温度",
                description: "天气",
                image_hash: "天气图标",
                image_hash1: "",
                image_http: "https://fuss10.elemecdn.com/.png?imageMogr/thumbnail/!69x69r/gravity/Center/crop/69x69/",
                img_http: "//fuss10.elemecdn.com/.jpeg?imageMogr/format/webp/thumbnail/!90x90r/gravity/Center/crop/90x90/",
                hots: {},
                img_src: [],
                img_src2: [],
                tj_datas: [],
                isLoading: false,
                status:'loading',
                scrolled2: false
            }
        },
        methods: {
            as(){
                 document.scrollingElement.scrollTop=0
            },
            handleScroll () {
                this.scrolled2 = window.scrollY > 500;
            },
            // 当页面发生滚动时调用的函数
            didScroll(){
                // var bodyH = document.body.clientHeight;//页面的总高度
                var bodyH = document.body.clientHeight;
                // console.log(bodyH);
                var scrollTop = document.scrollingElement.scrollTop;//页面滚动时被卷去的高度
                // console.log(scrollTop);
                var windowH = document.documentElement.clientHeight;//可视页面的高度
                // console.log(windowH);
                if (windowH+scrollTop >= bodyH-10) {
                    console.log('加载更多');
                    if (!this.isLoading) {
                        this.loadMore();
                    }
                }
            },
            loadMore(){
                this.isLoading = true;
                this.http.get('/elemeapi/shopping/restaurants?latitude=37.87059&longitude=112.550667&offset=10&limit=20&extras[]=activities&terminal=h5&extra_filters=home',{
                params:{offset:this.tj_datas.length/8}
                })
                .then(res=>{
                    if (res.data) {
                        this.tj_datas = this.tj_datas.concat(res.data);
                    }
                    this.isLoading = false;
                },err=>{
                    this.isLoading = false;   
                }) 
            }
        },
        mounted () {
            window.onscroll = this.didScroll;
            window.addEventListener('scroll', this.handleScroll);
            // console.log('获取定位');
            // 发送请求
            this.http.get('/elemeapi/v2/pois/ww8p3nhuhtsh').then(res=>{
                // console.log(res.data);
                // console.log(this.city);
                if (res.data.error = '0') {
                    this.city = res.data.address;
                    // console.log(this.city);
                } else {
                    this.city = "未能获得地址"
                }
            },err=>{
              
            });
            console.log('获取天气');
            this.http.get('/elemeapi/bgs/weather/current?latitude=37.87059&longitude=112.550667').then(res=>{
                // console.log(res.data);
                if (res.data.highlight = '0') {
                    this.temperature = res.data.temperature;
                    this.description = res.data.description;
                    this.image_hash1 = res.data.image_hash.substr(0,1)+"/"+res.data.image_hash.substr(1,2)+"/"+res.data.image_hash.substr(3);
                    // console.log(this.image_hash1);
                    this.image_hash = this.image_http.substr(0,28)+this.image_hash1+this.image_http.substr(28);
                    // console.log(this.image_hash);

                } else {
                    
                }
            },err=>{
                
            });
            // 热搜
            this.http.get('/elemeapi/shopping/v3/hot_search_words?latitude=37.87059&longitude=112.550667',{}).then(res=>{
                // console.log(res.data);
                if (res.data) {
                    this.hots = res.data;
                    // console.log(this.hots.word);
                } else {
                }
            },err=>{

            });
            // 轮播
            this.http.get('/elemeapi/shopping/v2/entries?latitude=38.01135&longitude=112.44299&templates[]=main_template').then(res=>{
                // console.log(res.data);
                if (res.data) {
                    this.lunbodatas=res.data[0].entries;
                    // this.lunbodatas=res.data[0].entries;
                    // console.log(this.lunbodatas[0].business_flag)
                    // for( var i = 0; i<14;i++){
                    //     if (i<8) {
                    //         this.img_src.push(this.img_http.substr(0,22)+res.data[0].entries[i].image_hash.substr(0,1)+"/"+res.data[0].entries[i].image_hash.substr(1,2)+"/"+res.data[0].entries[i].image_hash.substr(3)+this.img_http.substr(22));
                    //     } else {
                    //         this.img_src2.push(this.img_http.substr(0,22)+res.data[0].entries[i].image_hash.substr(0,1)+"/"+res.data[0].entries[i].image_hash.substr(1,2)+"/"+res.data[0].entries[i].image_hash.substr(3)+this.img_http.substr(22));
                    //     }
                        
                    // };
                    for( var i = 0; i<14;i++){
                        if (i<8) {
                            this.img_src.push(res.data[0].entries[i]);
                        } else {
                            this.img_src2.push(res.data[0].entries[i]);
                        }
                        
                    };
                } else {
                    
                }
            }),err=>{

            };
            // 获取 推荐商家
            this.http.get('/elemeapi/shopping/restaurants?latitude=37.87059&longitude=112.550667&offset=0&limit=20&extras[]=activities&terminal=h5&extra_filters=home').then(res=>{
                if (res.data) {
                    this.status = 'success';
                    this.tj_datas=res.data;
                } else {
                    this.status = 'fail';
                }
                console.log(res.data);
                console.log(this.tj_datas)
            }),err=>{
                this.status = 'fail'
            };
        }
       
    }
</script>
<style scoped>
#food{
    width: 100%;
    margin-top: 0;
    background-color: #0af;
}
.food-city{
    color: white;
    width: 13rem;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    margin-top: 0;
    padding-top: 1rem;
    padding-left: 1rem;
    font-size: 1.5rem;
}
.food-weather{
    color: white;
    font-size: 0.5rem;
    position: absolute;
    right: 1rem;
    top: 1rem;
}
.food-weather img{
    width: 3rem;
    height: 3rem;
}
.food-weather-word{
    position: absolute;
    right: 3rem;
    width: 2rem;
    text-align: center
}
/* 搜索框 */
.food-search{
    margin-top: 1rem;
    margin-left: 1rem;
    margin-right: 1rem;
    background-color: white;
    color: gainsboro;
    height: 3rem;
    line-height: 3rem;
    text-align: center;
}
/* 热搜 */
.box1 {
  height: 40px;
  position: relative;
  width: 1100px !important;
  font-size: 14px;
  top: 10px;
  z-index: 999;
}
.box1-item {
  width: 90px !important;
  height: 24px;
  display:inline-block;
  margin-left: 15px;
  text-align: center;
  color: white;
}
/* 轮播 */
/*  */
.black {
  background-color: #000;
}
.title{
  line-height: 100px;
  text-align: center;
  color: #fff;
}
.animated {
  animation-duration: 2s;
  animation-fill-mode: both;
  background-color: #fff;
}
.vux-indicator.custom-bottom {
  bottom: 30px;
}
@-webkit-keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translate3d(0, 100%, 0);
  }
  100% {
    opacity: 1;
    transform: none;
  }
}
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translate3d(0, 100%, 0);
  }
  100% {
    opacity: 1;
    transform: none;
  }
}
.fadeInUp {
  animation-name: fadeInUp;
}
.swiper-demo-img img {
  width: 100%;
};
.box1 {
  height: 40px;
  position: relative;
  width: 1000px;
  font-size: 14px;
  top: 10px;
  z-index: 999;
  /* background-color: gold; */
}
.box1-item {
  width: 60px;
  height: 24px;
  /* background-color: #ccc; */
  display:inline-block;
  margin-left: 15px;
  float: left;
  text-align: center;
}
.lun{
    width: 100px;
    height: 80px;
    float: left;
}
.bigbox{
    background-color: #fff;
}
main{
    padding-top: 64px;
    margin: 0.5rem;
}
.loading{
    text-align: center;
}
.load-more{
    text-align: center;
    font-size: 1.2rem;
    margin-bottom: 80px;
}
</style>