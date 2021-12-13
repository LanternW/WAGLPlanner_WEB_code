// JavaScript Document
///////////////Add窗口相关
function renderColorSelectWindow()
{
	var context = document.getElementById("color_select").getContext('2d');
	
	context.clearRect(0,0,150,90);
	context.fillStyle="rgba(0,0,0,0.9)";
	context.fillRect(0,0,150,90);
	
	for(var i = 0 ; i <= 255 ; i++){
		
		context.fillStyle="rgb(" + i.toString() + ",0,0)";
		context.fillRect(10 + i*130/255 ,20,1,2.5);	
		
		context.fillStyle="rgb(0," + i.toString() + ",0)";
		context.fillRect(10 + i*130/255 ,40,1,2.5);	
		
		context.fillStyle="rgb(0,0," + i.toString() + ")";
		context.fillRect(10 + i*130/255 ,60,1,2.5);	
		
	}
	
	context.fillStyle="rgb(200,200,200)";
	context.fillRect(6 + item_color_red*130/255 ,14,8,12);	
	
	context.fillStyle="rgb(200,200,200)";
	context.fillRect(6 + item_color_green*130/255 ,34,8,12);
	
	context.fillStyle="rgb(200,200,200)";
	context.fillRect(6 + item_color_blue*130/255 ,54,8,12);	
	
	setDomColor();
	
}

function inToBar(x,y){
	
	if((2+item_color_red*130/255 < x) && (x < item_color_red*130/255 + 10) && (y>14) && (y<26)){return 1;}
	if((2+item_color_green*130/255 < x) && (x < item_color_green*130/255 + 10) && (y>34) && (y<46)){return 2;}
	if((2+item_color_blue*130/255 < x) && (x < item_color_blue*130/255 + 10) && (y>54) && (y<66)){return 3;}
	return 0;
	
}

function setDomColor(){
	var cstr = "rgb(" + item_color_red.toString() + "," +item_color_green.toString() + ","+item_color_blue.toString() + ")";
	$("#show").css("background-color",cstr);
}

function updateColorSelectWindow()
{
	var context = document.getElementById("color_select");
	var vertex = context.getBoundingClientRect();
	var mx;
	var my;
	context.onmousedown = function (e) {
            mx = e.clientX - vertex.left;
            my = e.clientY - vertex.top;
            
			bar_choose = inToBar(mx,my);
			if(bar_choose == 0){
				if(mx > 6 && mx < 136){
					if(my > 14 && my < 26){
						item_color_red = (mx - 6)*255/130;
						bar_choose = 1;
					}
					else if(my > 34 && my < 46){
						item_color_green = (mx - 6)*255/130;
						bar_choose = 2;
					}
					else if(my > 54 && my < 66){
						item_color_blue = (mx - 6)*255/130;
						bar_choose = 3;
					}
				}
				renderColorSelectWindow();
			}
			
    }
    context.onmousemove = function (e) {
            mx = e.clientX - vertex.left;
            my = e.clientY - vertex.top;
			if(mx > 6 && mx < 136){
				if (bar_choose == 1) {
					item_color_red = (mx - 6)*255/130;
				}
				else if (bar_choose == 2) {
					item_color_green = (mx - 6)*255/130;
				}
				else if (bar_choose == 3) {
					item_color_blue = (mx - 6)*255/130;
				} 
				renderColorSelectWindow();
			}
        }

    context.onmouseup = function (e) {
            bar_choose = 0;
		}
		
}



///////////////////////////////////////////////////


