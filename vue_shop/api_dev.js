var express=require('express');
var app =express();
//引入mongoDB模块，获得它的客户端对象
var MongoClient = require('mongodb').MongoClient;
//mongoDB连接字符串
var DB_CONN_STR = 'mongodb://localhost:27017/';

// 解决跨域问题，网上成熟的解决方案，我是直接拷贝的
app.all('*', function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Method", "*");
    res.header("Access-Control-Allow-Headers","Content-Type");
    res.header("Access-Control-Max-Age", "3600");
    next();
});
//用来临时存数据
var _xxObj={
	arrs:[{
		id:'n1',
		name:'a_name',
		vals:'aaa'
	},{
		id:'n2',
		name:'b_name',
		vals:'bbb'
	},
	{
		id:'n3',
		name:'c_name',
		vals:'ccc'
	}]
}
var _filterResult=null;

//过滤方法
function filter(_val){
	return _xxObj.arrs.filter(_g=>{
		return _g.vals===_val
	})
}
//第一个nodeJs接口
app.get('/node_a',function(req,res){
	console.log(req.query.v_data);
	/*_xxObj = req.query.v_data;*/
	
	let _result =filter(req.query.v_data);
	_filterResult =_result.length!==0?_result:[{id:'xxx',name:'没有结果'} ]
	
	res.end();
});

//第二个接口, 发送
app.get('/node_b',function(req,res){
	/*console.log(req.query.xxval);
	_xxObj = req.query;*/
	res.send(_filterResult);
});

//用户注册信息req请求，res响应

app.post('/register_post',function(req,res){
	let _allData='';
	
	req.on('data',function(_d){
		_allData+= _d;
	}),
	req.on('end',function(){
		console.log(_allData);
		 let _registerMsg =JSON.parse(_allData);
		 //1、在注册新用户之前，先查询有没有同名
		 findSameNameFn(_registerMsg,res);
	});
});

//查询同名信息
function findSameNameFn(_registerMsg,res){
		 MongoClient.connect(DB_CONN_STR,function(err,db){
			//数据库名：proShopCart
			 var _dbo = db.db('proShopCart');
            // 集合名：userInfo
            var _collection = _dbo.collection( 'userInfo' );
            _collection.findOne({"username":_registerMsg.username},{}, function(err, result){
                if(err) throw err;
               if(result===null){
               	inserNewUserName(_registerMsg,res);
               	
               }else if(result.username=== _registerMsg.username){
           
               	 res.send({
                    regInfo:'名字已经存在！',
                    reg_code : 2
                });
               }             
                db.close();
			});
		});
}
//插入新用户注册的数据
function inserNewUserName(_registerMsg,res){
	
	 MongoClient.connect(DB_CONN_STR,function(err,db){
			//数据库名：proShopCart
			 var _dbo = db.db('proShopCart');
            // 集合名：userInfo
            var _collection = _dbo.collection( 'userInfo' );
            _collection.insertOne( _registerMsg, function(err, result){
                if(err) throw err;
                console.log('注册成功！');
                res.send({
                    regInfo:'注册成功！',
                    reg_code : 1
                })
                db.close();
			});
		});

}

//登陆功能
app.post("/userLogin_post",function(req,res){
	var _loginData ='';
	
	req.on('data',function(_d){
		_loginData +=_d;
	});
	
	req.on('end',function(_d){
		//console.log(JSON.parse(_loginData));
		let _tem =JSON.parse(_loginData);
		
		 MongoClient.connect(DB_CONN_STR,function(err,db){
			//数据库名：proShopCart
			 var _dbo = db.db('proShopCart');
            // 集合名：userInfo
            var _collection = _dbo.collection( 'userInfo' );
            
            _collection.findOne({"username":_tem.u},{}, function(err, result){
                if(err) throw err;
               
               if(result === null){
               	console.log('用户不存在')
               	return	res.send({
                    regInfo:'用户不存在',
                    reg_code : 5
                });
               }else if(_tem.p!==result.password){
               		console.log('密码不对')
               		return res.send({
                    regInfo:'密码不对',
                    reg_code : 4
                });
               }else if(result!==null&&_tem.p==result.password){
               		console.log('登陆成功')
               		return res.send({
                    regInfo:result,
                    reg_code : 3
                });
               }
               
               
                
                
                db.close();
			});
		});
	});
});


//批量录入商品
app.post('/insertGoods',function(req,res){
	var _dataObj='';
	
	req.on('data',function(_d){
		_dataObj +=_d;
	});
	req.on('end',function(_d){
		let _insertGoodsArrObg =JSON.parse(_dataObj);
		//console.log(_insertGoodsArrObg);
			 MongoClient.connect(DB_CONN_STR,function(err,db){
			//数据库名：proShopCart
			 var _dbo = db.db('proShopCart');
            // 商品集合名：goodsCategory
            var _collection = _dbo.collection( 'goodsCategory' );
            _collection.insertMany( _insertGoodsArrObg, function(err, result){
                if(err) throw err;
               
                res.send({
                    regInfo:'商品录入成功！',
                    reg_code : 5
                })
                db.close();
			});
		});

		
	});
});

