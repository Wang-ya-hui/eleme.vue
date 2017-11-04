<template>
    <div class="box">
            <img :src="'http://fuss10.elemecdn.com/'+lun.image_hash+'.jpeg'" alt="" class="lun"><br>
        <span>{{lun.name}}</span>
    </div>
</template>
<script>
    import Vue from 'vue'
    export default {
        name: 'lun-bo',
        props: ['lun'],
        data(){
            return {
                // simg: this.imgs
            }
        }
    }
</script>
<style scoped>

img{
    width: 4rem;
    height: 4rem;
}
span{
    text-align: center;
    color: #333333;
    display: block;
}
.box{
        width: 25vw;
        height: 19vw;
        background-color: #fff;
        /* border:  1px solid black; */
        text-align: center;
        line-height: 5.5vw;
        float: left;
        vertical-align: middle;
    }
/* .lun{
    width: 40px;
    height: 40px;
} */
</style>