//生物群系绘制（未完成，用色图代替）
function renderBcMap()
{
	var context = document.getElementById("canvas").getContext('2d');
	var scale = getScale();
	var offset_x = getOffsetX();
	var offset_z = getOffsetZ();
	var vertex = canvas.getBoundingClientRect();
	
	//var left_top_world_x = screenXY2worldX(vertex.left,vertex.top);
	//var left_top_world_z = screenXY2worldZ(vertex.left,vertex.top);
	
	var left_top_world_x = screenXY2worldX(0,0);
	var left_top_world_z = screenXY2worldZ(0,0);
	
	var start_world_x = Math.floor(left_top_world_x);
	var start_world_z = Math.floor(left_top_world_z);
	
	var start_screen_x = worldXZ2screenX(start_world_x,start_world_z);
	var start_screen_y = worldXZ2screenY(start_world_x,start_world_z);
	
	var a = 100/scale;
	
	var x_num = 6 * scale +1;
	var y_num = x_num;
	if(scale > 10)
	{
		a = a*4;
		x_num = 1.5 * scale +1;
		y_num = x_num;
	}
	
	
	for(var i = 0 ; i < x_num ; i++)
	{
		for(var j = 0 ; j < y_num ; j++)
		{
			context.fillStyle = "rgb("+(i).toString()+","+(i+j).toString()+","+j.toString()+")"; 
			context.fillRect(start_screen_x + i *a ,start_screen_y + j *a,a+1,a+1);
		}
	}
}
//地图跳转
function jumpTo(worldx,worldz)
{
	ani_endpos_x = worldx;
	ani_endpos_z = worldz;
	ani_route = 1;
	//setOffsetX(worldx);
	//setOffsetZ(worldz);
}

function getMapColor()
{
	switch(selected_world){
		case 1:return "rgba(100,255,100,0.8)";
		case 2:return "rgba(255,150,150,0.8)";
		case 3:return "rgba(255,250,100,0.8)";
	}
}

function renderGrid()
{
	var delta_scan = 16;
	var scale = getScale();
	var offset_x = getOffsetX();
	var offset_z = getOffsetZ();
    if (scale > 10){
           delta_scan = 64;}
	
    var center_x = Math.floor(offset_x / delta_scan)
    var center_z = Math.floor(offset_z / delta_scan)
    var temp_x = center_x * delta_scan;
    var temp_z = center_z * delta_scan;
    var ts_x = worldXZ2screenX(temp_x,temp_z);
	var ts_y = worldXZ2screenY(temp_x,temp_z);

    while(1){
		if(ts_x < 0 && ts_y < 0){
			break;
		}
		var line_width = 0.5;
        var line_color = "rgba(100,100,100,150)";
		$("#canvas").drawLine({
  			strokeStyle: line_color,
  			strokeWidth: line_width,
			x1: ts_x, y1: 0,
		    x2: ts_x, y2: 600,
			});
		$("#canvas").drawLine({
  			strokeStyle: line_color,
  			strokeWidth: line_width,
			x1: 0, y1: ts_y,
		    x2: 600, y2: ts_y,
			});
		temp_x -= delta_scan;
    	temp_z -= delta_scan;
    	ts_x = worldXZ2screenX(temp_x,temp_z);
		ts_y = worldXZ2screenY(temp_x,temp_z);
	}
    
	temp_x = center_x * delta_scan + delta_scan;
    temp_z = center_z * delta_scan + delta_scan;
    ts_x = worldXZ2screenX(temp_x,temp_z);
	ts_y = worldXZ2screenY(temp_x,temp_z);
    
	while(1){
		if(ts_x > 600 && ts_y > 600){
			break;
		}
		var line_width = 0.5;
        var line_color = "rgba(100,100,100,150)";
		$("#canvas").drawLine({
  			strokeStyle: line_color,
  			strokeWidth: line_width,
			x1: ts_x, y1: 0,
		    x2: ts_x, y2: 600,
			});
		$("#canvas").drawLine({
  			strokeStyle: line_color,
  			strokeWidth: line_width,
			x1: 0, y1: ts_y,
		    x2: 600, y2: ts_y,
			});
		temp_x += delta_scan;
    	temp_z += delta_scan;
    	ts_x = worldXZ2screenX(temp_x,temp_z);
		ts_y = worldXZ2screenY(temp_x,temp_z);
	}
	
}

