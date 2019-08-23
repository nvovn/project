//车牌号键盘

//选择车牌号码位数
				function xs(){
					 /*$('.xinnengyuan').addClass('xinnengyuan');*/
					 $('.xny').css("display","none");
				}
				function yc(){
					$('.xny').css("display","block");
					/*$('.xinnengyuan').removeClass('xinnengyuan');*/
				}
				$(document).ready(function() {
				//键盘隐藏，点击触发显示
				$("#keyboardBox").hide()
				$(".carLicenseMain").on("click", function() {
					$("#keyboardBox").show()
				})
				//点击关闭键盘
				$("#closes_keyboardBox").on("click", function() {
					$("#keyboardBox").hide();
					var carNum=""
			         $(".carLicenseMain ul li").each(function(index){
			         carNum+=$(this).html()
			          })
			        
				})

				//键盘点击动画
				$(".textBox ul li").each(function() {
					$(this).click(function() {
						$(this).addClass("activeKey") //添加动画效果
						$(this).siblings().removeClass("activeKey") //移除动画效果
						var interval = setTimeout(function() { //定时器及时清除自身动画效果
							$(this).removeClass("activeKey")
							window.clearInterval(interval)
						}.bind(this), 200);
					})
				})
				var num = 6; //需要输入的车牌数
				//切换键盘
				$('.changeContentBtn').click(function() {
					$('li').siblings().removeClass("activeKey")
					if($(this).html() == 'ABC') {
						$('#textBox').show();
						$('#provienceBox').hide();
					} else {
						$('#textBox').hide();
						$('#provienceBox').show();
					}
				})
				
				/* var inpArr = document.getElementsByName("cpw");				 				
				/* alert(radioValue);*/
				 
								
				
				//新能源点击事件
				
				/*$('.xinnengyuan').click(function() {
					num = 7;
					$(this).removeClass('xinnengyuan');
				})*/
				//获取当前车牌数字索引
				function getIndex() {
					var index = 0;
					$('.carLicenseMain ul li').each(function() {
						var reg = new RegExp('active');
						if(reg.test($(this).attr('class'))) {
							index = $(this).index();
						}
					})
					return index;
				}
				//自定义键盘处理函数
				function keyboard(num, self) {
					var index = getIndex();
					if(index <= num) {
						if(index == num) {
							$('.carLicenseMain ul li.active').html($(self).html());
						} else {
							$('.carLicenseMain ul li.active').html($(self).html()).removeClass('active').next().addClass('active');
						}
						$('#textBox').show();
						$('#provienceBox').hide();
					}
				}
				//省份键盘点击事件
				$('#provienceBox ul li:not(.other)').click(function() {
					$(this).addClass("activeKey") //添加动画效果
					$(this).siblings().removeClass("activeKey") //移除动画效果
					var interval = setTimeout(function() { //定时器及时清除自身动画效果
						$(this).removeClass("activeKey")
						var self = this;
						keyboard(num, self);
						window.clearInterval(interval)
					}.bind(this), 200);
					//省份点击后键盘切换
					//var self = this;
					//keyboard(num,self);
				})
				//文本键盘点击事件
				$('#textBox ul li:not(.other)').click(function() {
					var self = this;
					keyboard(num, self);
				})
				//回退按钮点击事件
				$('.deleteBtn').click(function() {
					var index = getIndex();
					if(index == num) {
						if($('.carLicenseMain ul li.active').html() != '') {
							$('.carLicenseMain ul li.active').html('');
						} else {
							if(index == 7) {
								$('.carLicenseMain ul li:last-of-type').addClass('xinnengyuan');
								num = 6;
							}
							$('.carLicenseMain ul li.active').removeClass('active').prev().addClass('active').html('');
						}
					} else if(index < num && index > 1) {
						$('.carLicenseMain ul li.active').removeClass('active').prev().addClass('active').html('');
					} else if(index == 1) {
						$('.carLicenseMain ul li.active').removeClass('active').prev().addClass('active').html('省');
					}
				})
								
			
			})
			