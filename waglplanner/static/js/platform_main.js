// JavaScript Document

var max_index = 0;
var times = Array();
var data1 = Array();
var data2 = Array();
var data3 = Array();

var max_time = 86400; //单位：秒
var min_time = 0;  //默认 0 = 2021-1-1-00:00 

var scale = 1.0; 
var offset = 0; //时间轴偏移

var render_layer = 3;

var left_button_down = 0;
var mx = 0;
var my = 0;

function appendData(t,d1,d2,d3)
{
	times[max_index] = t;
	data1[max_index] = d1;
	data2[max_index] = d2;
	data3[max_index] = d3;
	max_index++;	
}

//刷新数据
function updateDatas()
{
	max_index = 0;
	times.length = 0;
	data1.length = 0;
	data2.length = 0;
	data3.length = 0;
	loadData();
}

//加载数据
function loadData()
{
	$.ajax({
		type:"post",
		url:"/platform/data",
		data:{"todo":"GETDATAS"},
		
		success:function(list){

				var list_obj = eval(list);
				console.log(list_obj);
				var time = 0;
				var data1 = 0.3;
				var data2 = 0.5;
				var data3 = 0.7;

				for(var i= 0; i < list_obj.length; i++){
					time = list_obj[i].time;
					data1 = list_obj[i].d1;
					data2 = list_obj[i].d2;
					data3 = list_obj[i].d3;
					appendData(time,data1,data2,data3);
	
				}
				renderCanvas();
		},
		error:function(xhr){
			
			window.alert("数据加载异常！");
		}
	});
	
}

function toDate(xpos){

	var sec = offset + xpos*(864/(6*scale));
	sec = sec % 31536000;
	var dates = Math.round(sec / 86400);
	var month = "01-";
	var date  = "01";
	dates++;
	if(dates <= 31){date = dates.toString();}
	else if(dates <= 59){month = "02-"; date = (dates-31).toString();}
	else if(dates <= 90){month = "03-"; date = (dates-59).toString();}
	else if(dates <= 120){month = "04-"; date = (dates-90).toString();}
	else if(dates <= 151){month = "05-"; date = (dates-120).toString();}
	else if(dates <= 181){month = "06-"; date = (dates-151).toString();}
	else if(dates <= 212){month = "07-"; date = (dates-181).toString();}
	else if(dates <= 243){month = "08-"; date = (dates-212).toString();}
	else if(dates <= 273){month = "09-"; date = (dates-243).toString();}
	else if(dates <= 304){month = "10-"; date = (dates-273).toString();}
	else if(dates <= 334){month = "11-"; date = (dates-304).toString();}
	else if(dates <= 365){month = "12-"; date = (dates-334).toString();}
	
	return month + date;
	
}

function toHour(xpos){

	var sec = offset + xpos*(864/(6*scale));
	var hours = Math.round(sec / 3600);
	hours %= 24;
	return hours.toString() + ":00";
	
}

function toMiniute(xpos){
	
	var sec = offset + xpos*(864/(6*scale));
	var minutes = Math.round(sec / 60);
	minutes %= 60;
	if(minutes == 0){return " ";}
	return minutes.toString()+"’";
	
}

function to10Sec(xpos){
	
	var sec = offset + xpos*(864/(6*scale));
	var sec10 = Math.round(sec / 10);
	sec10 %= 6;
	if(sec10 == 0){return " ";}
	return sec10.toString()+"0”";
	
}
	
function toXpos(sec){
	
	return 100 + (sec - offset)*(6*scale/864);
	
}

function renderData()
{
	context = document.getElementById("canvas").getContext('2d');
	for(var i = 0 ; i < max_index ; i++){
		
		min_time = offset;
		max_time = offset + 1320 * (864/(6*scale));
		
		if(times[i] >= min_time && times[i] <= max_time)
		{
			if(data1[i] >= 0 && data1[i] <= 1){
				context.fillStyle = "rgba(255,50,50,1)";
				context.fillRect(toXpos(times[i]) , 490-290*data1[i],4,4);
			}
			
			if(data2[i] >= 0 && data2[i] <= 1){
				context.fillStyle = "rgba(255,255,50,1)";
				context.fillRect(toXpos(times[i]) , 490-290*data2[i],4,4);
			}
			
			if(data3[i] >= 0 && data3[i] <= 1){
				context.fillStyle = "rgba(0,0,255,1)";
				context.fillRect(toXpos(times[i]) , 490-290*data3[i],4,4);
			}
		
		}	
	}	
}
	