//F3信息绘制
function renderF3()
{
	var context = document.getElementById("canvas").getContext('2d');
	var vertex = canvas.getBoundingClientRect();
	var world_x = screenXY2worldX(mousex-vertex.left,mousey-vertex.top);
	var world_z = screenXY2worldZ(mousex-vertex.left,mousey-vertex.top);
	var block_x = Math.floor(world_x / 16);
	var block_z = Math.floor(world_z / 16);
	//取整
	world_x = Math.floor(world_x);
	world_z = Math.floor(world_z);
	
	var str = "x: " + world_x.toString() + "   z: " + world_z.toString(); 
	context.fillStyle = "black";               //设置填充颜色为紫色
    context.font = '18px "myFont"';           //设置字体
    context.textBaseline = "bottom";            //设置字体底线对齐绘制基线
    context.textAlign = "left";                 //设置字体对齐的方式
    context.fillText( str, 40, 40);        //填充文字
	str = "bx: " + block_x.toString() + "   bz: " + block_z.toString();
	context.fillText( str, 340, 40);        //填充文字
}

//导航信息绘制
function renderRoute()
{
	var start_x = worldXZ2screenX(route_bus_x,route_bus_z);
	var start_y = worldXZ2screenY(route_bus_x,route_bus_z);
	var end_x   = worldXZ2screenX(route_end_x,route_end_z); 
	var end_y   = worldXZ2screenY(route_end_x,route_end_z); 
	var context = document.getElementById("canvas").getContext('2d');

	
	$("#canvas").drawLine({
	  strokeStyle: "rgb(150,255,150)",
	  strokeWidth: 4,
	  rounded: true,
	  startArrow: false,
	  arrowRadius: 15,
	  arrowAngle: 90,
	  x1: end_x, y1: end_y,
	  x2: start_x, y2: start_y,
	});
	
	$("#canvas").drawEllipse({
	  fillStyle: '#c3c',
	  x: start_x, y: start_y,
	  width: 20, height: 20
	});

}

//地图绘制
function renderMap()
{
	var context = document.getElementById("canvas").getContext('2d');
	context.clearRect(0,0,600,600);
	context.fillStyle=getMapColor();
	context.fillRect(0,0,600,600);
	
	if(bk_map_sw){renderBcMap();}
	renderGrid();
	
	if (route_sw){renderRoute();}
	if (layer4 == 1)
	{
		renderLandmarks();
		mouse_hover_id = renderHighPix();
	}
	
	renderF3();
	

}

//判断是否在画布内
function isInCanvas(x,y)
{
	if(x > -10 && x < 610 && y > -10 && y < 610){return true;}
	else{return false;}
}

