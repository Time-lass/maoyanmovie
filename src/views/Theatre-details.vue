<template>
    <div>

    </div>
</template>

<script>
    import '../assets/less/thdetails.less'
    export default {
        name:'theatre-details',
        data() {
            return {
                theatreId:{},
            }
        },
        created(){
            let theatre = this.$route.params;
            this.theatreId = theatre;
            console.log(this.theatreId.id);
            this.axios({
                method:'GET',
                url:'http://api.kele8.cn/agent/https://m.maoyan.com/ajax/cinemaDetail',
                params:{
                    cinemaId:this.theatreId.id,
                }
            }).then(result => {
                console.log(result)
            })
        }
    }
</script>
