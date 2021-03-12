<template>
    <div class="bay">
        <van-nav-bar :title=this.Thnm class="head" left-arrow @click-left="goState"/>
        <div class="body-top">
            <h2>{{this.Mvnm}}</h2>
            <p>{{this.Thaddr}}</p>
        </div>
        <van-dropdown-menu active-color="#1989fa" dropdown-menu-height="24px">
            <van-dropdown-item v-model="value1" :options="option1" />
            <van-dropdown-item v-model="value2" :options="option2" />
        </van-dropdown-menu>
        <div class="seat">
            <div class="screen">
                <span>巨幕观影</span>
            </div>
            <div class="seat-opt">
                <div class="row">
                    <div>1</div>
                    <div>2</div>
                    <div>3</div>
                    <div>4</div>
                    <div>5</div>
                    <div>6</div>
                    <div>7</div>
                    <div>8</div>
                </div>
                <div class="seat-num">
                    <ul v-for="(item, index) in seat" class="seat-row">
                        <li v-for="(seatn, num) in item.rows" class="num" @click="toChange(seatn)">
                            <span :class="{my:seatn.isMy}"></span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="my-seat">
            <span v-for="(item, index) in myseat">{{item}}</span>
        </div>
        <div class="bay">
            <van-button type="primary" v-if="change" @click="toBay()">￥{{this.price}} 确认选座</van-button>
            <van-button disabled type="primary" color="#ffb75c" v-else>请先选座</van-button>
        </div>
    </div>
</template>

