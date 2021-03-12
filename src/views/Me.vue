<template>
    <div class="me">
        <van-nav-bar title="我的" class="head">
            <template #right>
                <van-icon name="wap-nav" size="18" @click="menu()"/>
            </template>
        </van-nav-bar>
        <div class="body">
            <div class="sbox" :class="{menu:isMenu}">
                <div class="home">
                    <a href="/">
                        首页
                    </a>
                </div>
                <div class="off" @click="off()">
                    <a href="/">
                        注销
                    </a>
                </div>
            </div>
            <div class="header">
                <img src="../assets/images/portrait.png" />
                <div>{{this.username}}</div>
            </div>
            <div class="box">
                <div class="group">
                    <div class="likes" @click="golikes()">
                        <div>
                            <img src="../assets/images/yixiangkan.png" />
                        </div>
                        <p>想看</p>
                    </div>
                    <div class="movie" @click="gomovies()">
                        <div>
                            <img src="../assets/images/movie.png" />
                        </div>
                        <p>电影</p>
                    </div>
                    <div class="coll" @click="gocolls()">
                        <div>
                            <img src="../assets/images/shoucang.png" />
                        </div>
                        <p>收藏</p>
                    </div>
                </div>
                <div class="lis">
                
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import '../assets/less/me.less'
    export default {
        name:'Me',
        data() {
            return {
                username:'',
                isMenu:true,
            }
        },
        created(){
            this.username=localStorage.getItem('username')
        },
        methods: {
            off(){
                localStorage.removeItem('id')
            },
            menu(){
                if(this.isMenu){
                    this.isMenu=false
                }else{
                    this.isMenu=true
                }
            },
            golikes(){
                this.$router.push({name:'Likes'});
            },
            gomovies(){
                this.$router.push({name:'Gomovie'});
            },
            gocolls(){
                this.$router.push({name:'Colls'});
            }
        },
    }
</script>