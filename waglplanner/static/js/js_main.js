// JavaScript Document

//Add窗口相关
function colorSelectExpand()
{
	$("#color_select").css("display","block");
	setInterval(updateColorSelectWindow,14);
	renderColorSelectWindow();
}

function colorSelectUnExpand()
{
	if(bar_choose == 0){
		$("#color_select").css("display","none");
		clearInterval(updateColorSelectWindow);
	}
}

function dorSelect()
{
	if(dor_choose == 1){
		dor_choose = 0;
		$(".dor").css("border","solid purple 1px");
		$(".dor").html("不包含地狱门");
	}
	else {
		dor_choose = 1;
		$(".dor").css("border","solid #D71FFF 1px");
		$(".dor").html("包含地狱门");
	}
}

function submitAdd()
{
	var name = $("#input_name").val();
	var x    = $("#input_x").val();
	var z    = $("#input_z").val();
	var product = $("#input_prodct").val();
	var description   = $("#input_description").val();
	
	$.ajax({
		type:"post",
		url:"ldmkadd",
		data:{
			
			"world":selected_world,
			"name":name,
			"corx":x,
			"corz":z,
			"production":product,
			"description":description,
			"dor":dor_choose,
			"color_r":item_color_red,
			"color_g":item_color_green,
			"color_b":item_color_blue
		
		},
		success:function(){
			window.alert("添加成功！");
			//重新加载内容
			clearRecord();
			loadMainLdmks();
			loadHellLdmks();
			loadEndLdmks();
		},
		
		error:function(){
			window.alert("添加失败!添加地标请联系腐竹（其实是程序员鸽了，这一块代码没写）");
		}
	});
	
}


/////////////////////////////////////////

function hideAll(time){
	for(var i = 1; i<= 9 ;i++)
	{
		var str = "#detail_list" + i.toString();
		$(str).fadeOut(time);
	}
}

function showCorrectList()
{
	var ttn = (expand7) + (2*expand8) + (3*expand9) - 3;
	if(ttn != 0)
	{	
		var list_id = (selected_world * 3) + ttn;
		var str = "#detail_list" + list_id.toString();
		$(str).fadeIn(300);		
	}
	for(var i = 1; i<= 9 ;i++)
	{
		if (i!=list_id){
			var str = "#detail_list" + i.toString();
			$(str).fadeOut(100);
		}
		
	}
}


function expandP(var_id)
{
	$(var_id).text(" ");
	$(var_id).css({
			"border-color":"white"
	});
	
	var a = 0;
	switch(var_id)
	{
		case "#7":{a = -2;break;}
		case "#8":{a = -1;break;}
		case "#9":{a = 0;break;}
	}
	
}

function unExpandP(var_id)
{
	$(var_id).text("+");
	$(var_id).css({
			"border-color":"transparent"
	});
}

function changeSelectionFrame()
{
	switch(selected_world){
		case 1:{
			$("#1").css({"border-color":"white"});
			$("#2").css({"border-color":"transparent"});
			$("#3").css({"border-color":"transparent"});
			break;
		}
		case 2:{
			$("#2").css({"border-color":"white"});
			$("#1").css({"border-color":"transparent"});
			$("#3").css({"border-color":"transparent"});
			break;
		}
		case 3:{
			$("#3").css({"border-color":"white"});
			$("#2").css({"border-color":"transparent"});
			$("#1").css({"border-color":"transparent"});
			break;
		}
	}
}
function select1Clicked()
{
	selected_world = 1;
	changeSelectionFrame();
	renderMap();
}
function select2Clicked()
{
	selected_world = 2;
	changeSelectionFrame();
	renderMap();
}
function select3Clicked()
{
	selected_world = 3;
	changeSelectionFrame();
	renderMap();
}

function layer4Clicked()
{
	layer4 = !layer4;
	if (layer4 == 1){$("#4").css({"border-color":"white"});}
	else {$("#4").css({"border-color":"transparent"});}
	renderMap();
	
}
function layer5Clicked()
{
	layer5 = !layer5;
	if (layer5 == 1){$("#5").css({"border-color":"white"});}
	else {$("#5").css({"border-color":"transparent"});}
}
function layer6Clicked()
{
	
	layer6 = !layer6;
	if (layer6 == 1){$("#6").css({"border-color":"white"});}
	else {$("#6").css({"border-color":"transparent"});}
	bk_map_sw = !bk_map_sw;
	renderMap();
}

function pro7Clicked()
{
	expand7 = !expand7;
	if(expand7 == 1)
	{
		expand8 = 0;
		expand9 = 0;
		expandP("#7");
		unExpandP("#8");
		unExpandP("#9");
		
		renderMap();
	}
	else 
	{
		unExpandP("#7");
	}
}

function pro8Clicked()
{
	expand8 = !expand8;
	if(expand8 == 1)
	{
		expand7 = 0;
		expand9 = 0;
		expandP("#8");
		unExpandP("#7");
		unExpandP("#9");
	}
	else 
	{
		unExpandP("#8");
	}
}

