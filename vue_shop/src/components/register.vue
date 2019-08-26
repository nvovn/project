<template>
  <div > 
   <van-nav-bar
		  :title=msg		 
		  left-text="返回"
		  left-arrow
			@click-left="goBackFn"
		/>
		
		  <van-field
		    v-model="username"
		    required
		    clearable
		    label="用户名"
		    placeholder="请输入用户名"
		    @click-right-icon="username=''"
		    :error-message="userErr"
		  />
		  
		  <van-field
		    v-model="password"
		    type="password"
		    required
		    clearable
		    label="密码"
		    placeholder="请输入密码"
		    @click-right-icon="username=''"
		    :error-message="passErr"
		  />
		  <van-field
		    v-model="password2"
		    type="password"
		    required
		    clearable
		    label="重复密码"
		    placeholder="请重复输入密码"
		    @click-right-icon="username=''"
		    :error-message="passErr2"
		  />
		  
		  <van-field
		    v-model="describe"
		    label="个人签名"
		    placeholder="请输入个人签名"	   
		  />
		  
			<van-button type="info" @click="registerFn">立即注册</van-button>
			<van-button type="info" @click="registerResetBtn">重置</van-button>
			
			<footerBar></footerBar>
  </div>
 
</template>
<script>
import axios from 'axios'
import API_LIST from '@/APIList.config'
import footerBar from './footerBar'

export default{
	name:'register',
	data(){
		return{
			msg:'注册页面',
			
			username:'',
			password:'',
			password2:'',
			describe:'',
			
			userErr:'',
			passErr:'',
			passErr2:''
		}
	},
	components:{footerBar},
	methods:{
		//返回
		goBackFn(){
			this.$router.go(-1);
		},
		//立即注册
		registerFn(){
			//每次重置err信息
			this.userErr='',
			this.passErr='',
			this.passErr2=''
			
			//注册
			let _registerObj={
				username:this.username,
				password:this.password,
				password2:this.password2,
				describe:this.describe
			}
			//用户注册的条件非常多
			if(_registerObj.username===''){
				this.userErr='用户名不能为空';
				return false;
			}
			
			if(_registerObj.password===''){
				this.passErr='密码不能为空';
				return false;
			}
			
			if(_registerObj.password2===''){
				this.passErr2='重复密码不能为空';
				return false;
			}
			if(_registerObj.password!==_registerObj.password2){
					this.passErr2='重复密码不一致';
					return false;
				}
			console.log(_registerObj);
			this.postRegisterObj(_registerObj);
		},
		//提交
		postRegisterObj(_registerObj){
			axios.post(API_LIST.register_post,_registerObj)
			.then(_d=>{
				console.log(_d.data);
			 this.$dialog.alert({
		      message: _d.data.regInfo
		    }).then(()=>{
		    	//注册成功回到首页
		    	this.$router.push({path:'/'});
		    });
			})
		},
		//重置
		registerResetBtn(){
			
		}
	}
}
</script>