function renderGrid()
{
	context = document.getElementById("canvas").getContext('2d');
	//坐标轴绘制
	$("#canvas").drawLine({
  		
		strokeStyle: "rgba(200,255,200,0.8)",	
		strokeWidth: 2,	
		x1: 100, y1: 490,	  	
		x2: 1420, y2: 490,	
		
	});
	
	$("#canvas").drawLine({
  		
		strokeStyle: "rgba(200,255,200,0.8)",	
		strokeWidth: 2,	
		x1: 100, y1: 490,	  	
		x2: 100, y2: 150,	
		
	});
	
	
	context.fillStyle = "rgba(200,255,200,0.8)";
    context.font = '16px "HeiTi"';
    context.textBaseline = "bottom";
    context.textAlign = "center";  
	
	for(var i = 200 ; i <= 490 ; i += 29)
	{
		$("#canvas").drawLine({
  		
		strokeStyle: "rgba(220,255,220,0.6)",	
		strokeWidth: 0.5,	
		x1: 100, y1: i,	  	
		x2: 1420, y2: i,	
		
		});	
		
		context.fillText( (Math.round(10-(i - 200)/29) / 10).toString(), 80, i + 10 );  
		
	}
	
	if(scale < 0.1){render_layer = 1;}
	else if(scale < 2){render_layer = 2;}
	else if(scale < 150){render_layer = 3;}
	else if(scale < 600){render_layer = 4;}
	else {render_layer = 5;}
	
	context.fillStyle = "rgba(200,255,200,0.8)";
    context.font = '16px "HeiTi"';
    context.textBaseline = "bottom";
    context.textAlign = "center";   
	
	if(render_layer == 1){
		
		var ori_xpos = (864000 * Math.floor((offset / 864000)) - offset) * scale * (6/864);
		for(var i = ori_xpos ; i <= 1320 ; i += 864000 *scale * (6/864) ){
			
			if(i >= 0){
    			context.fillText( toDate(i), 100+ i, 530 );  
			}
		}
		
	}
	
	else {
		
		var ori_xpos = (86400 * Math.floor((offset / 86400)) - offset) * scale * (6/864);
		console.log(offset,ori_xpos);
		for(var i = ori_xpos ; i <= 1320 ; i += 86400 *scale * (6/864) ){
			
			if(i >= 0){
    			context.fillText( toDate(i), i+100, 530 );  
			}
		}
		
		//绘制小时
		if(render_layer > 2){
			var ori_xpos = (3600 * Math.floor((offset / 3600)) - offset) * scale * (6/864);
			for(var i = ori_xpos ; i <= 1320 ; i += 3600 *scale * (6/864) ){
			if(i >= 0){
    			context.fillText( toHour(i), i+100, 510 );  
				}
			}
		}
		
		//绘制分钟
		if(render_layer > 3){
			var ori_xpos = (60 * Math.floor((offset / 60)) - offset) * scale * (6/864);
			for(var i = ori_xpos ; i <= 1320 ; i += 60 *scale * (6/864) ){
			if(i >= 0){
    			context.fillText( toMiniute(i), i+100, 510 );  
				}
			}
		}
		
		//绘制10秒
		if(render_layer > 4){
			var ori_xpos = (10 * Math.floor((offset / 10)) - offset) * scale * (6/864);
			for(var i = ori_xpos ; i <= 1320 ; i += 10 *scale * (6/864) ){
			if(i >= 0){
    			context.fillText( to10Sec(i), i+100, 510 );  
				}
			}
		}
			
	}
	
}

function renderCanvas()
{
	context = document.getElementById("canvas").getContext('2d');
	context.clearRect(0,0,1520,630);
	context.fillStyle = "rgba(200,250,200,0.2)";
	context.fillRect(0,0,1520,630);
	renderGrid();	
	renderData();
	
}

function updateCanvas()
{
	var canvas = document.getElementById("canvas");
	var vertex = canvas.getBoundingClientRect();
	
	//触屏支持
	$("#canvas").on("touchstart" , function(e){  //按下
		e.preventDefault();
		mx = e.originalEvent.changedTouches[0].pageX - vertex.left;
        my = e.originalEvent.changedTouches[0].pageY - vertex.top;
		left_button_down = 1;
		
	});
	
	$("#canvas").on("touchend" , function(e){ //松开
		e.preventDefault();
  		left_button_down = 0;
	});
	
	$("#canvas").on("touchmove" , function(e){
		e.preventDefault();
		var new_mx = e.originalEvent.changedTouches[0].pageX - vertex.left;
        var new_my = e.originalEvent.changedTouches[0].pageY - vertex.top;
		
		if(left_button_down){
				offset += (864/(6*scale)) * (mx - new_mx);
				if(offset < 0){offset = 0;}
				renderCanvas();
		}
		
		mx = new_mx;
		my = new_my;
	});

	//鼠标
       canvas.onmousedown = function (e) {
            mx = e.clientX - vertex.left;
            my = e.clientY - vertex.top;
		    left_button_down = 1;

        }
        canvas.onmousemove = function (e) {
            var new_mx = e.clientX - vertex.left;
            var new_my = e.clientY - vertex.top;
			
			if(left_button_down){
				offset += (864/(6*scale)) * (mx - new_mx);
				if(offset < 0){offset = 0;}
				renderCanvas();
			}
			mx = new_mx;
			my = new_my;

        }

        canvas.onmouseup = function (e) {
            left_button_down = 0;
		}
		
	//鼠标滚轮事件
		canvas.onmousewheel = function (e) {
			
			dx = e.clientX - vertex.left - 100;
			var old_tosec = dx * (864/(6*scale));
			var ds = e.wheelDelta;
			if(ds > 0){scale *= 1.1;}
			else {scale /= 1.1;}
			if(scale > 1400){scale =1400;}
			if(scale < 0.01){scale = 0.01;}
			var new_tosec = dx * (864/(6*scale));
			
			offset += old_tosec - new_tosec;
			if(offset < 0){offset = 0;}
			
			renderCanvas();
			
		}
}

$(document).ready(function(){
	
	loadData();
	renderCanvas();
	$(".title").click(updateDatas);
	
	setInterval(updateCanvas,14);
	//setInterval(updateDatas,10000);
	
});