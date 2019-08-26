

//预约信息校验
$(function() {
	var carNum = ""
		//获取车牌号
		$(".carLicenseMain ul li").each(function(index) {
		carNum += $(this).html()
	})	
	var regName = /[\u4e00-\u9fa5]/; //用户名
	var regPhone = /0?(13|14|15|17|18)[0-9]{9}/; //手机号
	var regCar1 = /^([冀豫云辽黑湘皖鲁苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼渝京津沪新京军空海北沈兰济南广成使领][a-zA-Z](([DF](?![a-zA-Z0-9]*[IO])[0-9]{4})|([0-9]{5}[DF])))|([冀豫云辽黑湘皖鲁苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼渝京津沪新京军空海北沈兰济南广成使领A-Z]{1}[a-zA-Z0-9]{5}[a-zA-Z0-9挂学警港澳]{1})$/; //常规汽车车牌	
	var regYear = /^[0-9]{1,2}$/; //车龄
	var regCardz=/[^\a-\z\A-\Z0-9\u4E00-\u9FA5\@\.]/;
	var regSfz=/(^\d{15}$)|(^\d{17}([0-9]|X)$)/;//身份证
	//	var regCar2 = '/^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{6}$/';//新能源汽车车牌
	//alert
	function pop(value, msg) {
		if(value == '') {
			layer.alert(msg, {
				icon: 2
			});
			return false;
		} else {
			return true;
		}
	}
	
	//保险在保弹出图片上传
	function UploadImg(){
		var isAutoSend = document.getElementsByName('bx');
		for (var i = 0; i < isAutoSend.length; i++) {
		if (isAutoSend[i].checked == true&&isAutoSend[i].value==yes) {
		alert(isAutoSend[i].value);
		}
		}
		
	}
	//姓名验证
	function checkName() {
		var value = $('#userName').val();
		var msg = '您的姓名不能为空！';
		if(pop(value, msg)) {
			if(regName.test(value)) {
				return true;
			} else {
				layer.alert('请输入中文姓名！', {
					icon: 7
				});
				return false;
			}
		} else {
			return false;
		};
	}
	//联系方式验证
	function checkPhone() {
		var value = $('#phone').val();
		var msg = '您的手机号不能为空！';
		if(pop(value, msg)) {
			if(regPhone.test(value)) {
				return true;
			} else {
				layer.alert('请检查输入的手机号！', {
					icon: 7
				});
				return false;
			}
		} else {
			return false;
		};
	}
	//车牌种类校验
	function checkCarZl() {
		var Car_zl = document.getElementById("car_zl").value;
		if(Car_zl='') {
			layer.alert('请选择您的车牌种类！', {
					icon: 7
				});
				return false;
			} else {
				return true;
		};
	}
	//车牌号验证
	function checkCar() {		
		var carNum="";
		 $(".carLicenseMain ul li").each(function(index){
		 carNum+=$(this).html()
	 })
		var msg = '您的车牌号不能为空！';
		if(pop(carNum, msg)) {
			if(regCar1.test(carNum)) {
				return true;
			} else {
				layer.alert('请检查输入的车牌号！', {
					icon: 7
				});
				return false;
			}
		} else {
			return false;
		};
	}
	//车龄验证
	function checkCarYear() {
		var value = $('#carYear').val();
		var msg = '您的车龄不能为空！';
		if(pop(value, msg)) {
			if(regYear.test(value)) {
				return true;
			} else {
				layer.alert('请检查输入的车龄！', {
					icon: 2
				});
				return false;
			}
		} else {
			return false;
		};
	}
	
	//保险是否在保
	function checkBx(){//定义一个函数
			var obj = document.getElementsByName("bx");
            	var flags = false;  
            	for(var i=0; i<obj.length; i ++){
                    if(obj[i].checked==true){
                    	flags = true;
                    	return true;
                    }
                }
            	if (flags == false){
				layer.alert('请检查保险是否在保！', {
					icon: 2
				});
				return false;
			}
	}
	//图片是否上传
	function checkImg() 
		{
			var file = document.getElementsByName("file").value;
			if(file == "") {
				layer.alert('请检查图片是否上传！', {
					icon: 2
				});
				return false;
			}else {
				return true;
		};
		}
	
	//车牌颜色校验
	function checkCarColor() {
		var Car_zl = document.getElementById("CarColor").value;
		if(!Car_zl) {
			layer.alert('请选择您的车牌颜色！', {
					icon: 7
				});
				return false;
			} else {
				return true;
		};
	}
	//是否违章
	function checkWz(){//定义一个函数
			var obj = document.getElementsByName("wz");
            	var flags = false;  
            	for(var i=0; i<obj.length; i ++){
                    if(obj[i].checked==true){
                    	flags = true;
                    }
                }
            	if (flags == false){
				layer.alert('请选择车辆是否违章！', {
					icon: 2
				});
				return false;
			}
	}
	
	//预约日期	
	function checkCartime() {
		var Car_zl = document.getElementById("car_date").value;
		if(Car_zl='') {
			layer.alert('请选择您的预约日期！', {
					icon: 7
				});
				return false;
			} else {
				return true;
		};
	}
	//具体时间
	function checkCartime1() {
		var Car_zl = document.getElementById("car_houer_date").value;
		if(Car_zl='') {
			layer.alert('请选择您的预约的具体时间！', {
					icon: 7
				});
				return false;
			} else {
				return true;
		};
	}
	//城区
	function checkCarcq() {
		var Car_zl = document.getElementById("dz_cq").value;
		if(Car_zl='') {
			layer.alert('请选择您的拿车城区！', {
					icon: 7
				});
				return false;
			} else {
				return true;
		};
	}
		//姓名验证
	function checkycdz() {
		var value = $('#ycdz').val();
		var msg = '您的地址不能为空！';
		if(pop(value, msg)) {
			if(regCardz.test(value)) {
				return true;
			} else {
				layer.alert('请输入正确的地址！', {
					icon: 7
				});
				return false;
			}
		} else {
			return false;
		};
	}
	//按钮点击事件
	$('#registBtn').click(function() {
			//提交按钮点击事件

					
		if(checkName() && checkPhone() && checkCarZl() && checkCar() && checkCarYear() && checkBx() && checkImg() && checkCarColor() && checkWz() && checkCartime() && checkCartime1() && checkCarcq() && checkycdz() ) {
			layer.load(2, {
				content: '信息提交中',
				//			time: 3 * 1000,
				shade: 0.1,
				success: function(layero) {
					layero.find('.layui-layer-content').css({
						'padding-top': '40px',
						'width': '50px',
						'text-indent': '-8px'
					});
				}
			})
			setTimeout(function() {
				layer.closeAll('loading');
				layer.alert('恭喜你，提交成功！', {
					icon: 6,
					yes: function() {
						window.location.href = "payment.html"
					}
				});
			}, 5000);
		}
	})
})