function pro9Clicked()
{
	expand9 = !expand9;
	if(expand9 == 1)
	{
		expand8 = 0;
		expand7 = 0;
		expandP("#9");
		unExpandP("#8");
		unExpandP("#7");
	}
	else 
	{
		unExpandP("#9");
	}
}

function oper10Clicked()
{
	$(".add").fadeIn(500);

}

//导航
function route(goal_x,goal_z)
{
	if(selected_world != 1)
	{
		 str_route1 = "暂无导航信息";
		 str_route2 = "建议直接飞行";
		 str_route3 = "默认地狱门在基岩上方";
		route_sw = 0;
		return;
	}
	
	var posx_b = goal_x / 8;
	var posz_b = goal_z / 8;
	var min_distance = 1000000000;
	var min_id;
	
	for (var i = 0 ; i < hell_ldmks_max_index ; i++){
		var bx = hell_ldmks_posx[i];
		var bz = hell_ldmks_posz[i];
		var dis = distance(bx,posx_b ,bz,posz_b);
		var dor = hell_ldmks_dor[i];
		if(dis < min_distance && dor == 1)
		{
			min_distance = dis;
			min_id = i;
		}
	}
	route_bus_x =  hell_ldmks_posx[min_id] *8;
	route_bus_z =  hell_ldmks_posz[min_id] *8;
	route_end_x =  goal_x;
	route_end_z =  goal_z;
	var station_name = hell_ldmks_names[min_id];
	var dis_m = distance(route_bus_x,route_end_x , route_bus_z,route_end_z);
	str_route1 = "从下界地标 [" + station_name + "] 处进入主世界，";
	dis_m = Math.floor(dis_m);
	str_route2 = "飞行 " + dis_m.toString() + "m 后到达。";
	if(station_name[station_name.length - 1] != '>')
	{
		str_route3 = "地狱门在基岩下方";		
	}
	else
	{
		str_route3 = "默认地狱门在基岩上方";	
	}
	route_sw = 1;
	
	
}

//点击事件处理
function itemClickedApp(id)
{
	selected_tarbar = id;
	console.log(selected_tarbar);
	var sheet_id ;
	var sheet_x;
	var sheet_z;
	if(selected_world == 1)
	{
		sheet_id = main_ldmks_ids;
		sheet_x = main_ldmks_posx;
		sheet_z = main_ldmks_posz;
	}
	if(selected_world == 2)
	{
		sheet_id = hell_ldmks_ids;
		sheet_x = hell_ldmks_posx;
		sheet_z = hell_ldmks_posz;
	}
	var item_id = getIndexById(sheet_id,id);
	
	var goal_x = sheet_x[item_id];
	var goal_z = sheet_z[item_id];
	
	//触发一次导航：
	route(goal_x,goal_z);
	updateDescription();
	
	var goal_x_screen = worldXZ2screenX(goal_x,goal_z);
	var goal_y_screen = worldXZ2screenY(goal_x,goal_z);
	if(!isInCanvas(goal_x_screen,goal_y_screen))
	{
		jumpTo(goal_x,goal_z);
	}
	renderMap();
}
//右侧列表中的按钮被点击后
function itemClicked()
{
	var id =  $(this).attr("id") ;
	itemClickedApp(id);
}

$(document).ready(function(){
	
	loadMainLdmks();
	loadHellLdmks();
	loadEndLdmks();
	hideAll(0);
	
	
	$("#1").click(select1Clicked);
	$("#2").click(select2Clicked);
	$("#3").click(select3Clicked);
	
	$("#4").click(layer4Clicked);
	$("#5").click(layer5Clicked);
	$("#6").click(layer6Clicked);
	
	$("#7").click(pro7Clicked);
	$("#8").click(pro8Clicked);
	$("#9").click(pro9Clicked);

	$("#10").click(oper10Clicked);

	$("#back").click(function(){

		$(".add").css({
			"display":"none"
		})
	})
	
	$("#tt").click(function(){
		window.alert("waglplanner v3.1.4 ，等待新增内容");
	})
	
	// 上传图片预览
    $("#input_photo").change(function() {
		window.alert("1");
		window.alert(this.result);
        let filePath = $(this).val();//读取图片路径
        let fr = new FileReader();//创建new FileReader()对象
        let imgObj = this.files[0];//获取图片
		fr.readAsDataURL(imgObj);//将图片读取为DataURL
		
		window.alert(this.result);

        if(filePath.indexOf("jpg") !== -1 || filePath.indexOf("JPG") !== -1 || filePath.indexOf("PNG") !== -1 || filePath.indexOf("png") !== -1) {
            fr.onload = function() {
                $("#pic").attr('src',this.result);
            };
        }
	});
	
	//Add窗口相关
	//地标颜色小色块点击
	$("#show").mouseenter(colorSelectExpand);
	$("#color_select").mouseleave(colorSelectUnExpand);
	$(".dor").click(dorSelect);
	$("#input_submit").click(submitAdd);

	renderMap();
	layer4Clicked();
	select1Clicked();
	
	
	setInterval(updateMap,14);
	setInterval(showCorrectList,14);
})
