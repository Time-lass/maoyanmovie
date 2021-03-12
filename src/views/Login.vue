<template>
    <div class="login">
        <van-nav-bar
            title="猫眼电影"
            left-arrow
            class="head"
            @click-left="goState"
        />

        <!-- 顶部LOGO -->
        <div class="login_Logo">
            <div class="maoyan"></div>
        </div>

        <!-- 登录方式选择 -->
        <div class="login_method">
            <ul class="method">
                <li v-for="(item, index) in methods" @touchstart="start(item)" @touchend="end(item)" :class="{down:item.isdown}">
                    <span>
                        {{item.title}}
                    </span>
                </li>
                <li class="box">
                    <div class="select" :class="{toright:istoright}"></div>
                </li>
            </ul>
        </div>

        <!-- 账号密码登录 -->
        <div :class="{account:isAccount}">
            <van-form>
                <van-field
                    v-model="userInfo.phone"
                    name="用户名"
                    placeholder="账户名/手机号/Email"
                />
                <van-field
                    v-model="userInfo.password"
                    type="password"
                    name="密码"
                    placeholder="密码"
                />
                <div style="margin: 16px;">
                    <van-button size="small" block type="info" native-type="submit" color="#df2d2d" @click="login">
                    登录
                    </van-button>
                </div>
            </van-form>
        </div>

        <!-- 手机号码验证登录 -->
        <div :class="{handset:isHandset}">
            <van-form>
                <van-field
                    v-model="handInfo.cellnum"
                    type="cellnum"
                    name="手机号"
                    placeholder="请输入手机号"
                    @keyup="animate()"
                >
                    <template #button>
                        <van-button size="mini" plain :disabled="handInfo.disab" type="primary" color="#e13838">发送验证码</van-button>
                    </template>
                </van-field>
                <van-field
                    v-model="handInfo.code"
                    type="code"
                    name="密码"
                    placeholder="请输入短信验证码"
                    disabled
                />
                <div style="margin: 16px;">
                    <van-button size="small" block :disabled="handInfo.disab" type="info" native-type="submit" color="#df2d2d">
                    登录
                    </van-button>
                </div>
            </van-form>
        </div>
        
        <!-- 注册与找回密码 -->
        <ul class="subline">
            <!-- 账号注册 -->
            <li @click="toggleRegisterBox">
                <a>账号注册</a>
            </li>

            <!-- 找回密码 -->
            <li class="right">
                <a>找回密码</a>
            </li>
        </ul>
        <!-- 注册 -->
        <van-popup class="register-box" v-model="isShow" position="bottom" closeable>
            <div class="register-title">注册</div>
            <van-form>

                <van-field
                    v-model="userRegisterInfo.phone"
                    name="手机号"
                    label="手机号"
                    placeholder="11位手机号"
                    autocomplete="off"
                />

                <van-field
                    v-model="userRegisterInfo.password"
                    :type="isRegisterPassword ? 'password' : 'text'"
                    name="密码"
                    label="密码"
                    placeholder="密码必须为字母开头"
                    :right-icon="isRegisterPassword ? 'closed-eye' : 'eye-o'" 
                    autocomplete="off"
                    @click-right-icon="toggleRegsiterPasswordType"
                />

                <div class="commit-btn register-btn">
                <van-button round block color="#df2d2d" @click="register">
                    注册
                </van-button>
                </div>
            </van-form>
        </van-popup>
    </div>
</template>

