<template>
    <div class="cinema">
        <van-nav-bar :title=this.detailMovie.nm class="head" left-arrow @click-left="goState"/>
        <div class="movie-info" :style="{background:this.detailMovie.backgroundColor}">
            <div class="movie-info-top">
                <div class="movie-cover">
                    <img :src="this.detailMovie.img" class="img">
                </div>
                <div class="movie-desc">
                    <div class="movie-ch-name">
                        <h1>{{this.detailMovie.nm}}</h1>
                    </div>
                    <div class="movie-en-name">{{this.detailMovie.enm}}</div>
                    <div class="score">
                        {{this.detailMovie.sc}}
                    </div>
                    <div class="movie-other">
                        <div class="movie-type">{{this.detailMovie.cat}}</div>
                        <div class="actors">{{this.detailMovie.star}}</div>
                        <div class="movie-show-time">
                            {{this.detailMovie.pubDesc}} / {{this.detailMovie.episodeDur}}分钟
                            <span class="rightjt"><img src="../assets/images/right2.png" /></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="theatres" style="margin-bottom: 48px;">
            <div class="in">
                <!-- 懒加载组件 -->
                <van-list
                    v-model="loading"
                    :finished="finished"
                    finished-text="没有更多了"
                    offset="50"
                    @load="loadTheatre"
                    >

                        <div class="item" v-for="(item, index) in cytheatre" @click="bay(item)">
                            <div>
                                <div class="theat-nm">
                                    <span>{{item.nm}}</span>
                                    <span class="price-block">
                                        <span class="price">{{item.sellPrice}}</span>
                                        <span class="q">元起</span>
                                    </span>
                                </div>
                                <div class="location">
                                    <div class="line-ellipsis">{{item.addr}}</div>
                                    <div class="distance">{{item.distance}}</div>
                                </div>
                                <div class="label-block">
                                    <div class="allowRefund" v-if="item.tag.allowRefund">退</div>
                                    <div class="endorse" v-if="item.tag.endorse">改签</div>
                                    <div class="snack" v-if="item.tag.snack">小吃</div>
                                    <div class="vipTag" v-if="item.tag.vipTag">折扣卡</div>
                                    <div class="hallType" v-for="(halls, indexs) in item.tag.hallTypeVOList">{{halls.name}}</div>
                                </div>
                                <div class="discount" v-if="item.promotion.cardPromotionTag">
                                    <div class="discount-card">
                                        <img src="../assets/images/card.png"/>
                                    </div>
                                    <div class="discount-text">{{item.promotion.cardPromotionTag}}</div>
                                </div>
                            </div>
                        </div>

                </van-list>
            </div>
        </div>
    </div>
</template>

<script>
    import '../assets/less/cinema.less'
    export default {
        name:'Cinema',
        data() {
            return {
                 detailMovie:[],
                 thcity:[
                    {
                        id:1,
                        nm:"北京",
                        py:"beijing"
                    }
                ],
                //触发加载
                loading:true,
                //是否全部加载完成数据
                finished: false,
                //所有影院数据
                allCytheatre:[],
                dataCount: 20,
                startIndex:0,
                cytheatre:[],
            }
        },
        created(){
            let movie = this.$route.params;
            console.log(movie)
            if(movie.movieId == ""){
                this.detailMovie=JSON.parse(localStorage.getItem("detailMovie"));
            }
            let city = JSON.parse(localStorage.getItem("citys"));
            if(city != null){
                this.thcity[0]=city;
            }
            this.axios({
                method:'GET',
                url:'http://api.kele8.cn/agent/http://m.maoyan.com/ajax/detailmovie',
                params:{
                    movieId:movie.movieId,
                }
            }).then(movieDet => {
                if(movieDet.data!=""){
                    this.detailMovie = movieDet.data.detailMovie;
                    localStorage.setItem('detailMovie',JSON.stringify(this.detailMovie));
                    console.log(this.detailMovie)
                }else{
                    this.detailMovie=JSON.parse(localStorage.getItem("detailMovie"));
                }
                this.detailMovie.img=this.detailMovie.img.replace('w.h','170.230');
                console.log(this.mov);
            })
            this.axios({
                method:'GET',
                url:'http://api.kele8.cn/agent/https://m.maoyan.com/ajax/cinemaList',
                params:{

                    ci:this.thcity[0].id,
                    limit:100

                }
            }).then(result => {
                if(result.data != ""){
                    console.log('result ==> ', result);
                    this.allCytheatre = result.data.cinemas;
                    localStorage.setItem('cyTheatre',JSON.stringify(result.data.cinemas));
                }else{
                    this.allCytheatre=JSON.parse(localStorage.getItem("cyTheatre"));
                }
                this.cytheatre = this.allCytheatre.slice(this.startIndex, this.startIndex + this.dataCount);
                this.startIndex += this.dataCount;
                this.loading = false;
                console.log(this.cytheatre);
            })
        },
        methods: {
           goState(){
                this.$router.push({name:'Movie'});
            },
            loadTheatre(){
                console.log("触发懒加载");
                setTimeout(()=>{
                    //截取数据
                    let data = this.allCytheatre.slice(this.startIndex,this.startIndex+this.dataCount);
                    this.startIndex += this.dataCount;
                    this.cytheatre.push(...data);
                    this.loading=false;
                    if(data.length < this.dataCount){
                        this.finished = true;
                    }
                }, 1000)
            },
            bay(item){
                this.$router.push({name:'Bay',params:{Tnm:item.nm,Taddr:item.addr,Mnm:this.detailMovie.nm,Mimg:this.detailMovie.img,prices:item.sellPrice}})
            }
       },
    }
</script>
