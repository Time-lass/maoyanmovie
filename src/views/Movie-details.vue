<template>
    <div class="detailsMovie">
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
        <div class="movie-info" :style="{background:this.detailMovie.backgroundColor}">
            <div class="nav">
                <a href="/">猫眼电影</a>
                &nbsp;>&nbsp;
                <span>{{this.detailMovie.nm}}</span>
            </div>
            <div class="movie-info-top">
                <div class="movie-cover">
                    <img :src="this.detailMovie.img" class="img">
                    <img src="../assets/images/play.png" class="play"/>
                </div>
                <div class="movie-desc">
                    <div class="movie-ch-name">
                        <h1>{{this.detailMovie.nm}}</h1>
                    </div>
                    <div class="movie-en-name">{{this.detailMovie.enm}}</div>
                    <div class="movie-other">
                        <div class="movie-type">{{this.detailMovie.cat}}</div>
                        <div class="actors">{{this.detailMovie.star}}</div>
                        <div class="movie-show-time">
                            {{this.detailMovie.pubDesc}} / {{this.detailMovie.episodeDur}}分钟
                            <span class="rightjt"><img src="../assets/images/right2.png" /></span>
                        </div>
                    </div>
                    <div class="btns">
                        <div class="like">
                        <img src="../assets/images/like.png" />
                        <span @click="wantLook()">想看</span>
                        </div>
                        <div class="to-see">
                        <img src="../assets/images/tosee.png" />
                        <span>看过</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import '../assets/less/mDetails.less';
    export default {
        name:'movie-details',
        data() {
            return {
                detailMovie:[],
                mov:[
                    {
                        id:'',
                        nm:'',
                        img:'',
                        global:''
                    }
                ],
                wantMov:[],
            };
        },
        created(){
            let movie = this.$route.params;
            this.axios({
                method:'GET',
                url:'http://api.kele8.cn/agent/http://m.maoyan.com/ajax/detailmovie',
                params:{
                    movieId:movie.movieId,
                }
            }).then(movieDet => {
                if(movieDet.data != ""){
                    this.detailMovie = movieDet.data.detailMovie;
                    localStorage.setItem('detailMovie',JSON.stringify(this.detailMovie));
                    console.log(this.detailMovie)
                }else{
                    this.detailMovie=JSON.parse(localStorage.getItem("detailMovie"));
                }

                this.detailMovie.img=this.detailMovie.img.replace('w.h','170.230');
                this.mov[0].id = this.detailMovie.id;
                this.mov[0].nm = this.detailMovie.nm;
                this.mov[0].img= this.detailMovie.img;
                this.mov[0].global=this.detailMovie.globalReleased;
                console.log(this.mov);
                // this.wantMov = JSON.parse(localStorage.getItem("likeMovie"));
            })
        },
        methods: {
            //收藏电影
            wantLook(){
                var arr = JSON.parse(localStorage.getItem("likeMovie"));

                console.log(arr);
                if(arr == null){
                    this.wantMov.push(this.mov[0]);
                    localStorage.setItem('likeMovie',JSON.stringify(this.wantMov));
                    this.$toast("收藏成功")
                    console.log(this.wantMov);
                }else if(arr.length != 0){
                    this.wantMov = arr;
                    let j = 0;
                    for(var i=0;i<this.wantMov.length;i++){
                        console.log("333")
                        if(this.wantMov[i].id == this.mov[0].id){
                            j++;
                            var s=i;
                        }
                    }
                    if(j!=0){
                        console.log("222")
                        this.wantMov.splice(s,1);
                        this.$toast("取消收藏")
                        localStorage.setItem('likeMovie',JSON.stringify(this.wantMov));
                    }else{
                        console.log("111")
                        this.wantMov.push(this.mov[0]);
                        this.$toast("收藏成功")
                        localStorage.setItem('likeMovie',JSON.stringify(this.wantMov));
                    }
                }else{
                    this.wantMov.push(this.mov[0]);
                    this.$toast("收藏成功")
                    localStorage.setItem('likeMovie',JSON.stringify(this.wantMov));
                    console.log(this.wantMov);
                }
                
            }
            
        },
    }
</script>
