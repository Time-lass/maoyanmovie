import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'

import 'lib-flexible/flexible'

import {
   Button,
   NavBar,
   Form,
   Field,
   Popup,
   IndexBar,
   IndexAnchor,
   Cell,
   CellGroup,
   Row,
   Icon,
   Tab,
   Tabs,
   List,
   Toast,
   DropdownMenu,
   DropdownItem
} from 'vant'

Vue
  .use(Button)
  .use(NavBar)
  .use(Form)
  .use(Field)
  .use(Popup)
  .use(IndexBar)
  .use(IndexAnchor)
  .use(Cell)
  .use(CellGroup)
  .use(Row)
  .use(Icon)
  .use(Tab)
  .use(Tabs)
  .use(List)
  .use(Toast)
  .use(DropdownItem)
  .use(DropdownMenu)

//设置Vue原型属性
Vue.prototype.appkey = 'U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=';

//配置请求基础路径
axios.defaults.baseURL = 'http://www.kangliuyong.com:10002';

//axios拦截器，在发起请求之前执行
axios.interceptors.request.use(config => {

  //处理post请求参数, 进行参数序列化
  if (config.method == 'post') {

    //序列化post请求参数
    let paramsString = '';
    for (let key in config.data) {
      paramsString += `${key}=${config.data[key]}&`;
    }

    //重新赋值config.data
    config.data = paramsString.slice(0, -1);

    // console.log('config.data ==> ', config.data);

  }

  //必须返回config
  return config;
})

Vue.use(VueAxios, axios)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