<script>
    //导入外部样式表
    import '../assets/less/login.less'
    //导入表单验证模块
    import {validForm} from '../assets/js/validForm'
    export default {
        name:'Login',
        data(){
            return{
                methods:[
                    {
                        title:'美团账号登录',
                        num:0,
                        isdown:false
                    },
                    {
                        title:'手机验证登录',
                        num:1,
                        isdown:false
                    }
                ],
                istoright:false,

                //用户账号登录信息
                isAccount:false,
                userInfo:{
                    phone: '',
                    password: ''
                },

                //用户注册信息
                userRegisterInfo: {
                    phone: '',
                    password: ''
                },
                //用户手机登录
                isHandset:true,
                handInfo:{
                    cellnum:'',
                    code:'',
                    //发送验证码是否允许使用
                    disab:true

                },
                //是否显示注册框
                isShow: false, 
                //切换注册密码框的类型
                isRegisterPassword: true
            };
        },

        methods:{
            //选择登录方式
            start(item){
                if(item.num==1){
                    this.istoright = true;
                    this.isAccount = true;
                    this.isHandset = false;
                }else if(item.num==0){
                    this.istoright = false;
                    this.isAccount = false;
                    this.isHandset = true;
                }
                item.isdown = true;
            },
            end(item){
                item.isdown = false
            },

            // 手机号是否正确选择
            animate(){
                var re=/^((13[0-9])|(17[0-1,6-8])|(15[^4,\\D])|(18[0-9]))\d{8}$/;
                let str = this.handInfo.cellnum;
                if(re.test(str)){
                    this.handInfo.disab=false;
                }else{
                    this.handInfo.disab=true;
                }
            },
            //切换注册框
            toggleRegisterBox() {
                this.isShow = true;
            },
            //切换注册密码框的类型
            toggleRegsiterPasswordType() {
                this.isRegisterPassword = !this.isRegisterPassword;
            },
            //注册
            register() {
                //构造表单验证信息
                let o = {
                    username: {
                        value: this.userRegisterInfo.phone,
                        errorMsg: '手机号格式不正确',
                        reg: /^1[3-9]\d{9}$/
                    },
                    password: {
                        value: this.userRegisterInfo.password,
                        errorMsg: '密码由数字字母下划线组合(6-16字符)',
                        reg: /^[A-Za-z]\w{5,15}$/
                    }
                };
                let isPass = validForm.valid(o);

                if (isPass) {

                    // console.log('this.appkey ==> ', this.appkey);

                    //复制用户注册信息
                    let userInfo = Object.assign({}, this.userRegisterInfo);
                    userInfo.appkey = this.appkey;
                    console.log('userInfos ==> ', userInfo);
                    console.log('this.userRegisterInfo ==> ', this.userRegisterInfo);

                    //启动加载提示
                    this.$toast.loading({
                        //文本提示
                        message: '加载中...',
                        //禁止穿透点击
                        forbidClick: true,
                        //提示时间, 0: 没有时间限制
                        duration: 0
                    });

                    //发起注册请求
                    this.axios({
                        //请求类型
                        method: 'POST',
                        //请求路径
                        url: '/register',

                        //POST请求参数, object
                        data: userInfo

                    }).then(result => {
                        //关闭加载提示
                        this.$toast.clear();

                        if (result.data.code == 100) {
                        this.isShow = false;
                        } else {
                        //如果注册失败，手机被注册了
                        this.$toast(result.data.msg);
                        }

                        // console.log('result ==> ', result);
                    }).catch(err => {
                        //关闭加载提示
                        this.$toast.clear();

                        console.log('err ==> ', err);
                    })

                }
            },

            //登录
            login() {
                //构造表单验证信息
                let o = {
                    phone: {
                        value: this.userInfo.phone,
                        errorMsg: '手机号格式不正确',
                        reg: /^1[3-9]\d{9}$/
                    },
                    password: {
                        value: this.userInfo.password,
                        errorMsg: '密码由数字字母下划线组合(6-16字符)',
                        reg: /^[A-Za-z]\w{5,15}$/
                    }
                };

                let isPass = validForm.valid(o);
                if (isPass) {
                //发起登录请求
                //复制用户注册信息
                let userInfo = Object.assign({}, this.userInfo);
                userInfo.appkey = this.appkey;

                this.$toast.loading({
                    message: '加载中...',
                    forbidClick: true,
                    duration: 0
                });

                //发起注册请求
                this.axios({
                    //请求类型
                    method: 'POST',
                    //请求路径
                    url: '/login',

                    //POST请求参数, object
                    data: userInfo

                }).then(result => {
                    this.$toast.clear();

                    console.log('result ==> ', result);

                    if (result.data.code == 200) {
                    //登录成功
                    //保存token, 以便后面验证登录
                    localStorage.setItem('id', result.data.token);
                    localStorage.setItem('username',this.userInfo.phone);

                    //其他操作
                    this.$router.push({name: 'Movie'});

                    } else {
                    this.$toast(result.data.msg);
                    }

                }).catch(err => {
                    this.$toast.clear();

                    console.log('err ==> ', err);
                })        


                }
            },
            goState(){
                this.$router.push({name:'Movie'})
            }
        }
    }
</script>

