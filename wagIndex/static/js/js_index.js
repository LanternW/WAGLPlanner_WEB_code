// JavaScript Document
/********调试信息相关*******/


function getStatus()
{
	//状态获取
	$.ajax({
		type:"get",
		url:"/get/info",
		success:function(list){

				var list_obj = eval(list);
				console.log(list_obj);
				var status = "ERROR";
				var player_count = 0;
				var version = "unknown";
				for(var i= 0; i < list_obj.length; i++){
					status 			= list_obj[i].status;
					player_count 	= list_obj[i].player_count;
					version 		= list_obj[i].version;				
				}
				
				$("#status").html("服务器状态： "+ status);
				$("#player_count").html("在线人数： "+player_count.toString()+"/10");
				$("#version").html("当前版本： "+version);
			
		},
		error:function(xhr){
			console.log("Fail to get datas because reasons.");
		}
	}); 
	//cpu,内存
	$.ajax({
		type:"get",
		url:"/get/pref",
		success:function(list){

				var list_obj = eval(list);
				console.log(list_obj);
				var cpu = 0;
				var cpu_cores = 12;
				var memory = 0;
				for(var i= 0; i < list_obj.length; i++){
					cpu 			= list_obj[i].cpu_usage;
					cpu_cores 	= list_obj[i].cpu_cores;
					memory 		= list_obj[i].mem_mb;				
				}
				
				cpu = cpu*100; //百分数
				appendCpuOc(cpu);
				appendMemOc(memory);
				renderOccupy();	
		},
		error:function(xhr){
			console.log("Fail to get datas because reasons.");
		}
	});  
	
}

/***************/

function submitChat()
{
	window.alert("click");
}

function styleSet()
{
	var month = new Date().getMonth() + 1;
	var bcolor = "rgba(100,255,0,0.2)";
	var logo_text = "WAG Server";
	if(month > 1 && month <= 4){logo_text = "WAG Server 春"; bcolor = "rgba(200,255,0,1)";}
	else if(month > 4 && month <= 7){logo_text = "WAG Server 夏"; bcolor = "rgba(0,255,0,1)";}
	else if(month > 7 && month <= 10){logo_text = "WAG Server 秋"; bcolor = "rgba(250,205,0,1)";}
	else {logo_text = "WAG Server 冬"; bcolor = "rgba(100,200,255,1)";}
	
	$("#logo").css("color",bcolor);
	$("#planner").css("color",bcolor);
	$("#base_screen").css("background-color",bcolor);
	$("#logo").html(logo_text);
}

$(document).ready(function(){
	
	styleSet();
	getStatus();
	$("#chat_submit").mouseenter(function(){
		$(this).css("opacity","1");
	});
	$("#chat_submit").mouseleave(function(){
		$(this).css("opacity","0.7");
	});
	

	renderOccupy();
	setInterval(getStatus,2000);
	$("#chat_submit").click(submitChat);
	

});
