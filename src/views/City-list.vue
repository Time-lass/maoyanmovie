<template>
    <div class="city-list">
        <van-index-bar :index-list="indexList" :sticky="false" highlight-color="black">
            <van-index-anchor index="定位">定位</van-index-anchor>
            <van-cell>

            </van-cell>

            <!-- 当前所选择的城市 -->
            <van-index-anchor index="当前">当前</van-index-anchor>
            <van-cell>
                <div v-for="(city, tindex) in now" class="city-item" @click="back(city)">{{city.nm}}</div>
                
            </van-cell>

            <!-- 热门的城市 -->
            <van-index-anchor index="热门">热门城市</van-index-anchor>
            <van-cell>
                <div class="city-item" v-for="(city, tindex) in hot" @click="back(city)">{{city.nm}}</div>
            </van-cell>

            <!-- 所有的城市 -->
            <div v-for="(item, index) in newct" class="grouping">
                <van-index-anchor :index="index" >{{index}}</van-index-anchor>
                <div v-for="(city, tindex) in item" class="city-titem">
                    <van-cell :data-nm="city.nm" :data-id="city.id" @click="back(city)">{{city.nm}}</van-cell>
                </div>
            </div>
        </van-index-bar>
    </div>
</template>

<script>
    //引入外部样式
    import '../assets/less/city-list.less'

    //引入城市表
    import newct from '../assets/js/city'
    export default {
        name:'city-list',
        data(){
            return{
                newct,
                indexList: ["定位", "当前", "热门", "A", "B", "C", "D", "E", "F", "G", "H", "J", "K", "L", "M", "N", "P", "Q", "R", "S", "T", "W", "X", "Y", "Z"],
                hot:[
                    {
                        id : 10,
                        nm : "上海",
                        py : "shanghai"
                    },
                    {
                        id : 1,
                        nm : "北京",
                        py : "beijing"
                    },
                    {
                        id : 20,
                        nm : "广州",
                        py : "guangzhou"
                    },
                    {
                        id : 30,
                        nm : "深圳",
                        py : "shenzhen"
                    },
                    {
                        id : 57,
                        nm : "武汉",
                        py : "wuhan"
                    },
                    {
                        id : 40,
                        nm : "天津",
                        py : "tianjin"
                    },
                    {
                        id : 42,
                        nm : "西安",
                        py : "xian"
                    },
                    {
                        id : 55,
                        nm : "南京",
                        py : "nanjing"
                    },
                    {
                        id : 50,
                        nm : "杭州",
                        py : "hangzhou"
                    },
                    {
                        id : 59,
                        nm : "成都",
                        py : "chengdu"
                    },
                    {
                        id : 45,
                        nm : "重庆",
                        py : "chongqing"
                    },
                ],
                now:[],
            };
        },

        //回传所选城市
        created() {
            let thcity = this.$route.params;
            console.log(thcity)
            this.now[0] = thcity;
        },
        methods: {

            //选择城市返回上一级
            back(city) {
                sessionStorage.setItem('citys', JSON.stringify(city))
                this.$router.go(-1);
            },
        },
    }
</script>
