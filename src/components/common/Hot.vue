<template>
    <div class="hot">
        <div class="top-rated-wrap">
            <div class="top-rated">
                <p class="title">最受好评的电影</p>
                <div class="top-rated-list">
                    <div class="top-rated-item" v-for="(item, index) in hotM" @click="movieDetails(item)">
                        <div class="poster">
                            <img :src="item.img.replace('w.h','170.230')" />
                            <span class="wish-bg"></span>
                            <span class="score">
                            观众评分&nbsp;&nbsp;
                            <span>{{item.sc}}</span>
                            </span>
                        </div>
                        <h5 class="Mname">{{item.nm}}</h5>
                    </div>
                </div>
            </div>
        </div>
        <div class="list-wrap">
            <div class="item" v-for="(item, index) in hotM" @click="tobay(item)">
                <div class="block">
                    <div class="movie-img">
                        <img :src="item.img.replace('w.h','170.230')" />
                    </div>
                    <div class="movie-text">
                        <div class="left">
                            <div class="movie-name ">
                                <span class="title">{{item.nm}}</span>
                                <span v-if="item.version==='v2d imax'" class="v2d-imax"></span>
                            </div>
                            <div class="detail">
                                <div class="score">
                                    <span class="score-suffix">观众评</span>
                                    <span class="grade">{{item.sc}}</span>
                                </div>
                                <div class="actor">主演：{{item.star}}</div>
                                <div class="show-info">{{item.showInfo}}</div>
                            </div>
                        </div>
                        <div class="right">
                            <span v-if="item.globalReleased" class="btn">购票</span>
                            <span v-else class="pre">预购</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import '../../assets/less/hot.less'
    export default {
        name:'v-hot',
        props:{
            hotM:{
                type:Array,
                default:''
            }
        },
        data() {
            return {
                
            }
        },
        methods: {
            movieDetails(item){
                this.$router.push({name:'Movie-details',params:{movieId:item.id}})
            },
            tobay(item){
                this.$router.push({name:'Cinema',params:{movieId:item.id}})
            }
        },
    }
</script>