//绘制高亮信息
function renderHighPix()
{
	var vertex = canvas.getBoundingClientRect();
	mouse_hover_on = 0;
	var mindex = main_ldmks_max_index;
	var sheet_id   = main_ldmks_ids;
	var sheet_posx = main_ldmks_posx;
	var sheet_posz = main_ldmks_posz;
	if(selected_world == 2)
	{
		mindex = hell_ldmks_max_index;
		sheet_id   = hell_ldmks_ids;
		sheet_posx = hell_ldmks_posx;
		sheet_posz = hell_ldmks_posz;
	}
	
	if(route_sw)
	{
		//修复鼠标坐标
		var dmousex = mousex - vertex.left;
		var dmousey = mousey - vertex.top;
		var start_x = worldXZ2screenX(route_bus_x,route_bus_z);
		var start_y = worldXZ2screenY(route_bus_x,route_bus_z);
		//鼠标停留在导航地狱门标上
		if(distance(dmousex,start_x,dmousey,start_y) < 10)
		{
			var context = document.getElementById("canvas").getContext('2d');
			$("#canvas").drawEllipse({
			  fillStyle: 'rgba(255,255,255,0.5)',
			  x: start_x, y: start_y,
			  width: 23, height: 23
			});
			context.fillStyle = "rgb(255,50,50)";               //设置填充颜色为白色
    		context.font = '16px "myFont"';           //设置字体
    		context.textBaseline = "bottom";            //设置字体底线对齐绘制基线
    		context.textAlign = "left";                 //设置字体对齐的方式
			var bx = Math.floor(route_bus_x/8);          //地狱门坐标
			var bz = Math.floor(route_bus_z/8);
			var str = "(X:" + bx.toString() + " ,Z:" + bz.toString() + ")";
    		context.fillText( str, start_x-30, start_y + 30 );        //填充文字
			str = "下界地狱门位置";
			context.fillText( str, start_x-40, start_y + 50 );        //填充文字
		}
	}
	
	for (var i = 0 ; i < mindex ; i++){
		var bx = sheet_posx[i];
		var bz = sheet_posz[i];
		var mx = worldXZ2screenX(bx,bz);
		var my = worldXZ2screenY(bx,bz);
		//屏幕外的就不管了
		if(isInCanvas(mx,my))
		{
			//修复鼠标坐标
			var dmousex = mousex - vertex.left;
			var dmousey = mousey - vertex.top;
			//鼠标停留在此地标上
			if(Math.abs(dmousex - mx) < 7 && Math.abs(dmousey - my) < 7)
			{
				var context = document.getElementById("canvas").getContext('2d');
				context.strokeStyle = "rgb(255,255,255)";
				context.strokeRect(mx-9,my-9,18,18);
				context.strokeRect(mx-8,my-8,16,16);
				var str = "(X:" + bx.toString() + " ,Z:" + bz.toString() + ")";
				context.fillStyle = "white";               //设置填充颜色为白色
    			context.font = '16px "myFont"';           //设置字体
    			context.textBaseline = "bottom";            //设置字体底线对齐绘制基线
    			context.textAlign = "left";                 //设置字体对齐的方式
    			context.fillText( str, mx-30, my + 30 );        //填充文字
				
				mouse_hover_on = 1;
				return sheet_id[i]; //获得鼠标停留的地标的Id
			}
			mouse_hover_on = 0;
		}
	}
	return -1;
}

//地标绘制
function renderLandmarks()
{
	var context = document.getElementById("canvas").getContext('2d');
	var index_max_num = 0;
	if (selected_world == 1)
	{
		index_max_num = main_ldmks_max_index;
		sheet_posx  = main_ldmks_posx;
		sheet_posz  = main_ldmks_posz;
		sheet_r     = main_ldmks_r;
		sheet_g     = main_ldmks_g;
		sheet_b     = main_ldmks_b;
		sheet_names = main_ldmks_names;
	}
	if (selected_world == 2)
	{
		index_max_num = hell_ldmks_max_index;
		sheet_posx  = hell_ldmks_posx;
		sheet_posz  = hell_ldmks_posz;
		sheet_r     = hell_ldmks_r;
		sheet_g     = hell_ldmks_g;
		sheet_b     = hell_ldmks_b;
		sheet_names = hell_ldmks_names;
	}
	if (selected_world == 3)
	{
		index_max_num = end_ldmks_max_index;
		sheet_posx  = end_ldmks_posx;
		sheet_posz  = end_ldmks_posz;
		sheet_r     = end_ldmks_r;
		sheet_g     = end_ldmks_g;
		sheet_b     = end_ldmks_b;
		sheet_names = end_ldmks_names;
	}
	//遍历世界中所有地标
	for (var i = 0 ; i < index_max_num ; i++){
		var worldx = sheet_posx[i];
		var worldz = sheet_posz[i];
		var screenx= worldXZ2screenX(worldx,worldz);
		var screeny= worldXZ2screenY(worldx,worldz);
		//屏幕外的就不画了
		if(isInCanvas(screenx,screeny))
		{		
			var name   = sheet_names[i];
			var r = sheet_r[i];
			var g = sheet_g[i];
			var b = sheet_b[i];
			var color = "rgb(" + r.toString() + "," + g.toString() + "," + b.toString() + ")";
			context.fillStyle = color;
			context.fillRect(screenx-7,screeny-7,14,14);
			context.fillStyle = "black";               //设置填充颜色为黑色
    		context.font = '16px "myFont"';           //设置字体
    		context.textBaseline = "bottom";            //设置字体底线对齐绘制基线
    		context.textAlign = "left";                 //设置字体对齐的方式
    		context.fillText( name, screenx-40, screeny - 12 );        //填充文字
		}
	}
}


