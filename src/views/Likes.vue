<template>
    <div class="likes">
        <van-nav-bar title="我想看" class="head" left-arrow @click-left="goState"/>
        <div class="body">
            <div v-for="(item, index) in lkMovie" class="movie">
                <div class="img">
                    <img :src="item.img" />
                </div>
                <div class="nm">
                    <div class="name">{{item.nm}}</div>
                    <div v-if="item.global" class="btn">购票</div>
                    <div v-else class="pre">预购</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import '../assets/less/likes.less'
    export default {
       name:'Likes', 
       data() {
           return {
              lkMovie:[]
           }
       },
       created() {
           this.lkMovie=JSON.parse(localStorage.getItem("likeMovie"));
           console.log(this.lkMovie)
       },
       methods: {
           goState(){
                this.$router.go(-1);
            }
       },
    }
</script>