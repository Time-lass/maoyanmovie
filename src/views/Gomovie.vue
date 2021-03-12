<template>
    <div class="gomovie">
        <van-nav-bar title="电影票" class="head" left-arrow @click-left="goState"/>
        <div class="body">
            <div class="ticket" v-for="(item, index) in myMovie">
                <div class="top">
                    <img :src="item.img" />
                    <div class="text">
                        <div class="movie-nm">{{item.nm}}</div>
                        <div class="movie-th">{{item.thnm}}</div>
                        <div class="times">{{item.times}}</div>
                        <div class="seats">{{item.seats}}</div>
                    </div>
                </div>
                <div class="bottom">
                    <div class="prices">
                        <span>总价：</span>
                        {{item.prices}}
                        <span>元</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import '../assets/less/gomovie.less'
    export default {
        name:'Gomovie',
        data() {
           return {
               myMovie:[]
           }
       },
       created(){
           this.myMovie = JSON.parse(localStorage.getItem("myMovie"));
           console.log(this.myMovie)
       },
       methods: {
           goState(){
                this.$router.push({name:'Me'});
            }
       },
    }
</script>