function jumpAnimation()
{
	if(ani_route){
		var offset_x = getOffsetX();
		var offset_z = getOffsetZ();
		var errx = ani_endpos_x - offset_x;
		var errz = ani_endpos_z - offset_z;
		if(Math.abs(errx) + Math.abs(errz) < 1){
			ani_route = 0;
			renderMap();
			return ;
		}
		var cx = errx * 0.1;
		var cz = errz * 0.1;
		setOffsetX(offset_x+cx);
		setOffsetZ(offset_z+cz);
		renderMap();
	}
	
}
//缩放动画
function scaleAnimation()
{
	if(Math.abs(ani_scale_e) < 1){ani_scale_e = 0;return ;}
	var ani_scale_v = Math.sign(ani_scale_e)*Math.sqrt(2*Math.abs(ani_scale_e)); //速度
	var scale = getScale();
	scale += ani_scale_v * 0.01 * (Math.abs(scale)+1); //dx = v * dt
	if(scale > 40){scale = 40;}
	if(scale < 0.1){scale = 0.1;}
	setScale(scale);
	var ani_scale_force = 8*Math.abs(ani_scale_v) ; //阻力
	ani_scale_e -= ani_scale_force * ani_scale_v * 0.01; //阻尼
	renderMap();
	
}
//动画更新
function updateAnimation()
{
	scaleAnimation();
	jumpAnimation();
}



//地图刷新与交互监听
function updateMap()
{
	updateAnimation();
	mousex_old = mousex;
	mousey_old = mousey;
	var canvas = document.getElementById("canvas");
	
	//触屏事件
	var vertex = canvas.getBoundingClientRect();
	$("#canvas").on("touchstart" , function(e){  //按下
		e.preventDefault();
		mousex = e.originalEvent.changedTouches[0].pageX - vertex.left;
        mousey = e.originalEvent.changedTouches[0].pageY - vertex.top;
        left_button_down = true;
		ct_update = 1;
		if(mousex < 80){ct_touch_scale_sw = 1;ct_touch_y = mousey;}
		if(mouse_hover_on)
		{
		   itemClickedApp(mouse_hover_id);
		}
	});
	
	$("#canvas").on("touchend" , function(e){
		e.preventDefault();
        left_button_down = false;
		ct_update = 0;
		ct_touch_scale_sw = 0;
	});
	
	$("#canvas").on("touchmove" , function(e){
		e.preventDefault();
		mousex = e.originalEvent.changedTouches[0].pageX - vertex.left;
        mousey = e.originalEvent.changedTouches[0].pageY - vertex.top;
        if (left_button_down) {
			var dx = mousex - mousex_old;
			var dy = mousey - mousey_old;
			var ofstx = getOffsetX();
			var ofstz = getOffsetZ();
			var scale = getScale();
			ofstx -= (dx / 100 / 1 * 16 * scale);
			ofstz -= (dy / 100 / 1 * 16 * scale);
			if(!ct_touch_scale_sw){
				setOffsetX(ofstx);
				setOffsetZ(ofstz);	
			}
			else{
				ds = mousey - ct_touch_y;
				scale += ds * 0.000003;
				if(scale > 40){scale = 40;}
				if(scale < 0.1){scale = 0.1;}
				setScale(scale);
			}
        }

				
				

		mousex_old = mousex;
		mousey_old = mousey;
	});

	//鼠标事件
        canvas.onmousedown = function (e) {
            mousex = e.clientX;
            mousey = e.clientY;
            left_button_down = true;
			if(mouse_hover_on)
			{
		   		itemClickedApp(mouse_hover_id);
				renderMap();
			}
        }
        canvas.onmousemove = function (e) {
            mousex = e.clientX;
            mousey = e.clientY;
            if (left_button_down) {
				var dx = mousex - mousex_old;
				var dy = mousey - mousey_old;
				var ofstx = getOffsetX();
				var ofstz = getOffsetZ();
				ofstx -= (dx / 100 * 16 * getScale());
				ofstz -= (dy / 100 * 16 * getScale());;
                setOffsetX(ofstx);
				setOffsetZ(ofstz);
            }
			renderMap();
        }

        canvas.onmouseup = function (e) {
            left_button_down = false;
		}
		
	//鼠标滚轮事件
		canvas.onmousewheel = function (e) {
			var ds = e.wheelDelta;
			/*var scale = getScale();
			if(Math.sign(ds) < 0){scale *= 1.1;}
			else{scale /= 1.1;}
			if(scale > 40){scale = 40;}
			if(scale < 0.1){scale = 0.1;}
			setScale(scale);*/
			ani_scale_e -= ds*0.05;
			renderMap();
		}
		
	
	if (ct_update)
	{renderMap();}
	//renderMap();
}

