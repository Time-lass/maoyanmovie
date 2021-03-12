<template>
    <div class="movie">
        <van-nav-bar title="猫眼电影" class="head">
            <template #left>
                <div class="city-entry" @click="obtainId()">
                    <span class="city-name"  v-for="(item, index) in thcity">{{item.nm}}</span>
                    <i class="city-entry-arrow"></i>
                </div>
            </template>
            <template #right>
                <van-icon name="wap-nav" size="18"/>
            </template>
        </van-nav-bar>
        <div class="downheader">
            <a href="/">
                <img class="logo" src="../assets/images/logo.png"/>
            </a>
            <span class="benefit-text">
                发现最新最热电影
            </span>
            <span class="split"></span>
            <span class="open-app">
                打开App
                <img src="../assets/images/rightjt.png"/>
            </span>
        </div>
        <div class="movies">
            <van-tabs v-model="active" animated>
                <van-tab  :title="'正在热映'">
                   <v-hot :hotM='hotMovie'></v-hot>
                </van-tab>
                <van-tab  :title="'即将上映'">
                    <v-soon :mostE='mostExpected' :comL='comingList'></v-soon>
                </van-tab>
            </van-tabs>
        </div>

    </div>
</template>

<script>
    //导入外部样式表
    import '../assets/less/movie.less'
    import vHot from'../components/common/Hot.vue'
    import vSoon from'../components/common/Soon.vue'
    export default {
        name:'Movie',
        components:{
            vHot,
            vSoon,
        },

        data() {
            return{
                thcity:[
                    {
                        id:1,
                        nm:"北京",
                        py:"beijing"
                    }
                ],
                hotMovie:[],
                mostExpected:[],
                comingList:[],
                active:0,
            };
        },
        created() {
            let city = JSON.parse(sessionStorage.getItem("citys"));
            if(city != null){
                this.thcity[0]=city;
            }
            this.axios({
                method:'GET',
                // url:'http://localhost:3000/movie/hot',
                url:'http://api.kele8.cn/agent/https://m.maoyan.com/ajax/movieOnInfoList',
            }).then(result => {
                if(result.data != ""){
                    this.hotMovie=result.data.movieList;
                    localStorage.setItem('hotMovie',JSON.stringify(this.hotMovie));
                    console.log(this.hotMovie)
                }else{
                    this.hotMovie=JSON.parse(localStorage.getItem("hotMovie"));
                }
            })
            this.axios({
                method:'GET',
                url:'http://api.kele8.cn/agent/https://m.maoyan.com/ajax/mostExpected',
                params:{
                    ci:this.thcity[0].id,
                    token:"",
                    limit:10
                }
            }).then(expect => {
                if(expect.data != ""){
                    console.log(expect);
                    this.mostExpected=expect.data.coming;
                    localStorage.setItem('mostExpected',JSON.stringify(this.mostExpected));
                }else{
                    this.mostExpected=JSON.parse(localStorage.getItem("mostExpected"));
                }
            })
            this.axios({
                method:'GET',
                url:'http://api.kele8.cn/agent/https://m.maoyan.com/ajax/comingList',
                params:{
                    ci:this.thcity[0].id,
                    token:""
                }
            }).then(come => {
                if(come.data!=""){
                    this.comingList = come.data.coming;
                    localStorage.setItem('coming',JSON.stringify(this.comingList));
                    console.log(this.comingList)
                }else{
                    this.comingList=JSON.parse(localStorage.getItem("coming"));
                }
            })

        },
        methods: {
            obtainId(){
                this.$router.push({name:'City-list', params:this.thcity[0]})
            },
            
        },
    }
</script>
