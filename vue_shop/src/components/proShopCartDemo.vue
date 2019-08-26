<template>
  <div >
  
  	<!--搜索框-->
		<van-search
		  v-model="searchvalue"
		  placeholder="可以查询aaa bbb ccc"
		  show-action
		  shape="round"
		  @search="onSearch"
		>
		  <div slot="action" @click="onSearch">搜索</div>
		</van-search>

		<!--轮播图-->
  	<van-swipe :autoplay="1000" class="sliderDiv">
		  <van-swipe-item v-for="(image, index) in sliderImgs" :key="index">
		    <img v-lazy="image" />
		  </van-swipe-item>
		</van-swipe>

		<!--商品列表-->
		<van-tabs sticky v-for="(itemObj, inx) in goodsObj" 
			 class="wrapDiv cle goodsList" :key=inx>
		  <van-tab  :title='itemObj.n'  :key=inx>
		   <li v-for="goods in itemObj.goodsList_aa" @click="goodsProductFn(goods)">
					<label><img :src="goods.img"/></label>
					{{goods.name}}/￥{{goods.price}}
				</li>
				
				<li v-for="goods in itemObj.goodsList_bb"  @click="goodsProductFn(goods)">
					<label><img :src="goods.img"/></label>
					{{goods.name}}/￥{{goods.price}}
				</li>
				
				<li v-for="goods in itemObj.goodsList_cc"  @click="goodsProductFn(goods)">
					<label><img :src="goods.img"/></label>
					{{goods.name}}/￥{{goods.price}}
				</li>
				
				<li v-for="goods in itemObj.goodsList_dd"  @click="goodsProductFn(goods)">
					<label><img :src="goods.img"/></label>
					{{goods.name}}/￥{{goods.price}}
				</li>
		  </van-tab>
		</van-tabs>

		<footerBar></footerBar>

  </div>
</template>

<script>
import axios from 'axios'
import API_LIST from '@/APIList.config'
import footerBar from './footerBar'

export default {
  name: 'proShopCartDemo',
  data () {
    return {
      msg: '首页',
      txt_data:'',
     
      isLogin:true,
      //所有的商品总的数据，包括，栏目，栏目所属的商品
      goodsObj:'',
      searchvalue:'',
      sliderImgs:'',
   
      
    }
  },
  components:{footerBar},
  created(){
  	//轮播图
  	axios.get(API_LIST.getImgUrls)
  	.then(_d=>{
  		this.sliderImgs=_d.data.urls
  	})
  	
  	if(	localStorage.userName){
  		let _str=JSON.parse(localStorage.userName);
  		
  		this.$notify(_str.username+'您已经登陆，欢迎回来');
  		this.isLogin=false;
  		//转为json读取 		
  		this.msg ='首页:'+_str.username;

  	}
  	
  	//查询所有栏目及所属的商品
  	this.getGoodsCategoryFn()
  },

  methods:{
  	//商品详情页_goodsObj
  	goodsProductFn(_self){
  		//console.log(_self)
  		this.$router.push({
  			name:'goodsProduct',
  			query:{
  				_goodsObjId:_self._id,
  				_collectionName:_self.category
  			}
  		});
  	},
		//查询所有栏目及所属的商品
  	getGoodsCategoryFn(){
  		axios.get(API_LIST.getGoodsCategory)
  		.then(_d=>{
  			//console.table(_d.data)
  			this.goodsObj=_d.data;
  			//console.log(this.goodsObj);
  		})
  	},
  	//退出登陆
  	logOutbtn(){
  		localStorage.userName='';
  			this.$notify(localStorage.userName+'您已经退出登陆');
  		this.isLogin=true
  	},
  	
  	//登陆
  	loginBtn(){
  		this.$router.push({path:'/userLogin'});
  	},
  	//注册
  	registerBtn(){
  		this.$router.push({path:'/register'});
  	},
  	onSearch(){
  		console.log(this.searchvalue);
  		let _v=this.searchvalue;
  		if(_v===''|| _v===undefined){
  			this.$notify('查询条件不能为空');
  		}else{
  			axios.get(API_LIST.node_a,{
  			params:{v_data:_v}
  		})
  			.then(_d=>{
  				this.getBtn();
  			})
  		}
  	},
  	getBtn(){
  		axios.get(API_LIST.node_b)
  			.then(_d=>{
  				console.log(_d.data);
  				this.txt_data=_d.data[0].id;
  				this.$notify(_d.data[0].id);
  			})

  	}
  	
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h1, h2 {
        font-weight: normal;
      }
      ul {
        list-style-type: none;
        padding: 0;
      }
      li {
        display: inline-block;
        margin: 0 10px;
      }
      a {
        color: #42b983;
      }
      .cle:after{
        content: '.';
        overflow: hidden;
        visibility: hidden;
        height: 0;
        display: block;
        clear: both;
      }
      .wrapDiv{
        width: 80%;overflow: hidden;border: 1px solid #666;
        background: #eee;border-radius: 10px;
        margin:10px auto;
      }
      .wrapDiv p.tip{
        font-size: 22px;text-align: center;padding: 0;margin:5px 0;color: #666;
      }
      .leftDiv{
        float: left;width: 60%;margin:10px;
        border-radius: 10px;border:1px solid #999;
        padding:10px;line-height: 30px;text-align: center;
        font-size: 22px;
      }
      .rightDiv{
        float: right;width: 20%;margin:10px;
        border-radius: 10px;border:1px solid #999;
        padding:10px;line-height: 30px;text-align: center;
        font-size: 22px;
      }
      .sliderDiv{
        width: 80%;margin:10px auto;
      }
      .sliderDiv img{width:100%;height:188px;}

      .goodsEntry{
        width: 80%;
        margin:10px auto;padding:10px;
        border-radius: 10px;border:1px solid #999;
        line-height: 30px;text-align: center;
        font-size: 16px;
      }
       .goodsList{}
      .goodsList li{
          float: left;width: 49%;
          overflow: hidden;margin:0 0 10px 0;
        }
      .goodsList li label{
            width: 100px;height: 115px;display: block;overflow: hidden;
            margin:0 auto;padding:0;text-align: center;position: relative;
            border:1px solid #666;
      }
      .goodsList li img{
        height: 100%;
        position: absolute;top: -5px;left: 0;
        clear: both;display: block;margin:5px auto;padding:0;
      }
      .goodsList h1.goodsTitle{
           clear: both;margin:5px auto;font-size: 22px;border-radius: 5px;
           background: #5d5d5d;width: 50%;color: #fff;padding:3px 0;
      }
       .sliderDiv{
        width: 90%;margin:10px auto;
      }
      .sliderDiv img{width:100%;height:188px;}
</style>