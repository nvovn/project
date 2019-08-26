<template>
	<div>
		<van-nav-bar
			:title=msg
			left-text="返回"
			 right-text="清空购物车"
			left-arrow
			@click-left="goBack"
			 @click-right="cartEmptyFn"
		/>

		<div class="goodsDiv" v-for="item in shopCartList">
			<label> <img :src=item._img /> </label>
			<h2> {{item._goodsName}}，数量{{item._num}} ，单价{{item._price}} </h2>
			<!-- async-change=true必须是异步，否则将计算点击之前的值 -->
			<van-stepper v-model="item['_num']" 
				:async-change=true
				@plus="addBtnFn"
				@minus="minusBtnFn"
				/>
		</div>
		
		<!--price价格时分 -->
		<van-submit-bar
		  :price=allGoodsMoney*100
		  :button-text=submiText
		  @submit="onSubmit"
		  
		/>
		<h1 v-if="isCartEnpty">当前购物车是空的，请去添加商品吧</h1>

	</div>
  </div>
 
</template>
<script>
import axios from 'axios'
import API_LIST from '@/APIList.config'
import { Toast } from 'vant';
import{mapGetters,mapActions} from 'vuex'

export default{
	name:'cart',
	data(){
		return{
			msg:'购物车',
			cartArr:'',
			allGoodsNum:0,
			submiText:'',
			allGoodsMoney:0,
			isCartEnpty:false,

		}
	},
	created(){
		
		this.cartArr=localStorage.cartDataInfo
								?JSON.parse(	localStorage.cartDataInfo)
								:[];
		
		if(this.cartArr.length===0){
			this.isCartEnpty=true;
		}
		
		console.log(this.cartArr);
		//console.log(cartArr[0]._goodsName);
		//计算所有商品总数
		this.countAllGoodsNum();
		this.countAllGoodsMoney();
		
		//vuex，this.cartArr就是购物车中的商品
		this.addToVuex(this.cartArr)
	},
	computed:{
		//映射数据，从cart里的getter里
		...mapGetters(['shopCartList'])
	},
	methods:{
		//映射事件
		...mapActions(['addToVuex']),
		//去结账按钮
		onSubmit(){
			this.$dialog.alert({
		      message: '共'+ this.allGoodsNum+'个商品，总计'+this.allGoodsMoney+'元',
		   }).then(()=>{
		   		Toast.success('支付成功');
		   });
		},
		//清空购物车
		cartEmptyFn(){
			this.cartArr=localStorage.removeItem('cartDataInfo');
			this.submiText='去结账(0)';
			this.allGoodsMoney =0;
			this.isCartEnpty=true;
		},
		//计算所有商品总数
		countAllGoodsNum(){
			this.allGoodsNum=0;
			for(let i=0;i<this.cartArr.length;i++){
				this.allGoodsNum+=this.cartArr[i]._num;
			}
			this.submiText='去结账'+(this.allGoodsNum);
		},
		//计算所有商品的总价
		countAllGoodsMoney(){
			this.allGoodsMoney=0;
				for(let i=0;i<this.cartArr.length;i++){
				this.allGoodsMoney += this.cartArr[i]._num*this.cartArr[i]._price;
			}
		},
		goBack(){
			this.$router.push({path:'/'},()=>{
						localStorage.setItem('inxState',0);
					});
			},
			addBtnFn(){
				this.countAllGoodsNum();
				this.countAllGoodsMoney();
			},
			minusBtnFn(){
					this.countAllGoodsNum();
					this.countAllGoodsMoney();
			},
	}
}
</script>
<style scoped>
	.pr{position: relative;}
      .pa{position: absolute;}
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
      h2.title{font-size: 20px;text-align: center;}
      .cle:after{
        content: '.';
        overflow: hidden;
        visibility: hidden;
        height: 0;
        display: block;
        clear: both;
      }
	.goodsDiv{
		width: 95%;margin:5px auto;clear: both;
	}
	.goodsDiv label{
		float: left;width: 100px;height: 100px;
		overflow: hidden;border:1px solid #ddd;border-radius: 10px;
	}
	.goodsDiv label img{
		width: 100px;height: 100px;
	}
	.goodsDiv h2{font-size: 22px;}
</style>