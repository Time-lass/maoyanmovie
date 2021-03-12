<template>
    <div class="main">
        <div>
            <!-- 二级路由 -->
            <router-view></router-view>
        </div>

        <div class="tabs" style="width:100%; height:48px; border-top: .5px solid #d8d8d8;">
            <div class="tab-item" style=" font-size: 12px; margin-top: 3px;" v-for="(item, index) in tabsData" @click="activeTab(index, item.name)">
                <span v-if="index!=activeIndex" class="tab-img" style="width:100%; height:25px;">
                    <img :src="item.notouch" alt="" style="width:25px;height:25px;">
                </span>
                <span v-else class="tab-img" style="width:100%; height:25px;">
                    <img :src="item.touchm" alt="" style="width:25px;height:25px;">
                </span>
                <span :class="{active: activeIndex == index}" class="tab-title" >{{item.title}}</span>
            </div>
        </div>
    </div>
</template>

<script>
    //导入外部样式表
    import '../assets/less/main.less'
    export default {
        name:'Main',
        data() {
            return {
                activeIndex:0,
                tabsData:[
                    {
                        title:'电影',
                        name:['Movie'],
                        touch:true,
                        notouch:require('../assets/images/dianying.png'),
                        touchm:require("../assets/images/dianying-touch.png")
                    },
                    {
                        title:'影院',
                        name:['Mtheatre'],
                        touch:false,
                        notouch:require("../assets/images/yingyuan.png"),
                        touchm:require("../assets/images/yingyuan-touch.png")
                    },
                    {
                        title:'我的',
                        name:['Me'],
                        touch:false,
                        notouch:require("../assets/images/me.png"),
                        touchm:require("../assets/images/me-touch.png")
                    }
                ],
            };
        },

        created(){
            let routerName = this.$route.name;
            for(let i=0;i<this.tabsData.length;i++){
                if(this.tabsData[i].name==routerName){
                    this.activeIndex=i;
                    break
                }
            }
        },

        methods: {

            //根据路由名称跳转
            goState(name){
                console.log(name)
                if(name=='Me'){
                    let tokenString = localStorage.getItem("id");
                    if(!tokenString){
                        return this.$router.push({ name: "Login" });
                    }
                }
                this.$router.push({name});
            },
            activeTab(index, name){
                if(this.activeIndex == index){
                    return
                }
                this.activeIndex = index;

                this.goState(name);
                for(let i=0;i<this.tabsData.length;i++){
                    if(this.tabsData[i].touch){
                        this.tabsData[i].touch = false;
                        break
                    }
                }
                this.tabsData[index].touch = true;
            }
        },
    }
</script>