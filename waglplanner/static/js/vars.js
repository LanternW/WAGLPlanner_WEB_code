// JavaScript Document

var selected_world = 1; //所选择的世界
var selected_tarbar= 0; //所选择的详细内容id

var bk_map_sw = 0; //背景图绘制开关
var ct_update = 0; //使用触屏时需要持续刷新以保持流畅
var ct_touch_y = 0; //左侧缩放条按下时的y轴坐标
var ct_touch_scale_sw = 0; //触摸缩放开关

var str_route1 = "暂无导航信息";
var str_route2 = "建议直接飞行";
var str_route3 = "默认地狱门在基岩上方";
var route_sw = 0; //导航信息绘制开关

var route_bus_x = 0;
var route_bus_z = 0;
var route_end_x = 0;
var route_end_z = 0;


var expand7 = 0;        //拓展按钮按下情况
var expand8 = 0;
var expand9 = 0;
						//图层开启情况
var layer4 = 0;
var layer5 = 0;
var layer6 = 0;

var ani_scale_e = 0.0;   //比例尺缩放动能
var ani_endpos_x = 0.0;  //跳转最终目标
var ani_endpos_z = 0.0;
var ani_route = 0;

var scale1 = 1.0;       //三张地图的比例尺、位移
var scale2 = 1.0;
var scale3 = 1.0;

var offset_x1 = 0.0;
var offset_x2 = 0.0;
var offset_x3 = 0.0;

var offset_z1 = 0.0;
var offset_z2 = 0.0;
var offset_z3 = 0.0;

var mousex = 0;
var mousey = 0;
var mousex_old = 0;
var mousey_old = 0;
var left_button_down = 0;

var main_addr = 100;   //地标id偏移
var hell_addr = 1000;
var end_addr  = 2000;

var mouse_hover_on = 0; //鼠标悬停在地图中某item上
var mouse_hover_id = 0; //悬停内容id


///////////////////////////////Add窗口相关

var dor_choose = 0;

var item_color_red = 255;
var item_color_green = 0;
var item_color_blue = 0;

var bar_choose = 0;


function getScale(){
	switch(selected_world){
		case 1:return scale1;
		case 2:return scale2;
		case 3:return scale3;
	}
}

function getOffsetX(){
	switch(selected_world){
		case 1:return offset_x1;
		case 2:return offset_x2;
		case 3:return offset_x3;
	}
}

function getOffsetZ(){
	switch(selected_world){
		case 1:return offset_z1;
		case 2:return offset_z2;
		case 3:return offset_z3;
	}
}

function setScale(num){
	switch(selected_world){
		case 1:{scale1 = num;break;}
		case 2:{scale2 = num;break;}
		case 3:{scale3 = num;break;}
	}
}

function setOffsetX(num){
	switch(selected_world){
		case 1:{offset_x1 = num;break;}
		case 2:{offset_x2 = num;break;}
		case 3:{offset_x3 = num;break;}
	}
}

function setOffsetZ(num){
	switch(selected_world){
		case 1:{offset_z1 = num;break;}
		case 2:{offset_z2 = num;break;}
		case 3:{offset_z3 = num;break;}
	}
}

function worldXZ2screenX(world_x , world_z){
	
	BASE = 300;
	OFFSET_X = getOffsetX();
	SCALE = getScale();
	
    var screen_x = BASE + (world_x - OFFSET_X) * 100 / (16*SCALE)
    return screen_x;
}

function worldXZ2screenY(world_x , world_z){
	
	BASE = 300;
	OFFSET_Z = getOffsetZ();
	SCALE = getScale();
	
    var screen_z = BASE + (world_z - OFFSET_Z) * 100 / (16*SCALE)
    return screen_z;
}

function screenXY2worldX(x,y){
	BASE = 300;
	OFFSET_X = getOffsetX();
	SCALE = getScale();
    world_x = (x - BASE) * (16*SCALE) / 100 + OFFSET_X;
    return world_x;
}

function screenXY2worldZ(x,y){
	BASE = 300;
	OFFSET_Z = getOffsetZ();
	SCALE = getScale();
    world_z = (y - BASE) * (16*SCALE) / 100 + OFFSET_Z;
    return world_z;
}

function distance(x1,x2,y1,y2)
{
	var t = (x1 - x2)*(x1-x2) + (y1 - y2) * (y1 - y2);
	return Math.sqrt(t);
}








