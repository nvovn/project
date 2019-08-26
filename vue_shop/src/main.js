import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import{
	Button,NavBar,Field,Dialog,Notify,Tab,Tabs ,Tabbar, TabbarItem ,
	GoodsAction,Sidebar, SidebarItem,
  	GoodsActionIcon,Search,Lazyload,
  	GoodsActionButton,Pagination,
  	Sku,Stepper,SubmitBar,Toast,Swipe,SwipeItem, 
}from'vant'


Vue.use(Button).use(NavBar).use(Pagination)
		.use(Field).use(Dialog).use(Notify)
		.use(Tab).use(Tabs).use(Search)
		.use(Tabbar).use(TabbarItem).use(Sku)
		.use(GoodsAction).use(GoodsActionIcon)
		.use(Stepper).use(SubmitBar).use(Lazyload)
		.use(GoodsActionButton).use(Toast)
		.use(Sidebar).use(SidebarItem)
		.use(Swipe).use(SwipeItem);


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
