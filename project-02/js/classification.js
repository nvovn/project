if($(window).width() > 991) {
	var total = window.innerHeight;
	document.getElementById("title").style.height = total * 0.1 + "px";
	document.getElementById("main").style.height = total * 0.9 + "px";
	title = document.getElementById("title");
	main = document.getElementById("main");	
	box04 = document.getElementById("box04");
	title_h = title.offsetHeight;
	main_h = main.offsetHeight;
	box04_h = box04.offsetHeight;	
	box04.style.height = main_h * 0.875 + "px";
	box01_h = box01.offsetHeight;
	box01.style.height = main_h * 0.875 + "px";
	document.getElementById("total-mn1").style.height = box01_h * 0.02 + "px";
	document.getElementById("total-mn2").style.height = box01_h * 0.02 + "px";

};
var app = angular.module('myApp', []);
app.controller('customersCtrl', function($scope, $http) {
	$http({
		method: 'get',
		url: 'data/da.json'
	}).then(function(res) {
		$scope.listHead = res.data.listHead; //数据列表-头
		$scope.listContent = res.data.listContent; //数据列表
		$scope.listData1 = res.data.listData1; //数据列表
		//公交、BRT快速公交、地铁、县区公交				
		var worldMapContainer2 = document.getElementById('box2');
		var box01 = document.getElementById("box01");
		var box01_h = box01.offsetHeight;
		var box01_w = box01.offsetWidth;
		//用于使chart自适应高度和宽度,通过窗体高宽计算容器高宽
		var resizeWorldMapContainer2 = function() {
			worldMapContainer2.style.width = box01_w * 0.96 + 'px';
			worldMapContainer2.style.height = box01_h * 0.5 + 'px';
		};
		//设置容器高宽
		resizeWorldMapContainer2();
		// 基于准备好的dom，初始化echarts实例
		var myChart = echarts.init(worldMapContainer2);
				var option = {

			color: ['#38b5f4', '#ff7d4e','#d9a503','#ff7065'],
			tooltip: {
				trigger: 'axis',

			},
			legend: {
				data: res.data.legendList,
				textStyle: {
					color: '#ccc'
				}
			},
			toolbox: {
		        show : true,
		        feature : {
		            mark : {show: true},
		            dataView : {show: true, readOnly: false},
		            magicType : {show: true, type: ['line', 'bar']},
		            restore : {show: true},
		            saveAsImage : {show: true}
		        }
		    },
			grid: {
				top: '10%',
				left: '3%',
				right: '3%',
				bottom: '6%',
				containLabel: true
			},
			calculable: true,
			textStyle: {
				color: '#ccc'
			},
			xAxis: [{
				type: 'category',
				data: res.data.titleList,
			}],
			yAxis: [{
				type: 'value'
			}],
			series: function() {
				var serie = [];
				for(var i = 0; i < res.data.legendList.length; i++) {
					var item = {
						name: res.data.legendList[i],
						type: 'line',
						data: res.data.dataList[i]
					};
					serie.push(item);
				}
				return serie;
			}()


		};
		myChart.setOption(option);

		//用于使chart自适应高度和宽度
		window.onresize = function() {
			//重置容器高宽
			resizeWorldMapContainer2();
			myChart.resize();
		};
		
		//公交占比					
		var worldMapContainer4 = document.getElementById('box4');
		//用于使chart自适应高度和宽度,通过窗体高宽计算容器高宽
		var resizeWorldMapContainer4 = function() {
			worldMapContainer4.style.width = box01_w * 0.96 + 'px';
			worldMapContainer4.style.height = box01_h * 0.3 + 'px';
		};
		//设置容器高宽
		resizeWorldMapContainer4();
		// 基于准备好的dom，初始化echarts实例
		var myChart = echarts.init(worldMapContainer4);
		// 指定图表的配置项和数据

		var option = {
			tooltip: {
				trigger: 'item',
				formatter: "{a} <br/>{b} : {c} ({d}%)"
			},
			textStyle: {
				color: '#ccc'
			},

			calculable: true,
			series: [{
				color: ['#7627cb', '#259fd2', '#e26021', '#c7353a', '#f5b91e'],
				name: '占比',
				type: 'pie',
				radius: '72%',
				center: ['50%', '54%'],
				data: function() {
					var serie = [];
					for(var i = 0; i < res.data.titleList2.length; i++) {
						var item = {
							name: res.data.titleList2[i],
							value: res.data.dataList2[i]
						};
						serie.push(item);
					}
					return serie;
				}()

			}]
		};

		// 使用刚指定的配置项和数据显示图表。
		myChart.setOption(option);

		//用于使chart自适应高度和宽度
		window.onresize = function() {
			//重置容器高宽
			resizeWorldMapContainer4();
			myChart.resize();
		};
						
		//  年龄段分析
		var worldMapContainer5 = document.getElementById('box5');
		box04 = document.getElementById("box01");
		box04_h = box04.offsetHeight;
		box04_w = box04.offsetWidth;
		//用于使chart自适应高度和宽度,通过窗体高宽计算容器高宽
		var resizeWorldMapContainer5 = function() {
			worldMapContainer5.style.width = box04_w * 0.96 + 'px';
			worldMapContainer5.style.height = box04_h * 0.5 + 'px';
		};
		//设置容器高宽
		resizeWorldMapContainer5();
		// 基于准备好的dom，初始化echarts实例
		var myChart = echarts.init(worldMapContainer5);

		// 指定图表的配置项和数据

			var option = {
			color: ['#38b3f1'],
			tooltip: {
				trigger: 'axis',
				axisPointer: { // 坐标轴指示器，坐标轴触发有效
					type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
				}
			},
			textStyle: {
				color: '#ccc'
			},
			grid: {
				top: '10%',
				left: '3%',
				right: '3%',
				bottom: '6%',
				containLabel: true
			},
			xAxis: [{
				type: 'category',
				data: res.data.titleList5,
				axisTick: {
					alignWithLabel: true
				}
			}],
			yAxis: [{
				type: 'value'
			}],
			series: [{
				name: '直接访问',
				type: 'line',
				barWidth: '60%',
				data: res.data.dataList5
			}]
		};
	

		// 使用刚指定的配置项和数据显示图表。
		myChart.setOption(option);

		//用于使chart自适应高度和宽度
		window.onresize = function() {
			//重置容器高宽
			resizeWorldMapContainer1();
			myChart.resize();
		};
		
		//年龄段占比
		var worldMapContainer9 = document.getElementById('box9');
		box04 = document.getElementById("box04");
		box04_h = box04.offsetHeight;
		box04_w = box04.offsetWidth;
		//用于使chart自适应高度和宽度,通过窗体高宽计算容器高宽
		var resizeWorldMapContainer9 = function() {
			worldMapContainer9.style.width = box04_w * 0.96 + 'px';
			worldMapContainer9.style.height = box04_h * 0.3 + 'px';
		};
		//设置容器高宽
		resizeWorldMapContainer9();
		// 基于准备好的dom，初始化echarts实例
		var myChart = echarts.init(worldMapContainer9);

		// 指定图表的配置项和数据

		var option = {
			tooltip: {
				trigger: 'item',
				formatter: "{a} <br/>{b} : {c} ({d}%)"
			},
			textStyle: {
				color: '#ccc'
			},
			calculable: true,
			series: [{
				color: ['#7627cb', '#259fd2', '#e26021', '#c7353a', '#f5b91e', '#c7353a', '#f5b91e'],
				name: '占比',
				type: 'pie',
				radius: '72%',
				center: ['50%', '50%'],
				data: function() {
					var serie = [];
					for(var i = 0; i < res.data.titleList9.length; i++) {
						var item = {
							name: res.data.titleList9[i],
							value: res.data.dataList9[i]
						};
						serie.push(item);
					}
					return serie;
				}()

			}]
		};

		// 使用刚指定的配置项和数据显示图表。
		myChart.setOption(option);

		//用于使chart自适应高度和宽度
		window.onresize = function() {
			//重置容器高宽
			resizeWorldMapContainer1();
			myChart.resize();
		};
		
		
	});
});