// 获得商品列表-大类
app.get('/getGoodsCategory',function(req, res){
	MongoClient.connect( DB_CONN_STR, function(err, db){
		// 数据库名：proShopCart
		var _dbo = db.db('proShopCart');
		// 商品栏目集合名：goodsCategory
		var _collection = _dbo.collection( 'goodsCategory' );

		_collection.aggregate([{
			$lookup:{
				localField:'d',
				from:'goodsList_a',
				foreignField:'category',
				as:'goodsList_aa'
			}
		},{
			$lookup:{
				localField:'d',
				from:'goodsList_b',
				foreignField:'category',
				as:'goodsList_bb'
			}
		},{
			$lookup:{
				localField:'d',
				from:'goodsList_c',
				foreignField:'category',
				as:'goodsList_cc'
			}
		},{
			$lookup:{
				localField:'d',
				from:'goodsList_d',
				foreignField:'category',
				as:'goodsList_dd'
			}
		}]).toArray(function(err, result){
			if(err) throw err;

			return res.send( result );
			db.close();
		});
	});
});

//批量插入商品到DB，只运行一次，把商品插入到DB中就OK
function insertTempGoodsList(){
	
		let TempGoodsListObj=[{"name" : "奔驰", "price" : 22, "category" : "goodsList_c", "img" : "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1548498667503&di=e4c9c03a08ad310a4d7ee606f5a2750c&imgtype=0&src=http%3A%2F%2Fabc.2008php.com%2F2016_Website_appreciate%2F2016-01-29%2F20160129001721.jpg", "describe" : "产品说明xx123" },
{"name" : "宝马", "price" : 33, "category" : "goodsList_c", "img" : "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1548498729371&di=a5c603a57243a1d750808980703de6d9&imgtype=0&src=http%3A%2F%2Fassets.pushthink.com%2Fuploads%2Fphoto%2Fimage%2F372568%2F8d0d492f231a72036053639ffb250623.jpg", "describe" : "产品说明xx123" },
{"name" : "奥迪", "price" : 44, "category" : "goodsList_c", "img" : "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1548498776216&di=b371c5b5bed7ad944d82d7c57864a772&imgtype=0&src=http%3A%2F%2Fi.img16888.com%2Fupload%2FImages%2F2013%2F01%2F2013010604033930126.jpg", "describe" : "产品说明xx123" },
{"name" : "大众", "price" : 55, "category" : "goodsList_c", "img" : "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1548498827388&di=f0d0f3de9c7c88609de7ec38b35100b0&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01fa73581fd7e8a84a0d304f0b70c9.png%401280w_1l_2o_100sh.png", "describe" : "产品说明xx123" 
}]
		
		 MongoClient.connect(DB_CONN_STR,function(err,db){
			//数据库名：proShopCart
			 var _dbo = db.db('proShopCart');
            // 商品集合名：goodsCategory
            var _collection = _dbo.collection( 'goodsList_c' );
            
            _collection.insertMany(TempGoodsListObj,function(err, result){
                if(err) throw err;
                            
                db.close();
			});
		});
}
//insertTempGoodsList()

//根据Id，获得对应商品信息
app.get('/getGoodsInfo',function(req,res){
	var _findId=req.query._id;
	var _c=req.query._c;
	
	//引入mongodb的id对象
	var ObjectID=require('mongodb').ObjectID;
	var _findObjId=ObjectID.createFromHexString(_findId);
	
	 MongoClient.connect(DB_CONN_STR,function(err,db){
			//数据库名：proShopCart
			 var _dbo = db.db('proShopCart');
            // 商品集合名：goodsCategory
            var _collection = _dbo.collection( _c );
            _collection.findOne({"_id":_findObjId},{} , function(err, result){
                if(err) throw err;
               
                return res.send(result);
                db.close();
			});
		});
});

app.get('/getCategoryGoodsList',function(req,res){
	//这是各个集合，goodsList_a、goodsList_b
	var _c=req.query.categoryId;
	
	 MongoClient.connect(DB_CONN_STR,function(err,db){
			//数据库名：proShopCart
			 var _dbo = db.db('proShopCart');
            // 商品集合名：goodsCategory
            var _collection = _dbo.collection( _c );
            _collection.find().toArray( function(err, result){
                if(err) throw err;
               
                return res.send(result);
                db.close();
			});
		});
	
});

app.get('/getPageChange',function(req,res){
	var _s =req.query.startNum;
	var _c = req.query.c;
	
	MongoClient.connect(DB_CONN_STR,function(err,db){
			//数据库名：proShopCart
			 var _dbo = db.db('proShopCart');
            // 商品集合名：goodsCategory
            var _collection = _dbo.collection( _c );
            //.limit(),限制读取的数据数
            _collection.find().limit(2).skip(Number(_s))
            .toArray( function(err, result){
                if(err) throw err;
               
                return res.send(result);
                db.close();
			});
		});
	
});

//轮播图
app.get('/getImgUrls',function(req,res){
	let imgObj = {
		urls:[
		    'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1547663842854&di=bd40adb24bb9f7559c488dcc18c24faf&imgtype=0&src=http%3A%2F%2Fwx1.sinaimg.cn%2Flarge%2F7f6b590cgy1fh45yi4xpkj20yi0jen74.jpg',
              'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1547663896385&di=0be734cc730ea2b3d869263784a519d6&imgtype=0&src=http%3A%2F%2Fp2.qhimgs4.com%2Ft01f47e00d96e5546ee.jpg',
             'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1547663913605&di=a33bd590cdbe71086d835bbb3d124b14&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20171008%2F11444774a5774af7a77bb8eb836c3fd3.jpeg',
             'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1547663942911&di=5e029b8845848bd7675f66f62c2172cd&imgtype=0&src=http%3A%2F%2Fpic39.photophoto.cn%2F20160422%2F0018031335985159_b.jpg'

		]
	}
	return res.send(imgObj);
	
});

app.listen(5678,function(){
	console.log('5678,中间件已经启动！');
});
