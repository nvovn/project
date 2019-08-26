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
	
		  />
		  
		  <van-field
		    v-model="password"
		    type="password"
		    required
		    clearable
		    label="密码"
		    placeholder="请输入密码"
		    @click-right-icon="username=''"

		  />

		  
			<van-button type="info" @click="userLoginFn">登陆</van-button>
			<van-button type="info" @click="registerBtn">注册</van-button>
			<footerBar></footerBar>
			
  </div>
 
</template>
<script>
import axios from 'axios'
import API_LIST from '@/APIList.config'
import footerBar from './footerBar'


export default{
	name:'userLogin',
	data(){
		return{
			msg:'登陆页面',
			
			username:'',
			password:''
		}
	},
	 components:{footerBar},
	methods:{
		//返回
		goBackFn(){
			this.$router.go(-1);	
		},
		//跳转到注册页
		registerBtn(){
			this.$router.push({path:'/register'});
		},
		
		userLoginFn(){
			let _loginObj={
				u:this.username,
				p:this.password
			}
			axios.post(API_LIST.userLogin_post,_loginObj)
			.then(_d=>{
				console.log(_d.data);
				
		 		this.$dialog.alert({
		      message: '欢迎您：'+_d.data.regInfo.username + ',登陆成功'
		    }).then(()=>{
		    	//登陆成功，回到首页
		    	if(_d.data.reg_code === 3){
		    		//转为字符串
		    		localStorage.userName = JSON.stringify(_d.data.regInfo) ;
		    	}
		    	
		    	//回到首页
		    	this.$router.push({path:'/'},()=>{
							localStorage.setItem('inxState',0);
						});
		    });
			})
		}
	}
}
</script>