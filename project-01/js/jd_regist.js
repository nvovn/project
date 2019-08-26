

//注册页面校验
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
	var regmm=/^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*]+$)[a-zA-Z\d!@#$%^&*]+$/;//登录密码
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
	
	//身份证验证
	function checksfz() {
		var value = $('#sfzhm').val();
		var msg = '请填写您的身份证号！';
		if(pop(value, msg)) {
			if(regSfz.test(value)) {
				return true;
			} else {
				layer.alert('请输入正确的身份证号码！', {
					icon: 7
				});
				return false;
			}
		} else {
			return false;
		};
	}
	
	//登录密码
	function checklogin() {
		var value = $('#jdmm').val();
		var msg = '请输入您的密码！';
		if(pop(value, msg)) {
			if(regmm.test(value)) {
				return true;
			} else {
				layer.alert('请输入正确的密码！', {
					icon: 7
				});
				return false;
			}
		} else {
			return false;
		};
	}
	//登录密码
	function checkrelogin() {
			var value = $('#jdmm').val();
			var re_value = $('#re_jdmm').val();
			if(value != re_value) {
				layer.alert('请检查密码是否一致！', {
					icon: 2
				});
				return false;
			}else {
				return true;
		};
		}
	//按钮点击事件
	$('#jd_loginBtn').click(function() {
		//提交按钮点击事件					
		if(checkName() && checkPhone() && checksfz() && checklogin() &&checkrelogin() ) {
			layer.load(2, {
				content: '信息提交中',
				//time: 3 * 1000,
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
						window.location.href = "jd_login.html"
					}
				});
			}, 5000);
		}
	})
})