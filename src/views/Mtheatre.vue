<template>
    <div class="mtheatre">
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

                        <div class="item" v-for="(item, index) in cytheatre" @click="goTheatre(item)">
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
    import '../assets/less/mtheatre.less'
    export default {
        name:'Mtheatre',
        data() {
            return {
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
        created() {
            let city = JSON.parse(sessionStorage.getItem("citys"));
            if(city != null){
                this.thcity[0]=city;
            }
            this.axios({
                method:'GET',
                url:'http://api.kele8.cn/agent/https://m.maoyan.com/ajax/cinemaList',
                params:{

                    ci:this.thcity[0].id,
                    limit:100

                }
            }).then(result => {
                if(result.data!=""){
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
            obtainId(){
                this.$router.push({name:'City-list', params:this.thcity[0]})
            },
            goTheatre(item){
                console.log(item.id)
                this.$router.push({name:'Theatre-details', params:{id:item.id}});
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
        },
    }
</script>