//更新详细描述窗口显示内容
function updateDescription()
{
	var idsheet ;
	var sheet_names ;
	var sheet_posx  ;
	var sheet_posz  ;
	var sheet_photo ;
	var sheet_production;
	var sheet_description;
	//主世界地标区
	if (selected_tarbar < 1000)
	{
		 idsheet = main_ldmks_ids;
		 sheet_names = main_ldmks_names;
		 sheet_photo  = main_ldmks_photo;
		 sheet_production = main_ldmks_production;
		 sheet_description = main_ldmks_description;
		
		sheet_posx =  main_ldmks_posx;
		sheet_posz =  main_ldmks_posz;

	}
	//下界地标区
	else if (selected_tarbar < 2000)
	{
		idsheet = hell_ldmks_ids;
		sheet_names = hell_ldmks_names;
		sheet_photo  = hell_ldmks_photo;
		sheet_production = hell_ldmks_production;
	    sheet_description = hell_ldmks_description;
		
		sheet_posx =  hell_ldmks_posx;
		sheet_posz =  hell_ldmks_posz;
			 
	}
	
	//末地地标区
	else if (selected_tarbar < 3000)
	{
		idsheet = end_ldmks_ids;
		sheet_names = end_ldmks_names;
		sheet_photo  = end_ldmks_photo;
		sheet_production = end_ldmks_production;
	    sheet_description = end_ldmks_description;
		
		sheet_posx =  end_ldmks_posx;
		sheet_posz =  end_ldmks_posz;
			 
	}
	
	if (selected_tarbar > 99)
	{
		var index = getIndexById(idsheet,selected_tarbar);
		var str1 = sheet_names[index] + " (X:" + sheet_posx[index].toString() + " ,Z:" + sheet_posz[index]+")";
		var str5 = sheet_production[index];
		var str6 = sheet_description[index];
		//标题
		var h1 = document.createElement("h4");
		h1.className = "des_title";
		h1.style.color = "white";
		h1.innerHTML = str1;
		
		//导航1
		var r1 = document.createElement("h4");
		r1.className = "des_title";
		r1.style.color = "white";
		r1.innerHTML = str_route1;
		//导航2
		var r2 = document.createElement("h4");
		r2.className = "des_title";
		r2.style.color = "white";
		r2.innerHTML = str_route2;
		
		//导航3
		var r3 = document.createElement("h4");
		r3.className = "des_title";
		r3.style.color = "red";
		r3.innerHTML = str_route3;
		
		//摄影作品
		var photo = document.createElement("img");
		photo.className = "des_photo";
		photo.src = sheet_photo[index];
		console.log(sheet_photo[index]);
		//产品
		var pr = document.createElement("h4");
		pr.className = "des_production";
		pr.style.color = "white";
		pr.innerHTML = str5;
		
		//描述
		var de = document.createElement("h4");
		de.className = "des_description";
		de.style.color = "white";
		de.innerHTML = str6;
		
		$("#description").empty();
		$("#description").append(nodeToString(h1));
		$("#description").append(nodeToString(r1));
		$("#description").append(nodeToString(r2));
		$("#description").append(nodeToString(r3));
		$("#description").append(nodeToString(photo));
		$("#description").append(nodeToString(pr));
		$("#description").append(nodeToString(de));
	}
	
}








