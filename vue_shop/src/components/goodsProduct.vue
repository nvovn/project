<template>
  <div > 
		<van-nav-bar
		  :title=msg
		  left-text="返回"	 
		  left-arrow
		  @click-left="goBack"
		/>
		<div class="goodsImgWrap">
			<img :src=goodsImgUrl />
			
		</div>
		<p>{{goodsTitle}},{{describe}},￥{{price}}</p>
 		
 		<van-sku
		  v-model="showBase"
		  :sku="sku"
		  :goods="goods"
		  :goods-id="goodsId"
		  :quota=0
		  :quota-used=0
		  :hide-stock="sku.hide_stock"
		  :message-config={}
			@sku-selected="switchProductType"
			@add-cart="onAddCartFn"
		/>
 		
 		<!--footer底栏-->
 		<van-goods-action>
		  <van-goods-action-icon
		    icon="chat-o"
		    text="客服"
		     @click="onHelpBtn"
		  />
		  <van-goods-action-icon
		  	:info=cartGoods_min_num
		    icon="cart-o"
		    text="购物车"
		     @click="gotoCartBtn"
		  />
		  <van-goods-action-button
		    type="warning"
		    text="加入购物车"
		    @click="onClickBigBtn"
		  />
		  <van-goods-action-button
		    type="danger"
		    text="立即购买"
		  />
		</van-goods-action>
 		
  </div>
 
</template>
<script>
import axios from 'axios'
import API_LIST from '@/APIList.config'
import footerBar from './footerBar'

export default{
	name:'goodsProduct',
	data(){
		return{
			msg:'产品详情页',
			goodsTitle:'',
			goodsImgUrl:'',
			describe:'',
			price:'',
			showBase:false,
			goods:{},
			goodsId:'',
			cartGoods_min_num:0,
			sku: {
				  tree: [
				    {
				      k: '产品类别', // skuKeyName：规格类目名称
				      v: [
				        {
				          id: '30349', // skuValueId：规格值 id
				          name: '红色', // skuValueName：规格值名称
				          imgUrl: 'https://img.yzcdn.cn/1.jpg' // 规格类目图片，只有第一个规格类目可以定义图片
				        },
				        {
				          id: '1215',
				          name: '蓝色',
				          imgUrl: 'https://img.yzcdn.cn/2.jpg'
				        }
				      ],
				      k_s: 's1' // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
				    }
				  ],
			  list: [
				    {
				      id: 2259, // skuId，下单时后端需要
				      price: 100, // 价格（单位分）
				      s1: '1215', // 规格类目 k_s 为 s1 的对应规格值 id
				      s2: '1193', // 规格类目 k_s 为 s2 的对应规格值 id
				      s3: '0', // 最多包含3个规格值，为0表示不存在该规格
				      stock_num: 110 // 当前 sku 组合对应的库存
				    }
				  ],
				  price: '', // 默认价格（单位元）
				  stock_num: 227, // 商品总库存
				  hide_stock: false // 是否隐藏剩余库存
			},
		}
	},
	created(){
		console.log(this.$route.query);
		let _goodsId=this.$route.query._goodsObjId;
		let _collectionName = this.$route.query._collectionName;
		
		this.getGoodsInfoFn(_goodsId,_collectionName);
		
		//这是给sku的
		this.goodsId=_goodsId;
		
		//页面杠打开时，要加载之前保存的产品数据
		//你保存的时字符，所有要JSON.parse转为对象
		var xx=localStorage.cartDataInfo
								?JSON.parse(	localStorage.cartDataInfo)
								:[];
		console.log(xx);
		//localStorage.removeItem('cartDataInfo');
		
		//当前购物车中商品总数
	this.total_cartGoodsNum()
	},
	methods:{
		//切换产品类型是触发的方法
		switchProductType(){
			this.sku.list[0].price = this.sku.price;
		},
		//添加到购物车
		onAddCartFn(_d){
			//在真正的生产环境中，这个_d的数据是要发给后端接口的
			//console.log(_d)
			
			//cart数据中，是否有相同的产品			
			let _isTrue =false;
			let _tempObj={
				_id:_d.goodsId,
				_price:this.price,
				_num:_d.selectedNum,
				_goodsName:this.goodsTitle,
				_img:this.goodsImgUrl
			}
			
			//已经保存在本地存储中的数据
			let _cartData=localStorage.cartDataInfo
								?JSON.parse(	localStorage.cartDataInfo)
								:[];
			console.log(_cartData);
			for(let i=0;i<_cartData.length;i++){
				if(_cartData[i]._id===_tempObj._id){
					_cartData[i]._num+=_tempObj._num;
					_isTrue=true;
					break;
				}
			}
			//没有相同的，才直接push
			if(!_isTrue){
				_cartData.push(_tempObj)
			}
			
			//console.log(_tempObj);
			//_tempObj是js字符，要转为字符才能存进去
			localStorage.cartDataInfo = JSON.stringify(_cartData)
			this.$dialog.alert({
		      message: '成功加入购物车！'
		   }).then(()=>{
		   	this.showBase=false;
		   	this.total_cartGoodsNum();
		   });
		
		},
		//当前购物车中商品总数
		total_cartGoodsNum(){
			let _temp=localStorage.cartDataInfo
								?JSON.parse(	localStorage.cartDataInfo)
								:[];
			let _n = 0;
			for(let i=0;i<_temp.length;i++){
				_n +=_temp[i]._num;
			}
			this.cartGoods_min_num=_n;
		},
		//根据Id，获得对应商品信息
		getGoodsInfoFn( _gId, _collectionName ){
			axios.get( API_LIST.getGoodsInfo,{
					params:{
						_id: _gId,
						_c:_collectionName
					}
				})
				.then( _d=>{
					//console.log( _d.data );
					this.goodsTitle= _d.data.name;
					this.goodsImgUrl= _d.data.img;
					this.describe= _d.data.describe;
					this.price= _d.data.price;
					
					//给goods的
					this.goods.title=_d.data.name;
					this.goods.picture=_d.data.img;
					this.sku.price=_d.data.price;
				});
		},
		//切换产品的类型
		switchProductType(){
			this.sku.list[0].price=this.sku.price
		},
		//加入购物车
				onClickBigBtn(){
			//console.log('jiaru')
			this.showBase=true;
		},
		//跳转购物车页面
		gotoCartBtn(){
			this.$router.push({path:'/cart'});
		},
		goBack(){
			this.$router.go(-1);
		},
		onHelpBtn(){
			this.$dialog.alert({
		      message: '客服忙碌，请稍后！'
		   })
		}

	}
}
</script>
<style scoped>
	.goodsImgWrap{
		width: 100%;height: 350px;overflow: hidden;margin:0 auto;
	}
	.goodsImgWrap img{ width: 100%;height: 350px; }
</style>