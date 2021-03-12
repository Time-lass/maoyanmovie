<template>
    <div class="colls">
        <van-nav-bar title="收藏" class="head" left-arrow @click-left="goState"/>

    </div>
</template>

<script>
    import '../assets/less/colls.less'
    export default {
        name:'Colls',
        data() {
           return {
               
           }
       },
       methods: {
           goState(){
                this.$router.go(-1);
            }
       },
    }
</script>

<style lang="scss" scoped>

</style>