<script>
    import '../assets/less/bay.less'
    export default {
        name:"Bay",
        
        data() {
            return {
                Thnm:"",
                Thaddr:"",
                Mvnm:"",
                Mvimg:"",
                value1: 0,
                value2: 0,
                option1: [
                    { text: '', value: 0 },
                    { text: '', value: 1 },
                    { text: '', value: 2 },
                ],
                option2: [
                    { text: '10:45', value: 0 },
                    { text: '13:20', value: 1 },
                    { text: '15:55', value: 2 },
                    { text: '18:25', value: 3 },
                    { text: '20:55', value: 4 },
                ],
                change:false,
                price:0,
                seat:[
                    {
                        rows:[
                            {
                                s:"1排1座",
                                isMy:false
                            },
                            {
                                s:"1排2座",
                                isMy:false
                            },
                            {
                                s:"1排3座",
                                isMy:false
                            },
                            {
                                s:"1排4座",
                                isMy:false
                            },
                            {
                                s:"1排5座",
                                isMy:false
                            },
                            {
                                s:"1排6座",
                                isMy:false
                            },
                            {
                                s:"1排7座",
                                isMy:false
                            },
                            {
                                s:"1排8座",
                                isMy:false
                            },
                            {
                                s:"1排9座",
                                isMy:false
                            },
                        ]
                        // one:"1排1座",
                        // two:"1排2座",
                        // three:"1排3座",
                        // four:"1排4座",
                        // five:"1排5座",
                        // six:"1排6座",
                        // seven:"1排7座",
                        // eight:"1排8座",
                        // nine:"1排9座"
                    },
                    {
                        rows:[
                            {
                                s:"2排1座",
                                isMy:false
                            },
                            {
                                s:"2排2座",
                                isMy:false
                            },
                            {
                                s:"2排3座",
                                isMy:false
                            },
                            {
                                s:"2排4座",
                                isMy:false
                            },
                            {
                                s:"2排5座",
                                isMy:false
                            },
                            {
                                s:"2排6座",
                                isMy:false
                            },
                            {
                                s:"2排7座",
                                isMy:false
                            },
                            {
                                s:"2排8座",
                                isMy:false
                            },
                            {
                                s:"2排9座",
                                isMy:false
                            },
                        ]
                    },
                    {
                        rows:[
                            {
                                s:"3排1座",
                                isMy:false
                            },
                            {
                                s:"3排2座",
                                isMy:false
                            },
                            {
                                s:"3排3座",
                                isMy:false
                            },
                            {
                                s:"3排4座",
                                isMy:false
                            },
                            {
                                s:"3排5座",
                                isMy:false
                            },
                            {
                                s:"3排6座",
                                isMy:false
                            },
                            {
                                s:"3排7座",
                                isMy:false
                            },
                            {
                                s:"3排8座",
                                isMy:false
                            },
                            {
                                s:"3排9座",
                                isMy:false
                            },
                        ]
                    },
                    {
                        rows:[
                            {
                                s:"4排1座",
                                isMy:false
                            },
                            {
                                s:"4排2座",
                                isMy:false
                            },
                            {
                                s:"4排3座",
                                isMy:false
                            },
                            {
                                s:"4排4座",
                                isMy:false
                            },
                            {
                                s:"4排5座",
                                isMy:false
                            },
                            {
                                s:"4排6座",
                                isMy:false
                            },
                            {
                                s:"4排7座",
                                isMy:false
                            },
                            {
                                s:"4排8座",
                                isMy:false
                            },
                            {
                                s:"4排9座",
                                isMy:false
                            },
                        ]
                    },
                    {
                        rows:[
                            {
                                s:"5排1座",
                                isMy:false
                            },
                            {
                                s:"5排2座",
                                isMy:false
                            },
                            {
                                s:"5排3座",
                                isMy:false
                            },
                            {
                                s:"5排4座",
                                isMy:false
                            },
                            {
                                s:"5排5座",
                                isMy:false
                            },
                            {
                                s:"5排6座",
                                isMy:false
                            },
                            {
                                s:"5排7座",
                                isMy:false
                            },
                            {
                                s:"5排8座",
                                isMy:false
                            },
                            {
                                s:"5排9座",
                                isMy:false
                            },
                        ]
                    },
                    {
                        rows:[
                            {
                                s:"6排1座",
                                isMy:false
                            },
                            {
                                s:"6排2座",
                                isMy:false
                            },
                            {
                                s:"6排3座",
                                isMy:false
                            },
                            {
                                s:"6排4座",
                                isMy:false
                            },
                            {
                                s:"6排5座",
                                isMy:false
                            },
                            {
                                s:"6排6座",
                                isMy:false
                            },
                            {
                                s:"6排7座",
                                isMy:false
                            },
                            {
                                s:"6排8座",
                                isMy:false
                            },
                            {
                                s:"6排9座",
                                isMy:false
                            },
                        ]
                    },
                    {
                        rows:[
                            {
                                s:"7排1座",
                                isMy:false
                            },
                            {
                                s:"7排2座",
                                isMy:false
                            },
                            {
                                s:"7排3座",
                                isMy:false
                            },
                            {
                                s:"7排4座",
                                isMy:false
                            },
                            {
                                s:"7排5座",
                                isMy:false
                            },
                            {
                                s:"7排6座",
                                isMy:false
                            },
                            {
                                s:"7排7座",
                                isMy:false
                            },
                            {
                                s:"7排8座",
                                isMy:false
                            },
                            {
                                s:"7排9座",
                                isMy:false
                            },
                        ]
                    },
                    {
                        rows:[
                            {
                                s:"8排1座",
                                isMy:false
                            },
                            {
                                s:"8排2座",
                                isMy:false
                            },
                            {
                                s:"8排3座",
                                isMy:false
                            },
                            {
                                s:"8排4座",
                                isMy:false
                            },
                            {
                                s:"8排5座",
                                isMy:false
                            },
                            {
                                s:"8排6座",
                                isMy:false
                            },
                            {
                                s:"8排7座",
                                isMy:false
                            },
                            {
                                s:"8排8座",
                                isMy:false
                            },
                            {
                                s:"8排9座",
                                isMy:false
                            },
                        ]
                    },
                ],
                myseat:[],
                i:0,
                sellPrice:0,
                myMovie:[],
            }
        },
        created() {
            this.Thnm = this.$route.params.Tnm;
            this.Thaddr = this.$route.params.Taddr;
            this.Mvnm = this.$route.params.Mnm;
            this.sellPrice = this.$route.params.prices;
            this.Mvimg = this.$route.params.Mimg;
            // this.myMovie = JSON.parse(localStorage.getItem('myMovie'))
            console.log(this.Mvimg)
            this.toTime();
        },
        methods: {
            goState(){
                this.$router.push({name:'Cinema',params:{movieId:""}})
            },
            toTime(){
                var date = new Date();
                var year = date.getFullYear();
                var Month = date.getMonth()+1;
                var dates = date.getDate();
                console.log(year+"-"+Month+"-"+dates);
                for(var i=0;i<this.option1.length;i++){
                    this.option1[i].text=year+"-"+Month+"-"+(dates+i);
                }
            },
            toChange(seatn){
                if(this.i<5){
                    if(!seatn.isMy){
                        seatn.isMy=true;
                        this.i++;
                        this.myseat.push(
                            seatn.s
                        );
                        console.log(this.myseat)
                        this.price=this.sellPrice*this.i;
                        this.change=true;
                    }else{
                        seatn.isMy=false
                        this.i--;
                        this.price=this.sellPrice*this.i;
                        console.log(this.i)
                        if(this.i==0){
                            this.change=false;
                        }
                        for(var j=0;j<this.myseat.length;j++){
                            if(seatn.s==this.myseat[j]){
                                this.myseat.splice(j,1);
                            }
                        }
                    }
                }else{
                    if(seatn.isMy==true){
                        seatn.isMy=false
                        this.i--;
                        this.price=this.sellPrice*this.i;
                        for(var j=0;j<this.myseat.length;j++){
                            if(seatn.s==this.myseat[j]){
                                this.myseat.splice(j,1);
                            }
                        }
                    }else{
                        this.$toast("一次最多购买5张");
                    }
                    console.log(this.i)
                    
                }
            },
            toBay(){
                var arr = JSON.parse(localStorage.getItem("myMovie"));
                if(arr == null){
                    this.myMovie.push({
                        nm:this.Mvnm,
                        img:this.Mvimg,
                        thnm:this.Thnm,
                        thaddr:this.Thaddr,
                        prices:this.price,
                        seats:this.myseat.toString(),
                        times:this.option1[this.value1].text+" "+this.option2[this.value2].text,
                    });
                    localStorage.setItem('myMovie',JSON.stringify(this.myMovie));
                    this.$toast("成功买票");
                }else{
                    this.myMovie = arr;
                    this.myMovie.push({
                        nm:this.Mvnm,
                        img:this.Mvimg,
                        thnm:this.Thnm,
                        thaddr:this.Thaddr,
                        prices:this.price,
                        seats:this.myseat.toString(),
                        times:this.option1[this.value1].text+" "+this.option2[this.value2].text,
                    });
                    localStorage.setItem('myMovie',JSON.stringify(this.myMovie));
                }
                console.log(this.option1[this.value1].text+" "+this.option2[this.value2].text);
                console.log(this.myMovie);
                this.$router.push({name:'Gomovie'})
            }
        },
    }
</script>