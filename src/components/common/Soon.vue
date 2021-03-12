<template>
    <div class="soon">
        <div class="most-expected">
            <p class="title">近期最受期待</p>
            <div class="most-expected-list">
                <div class="most-expected-item" v-for="(item, index) in mostE">
                    <div class="poster">
                        <img :src="item.img.replace('w.h','170.230')" />
                        <span class="wish-bg"></span>
                        <span class="wish">
                            <span class="wish-num">{{item.wish}}</span>
                            人想看
                        </span>
                        <div class="tog-wish">
                            <span></span>
                        </div>
                    </div>
                    <h5 class="Mname">{{item.nm}}</h5>
                    <p class="date">{{item.comingTitle}}</p>
                </div>
            </div>
        </div>
        <div class="coming-list">
            <p class="group-date">{{date}}</p>
            <div class="item" v-for="(item, index) in comL">
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
                                    <span class="person">{{item.wish}}</span>
                                    <span class="p-suffix">人想看</span>
                                </div>
                                <div class="actor">主演：{{item.star}}</div>
                                <div class="show-info">{{item.rt}}上映</div>
                            </div>
                        </div>
                        <div class="right">
                            <span v-if="item.showInfo" class="pre">预售</span>
                            <span v-else class="btn">想看</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import '../../assets/less/soon.less'
    export default {
        name:'v-soon',
        props:{
            mostE:{
                type:Array,
                default:''
            },
            comL:{
                type:Array,
                default:''
            }
        },
        data() {
            return {
                date:"",
            }
        },
        mounted() {
            this.dates();
        },
        methods: {
            dates(){
                var date = new Date();
                var m = date.getMonth()+1;
                var d = date.getDate();
                var week = date.getDay();
                var weeks = ["日","一","二","三","四","五","六"];
                var group = m+"月"+d+"日 星期"+weeks[week];
                this.date=group
                console.log(this.date);
            }
        },
    }
</script>
