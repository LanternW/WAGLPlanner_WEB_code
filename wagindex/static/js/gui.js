// JavaScript Document

function renderCpuOccupy()
{
	cpu_context = document.getElementById("cpu").getContext('2d');
	cpu_context.clearRect(0,0,300,100);
	cpu_context.fillStyle = "rgba(0,0,0,0.5)";
	cpu_context.fillRect(0,0,300,100);
	
	$("#cpu").drawLine({
  		strokeStyle: "rgba(255,255,200,0.89)",
  		strokeWidth: "2px",
		x1: 40, y1: 10,
		x2: 40, y2: 90,
	});
	
	$("#cpu").drawLine({
  		strokeStyle: "rgba(255,255,200,0.89)",
  		strokeWidth: "2px",
		x1: 40, y1: 90,
		x2: 280, y2: 90,
	});
	
	cpu_context.fillStyle = "rgba(255,255,200,0.4)";
    cpu_context.font = '12px "scribe"'; 
    cpu_context.textBaseline = "bottom";  
    cpu_context.textAlign = "right";
	cpu_context.fillText("%", 55, 15); 
	
	var gap = Math.round(2.5 * Math.ceil(max_cpu_oc / 10));
	if(max_cpu_oc < 20){gap = 5;}
	for(var i = 72.5, j = gap;  i >= 20 ; i -= 17.5,j+=gap)
	{
		var str = j.toString()
		$("#cpu").drawLine({
  			strokeStyle: "rgba(255,255,200,0.2)",
  			strokeWidth: "1px",
			x1: 40, y1: i,
			x2: 280, y2: i,
		});	
		cpu_context.fillText(str, 35, i+6); 
	}
	
	cpu_context.fillStyle = "rgba(255,200,200,0.7)";
	for(var x = 40, index = cpu_oc_pointer ; x <= 280  ; x += 240/19)
	{
		if(cpu_oc_maxindex > 0)
		{
		
			var num = cpu_ocs[index];
			if(num < 0){num = 0;}
			if(num > 2000){num = 2000;}
			var ts = 4*gap;
			y = 90 - (70/ts )*num;
			cpu_context.fillRect(x,y-1,3,3);
			
			if(x != 40){
				$("#cpu").drawLine({
					strokeStyle: "rgba(255,200,200,0.7)",
					strokeWidth: "1px",
					x1: last_x, y1: last_y,
					x2: x, y2: y,
				});	
			}
			index = (index + 1) % 20;
			if(cpu_oc_maxindex < 20 && index == cpu_oc_maxindex){return ;}
			else if(index == cpu_oc_pointer){return ;}
			
			var last_x = x;
			var last_y = y;
		}
	}
		
}

function renderMemoryOccupy()
{
	memory_context = document.getElementById("memory").getContext('2d');
	memory_context.clearRect(0,0,300,100);
	memory_context.fillStyle = "rgba(0,0,0,0.5)";
	memory_context.fillRect(0,0,300,100);
	
	$("#memory").drawLine({
  		strokeStyle: "rgba(255,255,200,0.89)",
  		strokeWidth: "2px",
		x1: 40, y1: 10,
		x2: 40, y2: 90,
	});
	
	$("#memory").drawLine({
  		strokeStyle: "rgba(255,255,200,0.89)",
  		strokeWidth: "2px",
		x1: 40, y1: 90,
		x2: 280, y2: 90,
	});
	
	memory_context.fillStyle = "rgba(255,255,200,0.4)";
    memory_context.font = '12px "scribe"'; 
    memory_context.textBaseline = "bottom";  
    memory_context.textAlign = "right";
	memory_context.fillText("MB", 62, 15); 
	
	var gap = Math.round(25 * Math.ceil(max_mem_oc / 100));
	if(max_mem_oc < 200){gap = 50;}
	for(var i = 72.5, j = gap;  i >= 20 ; i -= 17.5,j+=gap)
	{
		var str = j.toString()
		$("#memory").drawLine({
  			strokeStyle: "rgba(255,255,200,0.2)",
  			strokeWidth: "1px",
			x1: 40, y1: i,
			x2: 280, y2: i,
		});	
		memory_context.fillText(str, 35, i+6); 
		
	}
	
	memory_context.fillStyle = "rgba(255,255,200,0.7)";
	for(var x = 40, index = mem_oc_pointer ; x <= 280  ; x += 240/19)
	{
		if(mem_oc_maxindex > 0)
		{
			
			var num = mem_ocs[index];
			if(num < 0){num = 0;}
			var ts = 4*gap;
			y = 90 - (70/ts )*num;
			memory_context.fillRect(x,y-1,3,3);
			if(x != 40){
				$("#memory").drawLine({
					strokeStyle: "rgba(255,255,200,0.7)",
					strokeWidth: "1px",
					x1: last_x, y1: last_y,
					x2: x, y2: y,
				});	
			}
			index = (index + 1) % 20;
			if(mem_oc_maxindex < 20 && index == mem_oc_maxindex){return ;}
			else if(index == mem_oc_pointer){return ;}
			
			var last_x = x;
			var last_y = y;
		}
	}
}



function renderOccupy()
{
	renderCpuOccupy();
	renderMemoryOccupy();
}

function updateOccupy()
{
	//这里添加请求数据内容

	renderOccupy();
}